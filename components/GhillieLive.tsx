
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { BASE_SYSTEM_INSTRUCTION } from '../services/geminiService';
import { Mic, MicOff, Volume2, X, Loader2 } from 'lucide-react';

const GhillieLive: React.FC = () => {
    const [isActive, setIsActive] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [audioLevel, setAudioLevel] = useState(0);
    const sessionRef = useRef<any>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const stopSession = () => {
        if (sessionRef.current) sessionRef.current.close();
        if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
        setIsActive(false);
        setIsConnecting(false);
    };

    const startSession = async () => {
        setIsConnecting(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
            
            // Minimal decoding/encoding helpers (abstracted for this example)
            const encode = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes));
            const decode = (base64: string) => new Uint8Array(atob(base64).split("").map(c => c.charCodeAt(0)));

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        setIsActive(true);
                        setIsConnecting(false);
                        const source = audioContextRef.current!.createMediaStreamSource(streamRef.current!);
                        const processor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
                        
                        processor.onaudioprocess = (e) => {
                            const input = e.inputBuffer.getChannelData(0);
                            const int16 = new Int16Array(input.length);
                            let sum = 0;
                            for (let i = 0; i < input.length; i++) {
                                int16[i] = input[i] * 32768;
                                sum += Math.abs(input[i]);
                            }
                            setAudioLevel(sum / input.length);
                            sessionPromise.then(s => s.sendRealtimeInput({ 
                                media: { data: encode(new Uint8Array(int16.buffer)), mimeType: 'audio/pcm;rate=16000' } 
                            }));
                        };
                        source.connect(processor);
                        processor.connect(audioContextRef.current!.destination);
                    },
                    onmessage: async (msg) => {
                        const base64Audio = msg.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        if (base64Audio) {
                            const data = decode(base64Audio);
                            const dataInt16 = new Int16Array(data.buffer);
                            const buffer = outputCtx.createBuffer(1, dataInt16.length, 24000);
                            const channel = buffer.getChannelData(0);
                            for (let i = 0; i < dataInt16.length; i++) channel[i] = dataInt16[i] / 32768.0;
                            const source = outputCtx.createBufferSource();
                            source.buffer = buffer;
                            source.connect(outputCtx.destination);
                            source.start();
                        }
                    },
                    onclose: () => stopSession(),
                    onerror: () => stopSession(),
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
                    systemInstruction: BASE_SYSTEM_INSTRUCTION + " You are in a real-time voice call. Be brief and focused on the sounds of the bankside."
                }
            });
            sessionRef.current = await sessionPromise;
        } catch (err) {
            console.error(err);
            setIsConnecting(false);
        }
    };

    return (
        <div className="bg-slate-900/90 border border-cyan-500/50 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col items-center text-center space-y-6">
                <div className="relative">
                    <div className={`absolute inset-0 bg-cyan-500/20 rounded-full blur-2xl transition-transform duration-300 ${isActive ? 'scale-150' : 'scale-0'}`}></div>
                    <div className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${isActive ? 'border-cyan-400 bg-cyan-900/30' : 'border-slate-700 bg-slate-800'}`}>
                        {isActive ? (
                            <div className="flex gap-1 items-end h-12">
                                {[...Array(8)].map((_, i) => (
                                    <div key={i} className="w-1 bg-cyan-400 rounded-full animate-pulse" style={{ height: `${Math.random() * 100}%`, animationDelay: `${i * 0.1}s` }}></div>
                                ))}
                            </div>
                        ) : (
                            <Volume2 className="w-12 h-12 text-slate-500" />
                        )}
                    </div>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Ghillie Live</h2>
                    <p className="text-slate-400 text-sm max-w-xs">Hands-free real-time tactical advisor. Just talk, The Ghillie is listening.</p>
                </div>

                <div className="flex gap-4">
                    {!isActive ? (
                        <button 
                            onClick={startSession}
                            disabled={isConnecting}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Mic className="w-5 h-5" />}
                            {isConnecting ? "Connecting..." : "Open Session"}
                        </button>
                    ) : (
                        <button 
                            onClick={stopSession}
                            className="bg-red-600 hover:bg-red-500 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transition-all active:scale-95"
                        >
                            <MicOff className="w-5 h-5" />
                            End Session
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GhillieLive;
