
import React, { useState, useEffect, useRef } from 'react';
import { getWeatherForecast, getAIAdvice } from '../services/geminiService';
import type { Catch } from '../types';
import type { ForecastData, TodayForecastData, SimpleForecastData, BriefingAdvice, WeatherIconType } from '../services/geminiService';
import { 
    SunIcon, CloudIcon, WeatherIcon, CloudSunIcon, CloudRainIcon, SnowflakeIcon, 
    ThunderstormIcon, LocationIcon, WindIcon, GaugeIcon, SunriseIcon, SunsetIcon, 
    NavigationArrowIcon, FishIcon, GearIcon, TacticsIcon, SproutIcon, SendIcon, 
    BotIcon, UserIcon, CopyIcon, CheckIcon, AIIcon, XIcon, TrendsIcon, BookOpenIcon, 
    WavesIcon, FishCareIcon 
} from './icons';
import TrendsDashboard from './TrendsDashboard';
import HotspotExplorer from './HotspotExplorer';

const directionToRotation: { [key: string]: string } = {
    N: 'rotate-0', NE: 'rotate-45', E: 'rotate-90', SE: 'rotate-135',
    S: 'rotate-180', SW: 'rotate-225', W: 'rotate-270', NW: 'rotate-315',
    NNE: 'rotate-[22.5deg]', ENE: 'rotate-[67.5deg]', ESE: 'rotate-[112.5deg]', SSE: 'rotate-[157.5deg]',
    SSW: 'rotate-[202.5deg]', WSW: 'rotate-[247.5deg]', WNW: 'rotate-[292.5deg]', NNW: 'rotate-[337.5deg]'
};

const UK_DEFAULT_LOCATION = { lat: 51.724, lon: -1.419, name: "Oxfordshire, UK" };

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const getWeatherIcon = (iconName: WeatherIconType, size: string) => {
    switch (iconName) {
        case 'SUNNY': return <SunIcon className={`${size} text-yellow-400`} />;
        case 'PARTLY_CLOUDY': return <CloudSunIcon className={`${size} text-slate-400`} />;
        case 'CLOUDY': return <CloudIcon className={`${size} text-slate-500`} />;
        case 'RAINY': return <CloudRainIcon className={`${size} text-blue-400`} />;
        case 'SNOWY': return <SnowflakeIcon className={`${size} text-sky-300`} />;
        case 'THUNDERSTORM': return <ThunderstormIcon className={`${size} text-purple-400`} />;
        default: return <CloudIcon className={`${size} text-slate-500`} />;
    }
};

const SimpleWeatherCard: React.FC<{ data: SimpleForecastData, isBankside: boolean }> = ({ data, isBankside }) => {
    const rotationClass = directionToRotation[data.windDirection] || 'rotate-0';
    return (
        <div className={`${isBankside ? 'bg-black border-2 border-yellow-400' : 'bg-slate-800 border border-slate-700/50'} p-4 rounded-xl flex flex-col space-y-3 shadow-xl transition-all`}>
            <p className={`font-black text-center text-lg ${isBankside ? 'text-yellow-400' : 'text-slate-300'}`}>{data.day}</p>
            <div className="flex items-center justify-between">
                <div className="flex flex-col items-center">
                    {getWeatherIcon(data.icon, 'w-12 h-12')}
                    <p className={`${isBankside ? 'text-yellow-400/80' : 'text-slate-400'} text-xs font-bold mt-1`}>{data.condition}</p>
                </div>
                <p className={`text-4xl font-black ${isBankside ? 'text-yellow-400' : 'text-white'}`}>{Math.round(data.temp)}°C</p>
            </div>
             <div className={`${isBankside ? 'border-yellow-400/30' : 'border-slate-700/50'} border-t my-1`}></div>
            <div className="grid grid-cols-2 gap-2 text-xs">
                 <div className="flex items-center gap-2">
                    <WindIcon className={`w-4 h-4 ${isBankside ? 'text-yellow-400' : 'text-sky-400'}`}/>
                    <span className={`${isBankside ? 'text-yellow-400 font-bold' : 'text-slate-300'}`}>{data.windSpeed} kph</span>
                    <NavigationArrowIcon className={`w-3 h-3 transform ${rotationClass} ${isBankside ? 'text-yellow-400' : 'text-sky-400'}`} />
                </div>
                 <div className="flex items-center gap-2">
                    <GaugeIcon className={`w-4 h-4 ${isBankside ? 'text-yellow-400' : 'text-orange-400'}`}/>
                    <span className={`${isBankside ? 'text-yellow-400 font-bold' : 'text-slate-300'}`}>{data.pressure} mb</span>
                </div>
            </div>
        </div>
    );
};

