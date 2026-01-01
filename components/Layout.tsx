
import React from 'react';
import type { View } from '../types';
import { DashboardIcon, ListIcon, LogIcon, GearIcon, BookOpenIcon, FishIcon, MarketIcon, UserIcon } from './icons';

interface LayoutProps {
    children: React.ReactNode;
    activeView: View;
    setActiveView: (view: View) => void;
    setEditingCatch: (c: null) => void;
}

const navItems = [
    { id: 'dashboard', label: 'Dash', icon: DashboardIcon },
    { id: 'list', label: 'Log', icon: ListIcon },
    { id: 'log', label: 'Catch', icon: LogIcon },
    { id: 'marketplace', label: 'Market', icon: MarketIcon },
    { id: 'profile', label: 'Me', icon: UserIcon },
];

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView, setEditingCatch }) => {
    
    const handleNavClick = (view: View) => {
        if(view === 'log') {
            setEditingCatch(null);
        }
        setActiveView(view);
    }
    
    return (
        <div className="min-h-screen bg-slate-900 text-slate-200 flex flex-col">
            <header className="bg-slate-800/50 backdrop-blur-sm p-4 sticky top-0 z-10 border-b border-slate-700">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FishIcon className="w-8 h-8 text-cyan-400"/>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Carpy<span className="text-cyan-500">AI</span></h1>
                    </div>
                    <div className="bg-slate-900/50 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ghillie Online</span>
                    </div>
                </div>
            </header>
            
            <main className="flex-grow container mx-auto p-4 pb-24 max-w-5xl">
                {children}
            </main>

            <nav className="fixed bottom-0 left-0 right-0 bg-slate-800/90 backdrop-blur-md border-t border-slate-700 z-50 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
                <div className="container mx-auto grid grid-cols-5 h-20">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => handleNavClick(item.id as View)}
                            className={`flex flex-col items-center justify-center transition-all duration-300 relative ${
                                activeView === item.id ? 'text-cyan-400' : 'text-slate-500 hover:text-cyan-300'
                            }`}
                        >
                            {activeView === item.id && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-cyan-400 rounded-b-full shadow-[0_5px_15px_rgba(34,211,238,0.5)]"></div>
                            )}
                            <item.icon className={`w-6 h-6 mb-1 ${item.id === 'log' && 'bg-cyan-500 text-slate-900 rounded-full p-1.5 w-10 h-10 -mt-8 shadow-xl border-4 border-slate-900'}`} />
                            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default Layout;
