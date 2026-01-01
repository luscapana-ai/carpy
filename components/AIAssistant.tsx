
import React, { useState } from 'react';
import BaitGuide from './BaitGuide';
import RigGuide from './RigGuide';
import TacticsGuide from './TacticsGuide';
import WeatherGuide from './WeatherGuide';
import SeasonalGuide from './SeasonalGuide';
import FishCareGuide from './FishCareGuide';
import RiverGuide from './RiverGuide';
import RigMechanicsGuide from './RigMechanicsGuide';
import ScoutTool from './ScoutTool';
import GhillieLive from './GhillieLive';
import RigGenerator from './RigGenerator';

type GuideView = 'live' | 'scout' | 'blueprint' | 'seasonal' | 'weather' | 'baits' | 'rigs' | 'mechanics' | 'tactics' | 'fishcare' | 'rivers';

const AIAssistant: React.FC = () => {
    const [activeView, setActiveView] = useState<GuideView>('live');

    const activeTabClasses = "flex-1 p-3 font-semibold text-white bg-slate-700/80 rounded-t-lg text-[10px] sm:text-xs uppercase tracking-tighter whitespace-nowrap border-b-2 border-cyan-400";
    const inactiveTabClasses = "flex-1 p-3 font-semibold text-slate-400 hover:bg-slate-700/50 rounded-t-lg transition-colors text-[10px] sm:text-xs uppercase tracking-tighter whitespace-nowrap";

    const renderView = () => {
        const guideContainerClasses = "flex-grow p-4 overflow-y-auto space-y-6";
        switch(activeView) {
            case 'live':
                return <div className={guideContainerClasses}><GhillieLive /></div>;
            case 'scout':
                 return <div className={guideContainerClasses}><ScoutTool /></div>;
            case 'blueprint':
                 return <div className={guideContainerClasses}><RigGenerator /></div>;
            case 'seasonal':
                 return <div className={guideContainerClasses}><SeasonalGuide /></div>;
            case 'weather':
                 return <div className={guideContainerClasses}><WeatherGuide /></div>;
            case 'baits':
                return <div className={guideContainerClasses}><BaitGuide /></div>;
            case 'rigs':
                return <div className={guideContainerClasses}><RigGuide /></div>;
            case 'mechanics':
                return <div className={guideContainerClasses}><RigMechanicsGuide /></div>;
            case 'tactics':
                 return <div className={guideContainerClasses}><TacticsGuide /></div>;
            case 'fishcare':
                return <div className={guideContainerClasses}><FishCareGuide /></div>;
            case 'rivers':
                return <div className={guideContainerClasses}><RiverGuide /></div>;
            default:
                return <div className={guideContainerClasses}><GhillieLive /></div>;
        }
    }

    return (
        <div className="flex flex-col h-[calc(100vh-150px)] bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-800">
            <div className="flex border-b border-slate-800 overflow-x-auto scrollbar-hide bg-slate-800/50">
                {[
                    { id: 'live', label: 'Live' },
                    { id: 'scout', label: 'Scout' },
                    { id: 'blueprint', label: 'Blueprint' },
                    { id: 'seasonal', label: 'Season' },
                    { id: 'weather', label: 'Weather' },
                    { id: 'baits', label: 'Baits' },
                    { id: 'rigs', label: 'Rigs' },
                    { id: 'mechanics', label: 'Tech' },
                    { id: 'tactics', label: 'Tactics' },
                    { id: 'rivers', label: 'Rivers' },
                    { id: 'fishcare', label: 'Care' }
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveView(tab.id as GuideView)}
                        className={activeView === tab.id ? activeTabClasses : inactiveTabClasses}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            
            {renderView()}
            
        </div>
    );
};

export default AIAssistant;