const BriefingSection: React.FC<{ title: string; items: string[]; icon: React.ReactNode, isBankside: boolean }> = ({ title, items, icon, isBankside }) => {
    if (!items || items.length === 0) return null;
    return (
        <div className="mb-3">
            <div className="flex items-center gap-2 mb-2">
                {icon}
                <h4 className={`font-black uppercase tracking-wider text-sm ${isBankside ? 'text-yellow-400' : 'text-slate-300'}`}>{title}</h4>
            </div>
            <ul className="space-y-1.5 pl-4 sm:pl-8">
                {items.map((item, index) => (
                    <li key={index} className={`text-sm font-bold list-disc ${isBankside ? 'text-yellow-400 marker:text-yellow-400' : 'text-slate-400 marker:text-cyan-500'}`}>{item}</li>
                ))}
            </ul>
        </div>
    );
};

interface DashboardProps {
    catches: Catch[];
}

const Dashboard: React.FC<DashboardProps> = ({ catches }) => {
    const [forecast, setForecast] = useState<ForecastData[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeBriefing, setActiveBriefing] = useState<'morning' | 'afternoon' | 'evening'>('morning');
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [currentLocationName, setCurrentLocationName] = useState<string>("Detecting...");
    const [isBankside, setIsBankside] = useState(false);

    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm The Ghillie. I'm ready to help you plan your next session. Ask me about local waters or rigs!" }
    ]);
    const [isChatLoading, setIsChatLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if(isChatOpen) scrollToBottom();
    }, [messages, isChatOpen]);

    const fetchForecast = async (lat: number, lon: number, name?: string) => {
        setIsLoading(true);
        setError(null);
        if (name) setCurrentLocationName(name);
        try {
            const data = await getWeatherForecast(lat, lon);
            if (data) setForecast(data);
            else setError("Error fetching weather.");
        } catch (e) {
            setError("Failed to get forecast.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim() || isChatLoading) return;
        const userMessage: Message = { sender: 'user', text: prompt };
        setMessages(prev => [...prev, userMessage]);
        setPrompt('');
        setIsChatLoading(true);
        try {
            const aiResponse = await getAIAdvice(prompt, catches);
            setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: "Ghillie connection lost..." }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchForecast(pos.coords.latitude, pos.coords.longitude, "Current Location"),
                () => fetchForecast(UK_DEFAULT_LOCATION.lat, UK_DEFAULT_LOCATION.lon, UK_DEFAULT_LOCATION.name)
            );
        } else {
            fetchForecast(UK_DEFAULT_LOCATION.lat, UK_DEFAULT_LOCATION.lon, UK_DEFAULT_LOCATION.name);
        }
    }, []);
    
    const todayData = forecast?.find(f => f.day === 'Today') as TodayForecastData | undefined;
    const yesterdayData = forecast?.find(f => f.day === 'Yesterday') as SimpleForecastData | undefined;
    const tomorrowData = forecast?.find(f => f.day === 'Tomorrow') as SimpleForecastData | undefined;

    const renderBriefing = (briefingPeriod: BriefingAdvice) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 animate-fade-in">
            <BriefingSection isBankside={isBankside} title="Prime Locations" items={briefingPeriod.locations} icon={<LocationIcon className={`w-5 h-5 ${isBankside ? 'text-yellow-400' : 'text-orange-400'}`}/>}/>
            <BriefingSection isBankside={isBankside} title="Recommended Tactics" items={briefingPeriod.tactics} icon={<TacticsIcon className={`w-5 h-5 ${isBankside ? 'text-yellow-400' : 'text-purple-400'}`}/>}/>
            <BriefingSection isBankside={isBankside} title="Go-To Rigs" items={briefingPeriod.rigs} icon={<GearIcon className={`w-5 h-5 ${isBankside ? 'text-yellow-400' : 'text-green-400'}`}/>}/>
            <BriefingSection isBankside={isBankside} title="Baiting Strategy" items={briefingPeriod.baitingStrategy} icon={<SproutIcon className={`w-5 h-5 ${isBankside ? 'text-yellow-400' : 'text-cyan-400'}`}/>}/>
        </div>
    );
    
    const briefingContent = todayData?.briefing ? todayData.briefing[activeBriefing] : null;

    return (
        <div className={`space-y-6 ${isBankside ? 'bankside-theme' : ''}`}>
            <div className="flex justify-between items-center">
                 <div className="flex items-center gap-3">
                    <WeatherIcon className={`w-8 h-8 ${isBankside ? 'text-yellow-400' : 'text-cyan-400'}`}/>
                    <h2 className={`text-2xl font-black ${isBankside ? 'text-yellow-400' : 'text-white'}`}>UK Tactical Hub</h2>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setIsBankside(!isBankside)} 
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-black text-xs uppercase transition-all shadow-lg ${
                            isBankside 
                            ? 'bg-yellow-400 text-black shadow-yellow-400/20' 
                            : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                        }`}
                    >
                        <SunIcon className="w-4 h-4" />
                        {isBankside ? 'Normal Mode' : 'Bankside Mode'}
                    </button>
                    <button onClick={() => setIsChatOpen(true)} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-black text-xs uppercase transition-all shadow-lg ${
                            isBankside 
                            ? 'bg-yellow-400 text-black shadow-yellow-400/20' 
                            : 'bg-slate-700 hover:bg-slate-600 text-white shadow-md'
                        }`}>
                        <AIIcon className={`w-5 h-5 ${isBankside ? 'text-black' : 'text-cyan-400'}`}/>
                        <span>Ghillie</span>
                    </button>
                </div>
            </div>
            
            {isLoading ? (
                <div className="text-center py-10 animate-pulse">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-4 ${isBankside ? 'bg-yellow-400' : 'bg-slate-700'}`}></div>
                    <p className={`text-sm italic font-bold ${isBankside ? 'text-yellow-400' : 'text-slate-400'}`}>"Observation before action..." - The Ghillie is scouting.</p>
                </div>
            ) : todayData ? (
                 <>
                    <div className={`p-6 rounded-3xl border-2 shadow-2xl transition-all ${isBankside ? 'bg-black border-yellow-400' : 'bg-slate-800 border-cyan-500'}`}>
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <LocationIcon className={`w-4 h-4 ${isBankside ? 'text-yellow-400' : 'text-cyan-400'}`} />
                                    <span className={`text-xs font-black uppercase tracking-widest ${isBankside ? 'text-yellow-400/60' : 'text-slate-500'}`}>{currentLocationName}</span>
                                </div>
                                <h3 className={`font-black text-2xl ${isBankside ? 'text-yellow-400' : 'text-cyan-300'}`}>Tactical Summary</h3>
                                <p className={`text-sm font-bold ${isBankside ? 'text-yellow-400' : 'text-slate-400'}`}>{todayData.condition}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                {getWeatherIcon(todayData.icon, 'w-16 h-16')}
                                <p className={`text-5xl font-black ${isBankside ? 'text-yellow-400' : 'text-white'}`}>{Math.round(todayData.temp)}°C</p>
                            </div>
                        </div>
                        <div className={`flex border-b mt-6 ${isBankside ? 'border-yellow-400' : 'border-slate-700'}`}>
                            <button onClick={() => setActiveBriefing('morning')} className={`flex-1 p-3 font-black text-xs uppercase tracking-widest transition-all ${activeBriefing === 'morning' ? (isBankside ? 'bg-yellow-400 text-black' : 'bg-slate-700/80 text-white') : (isBankside ? 'text-yellow-400' : 'text-slate-400')} rounded-t-xl`}>Morning</button>
                            <button onClick={() => setActiveBriefing('afternoon')} className={`flex-1 p-3 font-black text-xs uppercase tracking-widest transition-all ${activeBriefing === 'afternoon' ? (isBankside ? 'bg-yellow-400 text-black' : 'bg-slate-700/80 text-white') : (isBankside ? 'text-yellow-400' : 'text-slate-400')} rounded-t-xl`}>Afternoon</button>
                            <button onClick={() => setActiveBriefing('evening')} className={`flex-1 p-3 font-black text-xs uppercase tracking-widest transition-all ${activeBriefing === 'evening' ? (isBankside ? 'bg-yellow-400 text-black' : 'bg-slate-700/80 text-white') : (isBankside ? 'text-yellow-400' : 'text-slate-400')} rounded-t-xl`}>Night</button>
                        </div>
                         <div className="p-4 sm:p-6">
                            {briefingContent ? renderBriefing(briefingContent) : <p className="font-bold text-slate-500">No briefing available.</p>}
                        </div>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {yesterdayData && <SimpleWeatherCard isBankside={isBankside} data={yesterdayData} />}
                        {tomorrowData && <SimpleWeatherCard isBankside={isBankside} data={tomorrowData} />}
                    </div>
                </>
            ) : null}

            {/* Tactical Library Quick Links */}
            {!isBankside && (
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <BookOpenIcon className="w-6 h-6 text-cyan-400" />
                        <h2 className="text-xl font-black text-white">Tactical Library</h2>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer group">
                            <SproutIcon className="w-8 h-8 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xs font-bold text-white">Baits</h4>
                            <p className="text-[9px] text-slate-500 uppercase font-black">Choosing Feed</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-all cursor-pointer group">
                            <GearIcon className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xs font-bold text-white">Rigs</h4>
                            <p className="text-[9px] text-slate-500 uppercase font-black">Presentations</p>
                        </div>
                         <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-blue-500 transition-all cursor-pointer group">
                            <WavesIcon className="w-8 h-8 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xs font-bold text-white">Rivers</h4>
                            <p className="text-[9px] text-slate-500 uppercase font-black">Reading Flow</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-orange-500 transition-all cursor-pointer group">
                            <TacticsIcon className="w-8 h-8 text-orange-400 mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xs font-bold text-white">Watercraft</h4>
                            <p className="text-[9px] text-slate-500 uppercase font-black">Finding Fish</p>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all cursor-pointer group">
                            <FishCareIcon className="w-8 h-8 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                            <h4 className="text-xs font-bold text-white">Care</h4>
                            <p className="text-[9px] text-slate-500 uppercase font-black">Welfare</p>
                        </div>
                    </div>
                </div>
            )}

            <HotspotExplorer catches={catches} />

            {!isBankside && (
                <div className="pt-8 border-t border-slate-800">
                    <div className="flex items-center gap-3 mb-2">
                        <TrendsIcon className="w-7 h-7 text-cyan-400" />
                        <h2 className="text-2xl font-bold text-white">Historical Trends</h2>
                    </div>
                    <TrendsDashboard catches={catches} />
                </div>
            )}

            {isChatOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-md z-[100] flex flex-col animate-fade-in">
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900">
                        <div className="flex items-center gap-2">
                             <BotIcon className="w-6 h-6 text-cyan-400" />
                             <h2 className="text-xl font-black text-white uppercase tracking-tighter">The Ghillie</h2>
                        </div>
                        <button onClick={() => setIsChatOpen(false)} className="text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full"><XIcon className="w-6 h-6"/></button>
                    </div>
                    <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && <BotIcon className="w-8 h-8 flex-shrink-0 text-cyan-400 bg-slate-800 p-1.5 rounded-xl border border-slate-700" />}
                                <div className={`max-w-md p-4 rounded-2xl shadow-2xl text-sm leading-relaxed ${msg.sender === 'user' ? 'bg-cyan-600 text-white font-bold' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}>
                                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                                </div>
                                {msg.sender === 'user' && <UserIcon className="w-8 h-8 flex-shrink-0 bg-slate-700 p-1.5 rounded-xl border border-slate-600" />}
                            </div>
                        ))}
                        {isChatLoading && (
                            <div className="flex gap-3">
                                <BotIcon className="w-8 h-8 text-cyan-400 bg-slate-800 p-1.5 rounded-xl animate-pulse" />
                                <div className="bg-slate-800 p-4 rounded-2xl flex gap-1">
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                    <form onSubmit={handleChatSubmit} className="p-4 border-t border-slate-800 flex gap-2 bg-slate-900 pb-10 sm:pb-4">
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ask about spots, rigs, or tactics..."
                            className="flex-grow bg-slate-800 border-2 border-slate-700 rounded-2xl py-3 px-6 text-white outline-none focus:border-cyan-500 font-bold transition-all"
                        />
                        <button type="submit" className="bg-cyan-600 text-white p-4 rounded-2xl hover:bg-cyan-500 disabled:opacity-50 shadow-lg shadow-cyan-900/20" disabled={isChatLoading || !prompt.trim()}>
                            <SendIcon className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{ __html: `
                .bankside-theme {
                    --tw-bg-opacity: 1;
                    background-color: black;
                }
                .bankside-theme h2, .bankside-theme h3 {
                    color: #fbbf24 !important;
                }
            `}} />
        </div>
    );
};

export default Dashboard;
