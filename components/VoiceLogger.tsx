
import React, { useState, useRef } from 'react';
import { processVoiceCatch } from '../services/geminiService';
import { Mic, Square, Loader2, CheckCircle2, Volume2 } from 'lucide-react';

interface VoiceLoggerProps {
    onCatchParsed: (data: any) => void;
}

const VoiceLogger: React.FC<VoiceLoggerProps> = ({ onCatchParsed }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [status, setStatus] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            recorder.onstop = async () => {
                const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.onloadend = async () => {
                    const base64 = (reader.result as string).split(',')[1];
                    setIsProcessing(true);
                    setStatus("The Ghillie is listening...");
                    const result = await processVoiceCatch(base64);
                    if (result) {
                        onCatchParsed(result);
                        setStatus("Catch parsed successfully!");
                        setTimeout(() => setStatus(null), 3000);
                    } else {
                        setStatus("Sorry, I missed that. Try again?");
                    }
                    setIsProcessing(false);
                };
                reader.readAsDataURL(audioBlob);
            };

            recorder.start();
            setIsRecording(true);
            setStatus("Recording... Speak your catch details.");
        } catch (err) {
            console.error("Mic access denied", err);
            setStatus("Microphone access required.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    return (
        <div className="bg-slate-800/80 border border-cyan-500/30 rounded-xl p-4 shadow-lg mb-6">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-cyan-500/20'}`}>
                        <Volume2 className={`w-5 h-5 ${isRecording ? 'text-white' : 'text-cyan-400'}`} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">Hands-Free Logger</h4>
                        <p className="text-xs text-slate-400">Describe your catch out loud.</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    {status && <span className="text-[10px] text-cyan-300 font-medium animate-fade-in">{status}</span>}
                    {!isRecording ? (
                        <button 
                            onClick={startRecording}
                            disabled={isProcessing}
                            className="p-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full transition-all shadow-lg active:scale-90 disabled:opacity-50"
                        >
                            {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Mic className="w-6 h-6" />}
                        </button>
                    ) : (
                        <button 
                            onClick={stopRecording}
                            className="p-3 bg-red-600 hover:bg-red-500 text-white rounded-full transition-all shadow-lg animate-pulse"
                        >
                            <Square className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>
            
            {isRecording && (
                <div className="mt-4 flex gap-1 justify-center">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-1 bg-cyan-400 rounded-full animate-bounce" style={{ height: `${Math.random() * 20 + 5}px`, animationDelay: `${i * 0.1}s` }}></div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default VoiceLogger;
