
import React, { useState } from 'react';
import { generateRigBlueprint } from '../services/geminiService';
import { Camera, Hammer, Loader2, Download, RefreshCw } from 'lucide-react';

const RigGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerate = async () => {
        if (!prompt.trim()) return;
        setIsGenerating(true);
        setImage(null);
        const result = await generateRigBlueprint(prompt);
        setImage(result);
        setIsGenerating(false);
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
                <Hammer className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Tactical Blueprint</h3>
            </div>
            
            <p className="text-slate-400 text-sm mb-6">Describe a complex rig or bait presentation to see a high-detail visual guide.</p>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. Ronnie rig with a pink 15mm pop-up..."
                        className="flex-grow bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white outline-none focus:ring-2 focus:ring-cyan-500"
                    />
                    <button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !prompt}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50 transition-colors"
                    >
                        {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : "Visualize"}
                    </button>
                </div>

                {isGenerating && (
                    <div className="h-64 bg-slate-700/50 rounded-lg flex flex-col items-center justify-center animate-pulse">
                        <Camera className="w-12 h-12 text-slate-600 mb-2" />
                        <p className="text-slate-500 text-xs uppercase tracking-widest">Rendering Blueprint...</p>
                    </div>
                )}

                {image && (
                    <div className="relative group animate-fade-in">
                        <img src={image} alt="Rig Blueprint" className="w-full h-auto rounded-lg border border-slate-600 shadow-2xl" />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button onClick={handleGenerate} className="p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition">
                                <RefreshCw className="w-6 h-6" />
                            </button>
                            <a href={image} download="carpy-blueprint.png" className="p-3 bg-cyan-600 hover:bg-cyan-500 rounded-full text-white shadow-lg transition">
                                <Download className="w-6 h-6" />
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RigGenerator;
