
import React, { useState, useEffect } from 'react';
import { getHotspotMap } from '../services/geminiService';
import type { Catch } from '../types';
import { MapPin, Search, ExternalLink, Navigation } from 'lucide-react';

interface HotspotExplorerProps {
    catches: Catch[];
}

const HotspotExplorer: React.FC<HotspotExplorerProps> = ({ catches }) => {
    const [hotspots, setHotspots] = useState<{ text: string, links: any[] } | null>(null);
    const [loading, setLoading] = useState(false);

    const findSpots = () => {
        if (!navigator.geolocation) return;
        setLoading(true);
        navigator.geolocation.getCurrentPosition(async (pos) => {
            const data = await getHotspotMap(pos.coords.latitude, pos.coords.longitude, catches);
            setHotspots(data);
            setLoading(false);
        });
    };

    return (
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
                <Navigation className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Hotspot Explorer</h2>
            </div>
            
            {!hotspots ? (
                <div className="text-center py-8">
                    <p className="text-slate-400 text-sm mb-6">AI will analyze your local area and previous catches to find the best nearby venues and swims.</p>
                    <button 
                        onClick={findSpots}
                        disabled={loading}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-bold transition flex items-center gap-2 mx-auto disabled:opacity-50"
                    >
                        {loading ? <Search className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                        Scan Nearby Venues
                    </button>
                </div>
            ) : (
                <div className="space-y-6 animate-fade-in">
                    <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: hotspots.text.replace(/\n/g, '<br />') }} />
                    </div>
                    
                    {hotspots.links && hotspots.links.length > 0 && (
                        <div className="grid gap-3">
                            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Verified Venue Links</h4>
                            {hotspots.links.map((link, idx) => (
                                <a 
                                    key={idx} 
                                    href={link.maps?.uri || '#'} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg border border-slate-600 transition group"
                                >
                                    <div className="flex items-center gap-3">
                                        <MapPin className="w-4 h-4 text-cyan-400" />
                                        <span className="text-sm font-medium text-white">{link.maps?.title || "Explore Spot"}</span>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition" />
                                </a>
                            ))}
                        </div>
                    )}
                    
                    <button onClick={() => setHotspots(null)} className="text-xs text-cyan-400 hover:underline">New Scan</button>
                </div>
            )}
        </div>
    );
};

export default HotspotExplorer;
