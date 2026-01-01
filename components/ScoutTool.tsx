
import React, { useState } from 'react';
import { analyzeLakePhoto } from '../services/geminiService';
import { CameraIcon, ScannerIcon, BotIcon, XIcon, SproutIcon } from './icons';

const ScoutTool: React.FC = () => {
    const [image, setImage] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImage(event.target?.result as string);
                setAnalysis(null);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const startAnalysis = async () => {
        if (!image) return;
        setIsAnalyzing(true);
        const result = await analyzeLakePhoto(image, 'image/jpeg');
        setAnalysis(result);
        setIsAnalyzing(false);
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="text-center">
                <h1 className="text-2xl font-bold text-white mb-2">Ghillie Scout: Hotspot ID</h1>
                <p className="text-slate-400 text-sm">Upload a photo of your swim. The AI will scan for bars, weed, and activity.</p>
            </div>

            {!image ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-slate-700 rounded-lg cursor-pointer bg-slate-800/50 hover:bg-slate-800 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <CameraIcon className="w-12 h-12 text-slate-500 group-hover:text-cyan-400 mb-4 transition-colors" />
                        <p className="mb-2 text-sm text-slate-400"><span className="font-semibold text-cyan-400">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500">Lake/River photos (JPG, PNG)</p>
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            ) : (
                <div className="relative rounded-lg overflow-hidden border border-slate-700 shadow-2xl">
                    <img src={image} alt="Lake Preview" className="w-full h-64 object-cover" />
                    <button 
                        onClick={() => {setImage(null); setAnalysis(null);}} 
                        className="absolute top-2 right-2 p-1 bg-black/50 rounded-full text-white hover:bg-red-500 transition"
                    >
                        <XIcon className="w-5 h-5" />
                    </button>
                    {!analysis && (
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center backdrop-blur-sm transition-all animate-fade-in">
                            <button 
                                onClick={startAnalysis}
                                disabled={isAnalyzing}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 transform hover:scale-105 active:scale-95 transition"
                            >
                                {isAnalyzing ? (
                                    <>
                                        <ScannerIcon className="w-5 h-5 animate-spin" />
                                        Scanning Swim...
                                    </>
                                ) : (
                                    <>
                                        <ScannerIcon className="w-5 h-5" />
                                        Analyze Hotspots
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {isAnalyzing && (
                <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-slate-700 rounded w-3/4"></div>
                    <div className="h-4 bg-slate-700 rounded w-5/6"></div>
                    <div className="h-4 bg-slate-700 rounded w-1/2"></div>
                </div>
            )}

            {analysis && (
                <div className="bg-slate-800 rounded-lg p-6 border border-cyan-900/50 shadow-xl animate-fade-in">
                    <div className="flex items-center gap-3 mb-4 border-b border-slate-700 pb-3">
                        <BotIcon className="w-8 h-8 text-cyan-400" />
                        <h3 className="font-bold text-lg text-white">Ghillie's Tactical Analysis</h3>
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-300 leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: analysis.replace(/\n/g, '<br />') }} />
                    </div>
                    <div className="mt-6 p-4 bg-cyan-950/30 rounded border border-cyan-800/40 text-sm text-cyan-200 flex items-start gap-3">
                        <SproutIcon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                        <p><strong>Scout Tip:</strong> Look for bubbles near the reed lines in the early morning; these are often feeding fish moving off the shelf.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ScoutTool;
