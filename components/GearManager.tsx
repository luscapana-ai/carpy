import React, { useState } from 'react';
import type { Gear } from '../types';
import { DeleteIcon, GearIcon } from './icons';

interface GearManagerProps {
    gear: Gear;
    setGear: React.Dispatch<React.SetStateAction<Gear>>;
}

const GearList: React.FC<{ title: string, items: string[], onAdd: (item: string) => void, onDelete: (item: string) => void }> = ({ title, items, onAdd, onDelete }) => {
    const [newItem, setNewItem] = useState('');

    const handleAdd = () => {
        if (newItem && !items.includes(newItem)) {
            onAdd(newItem);
            setNewItem('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    }

    return (
        <div>
            <div className="flex gap-2 mb-3">
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={`New ${title.replace(/&/g, '/').split('/')[0].trim().slice(0, -1)}...`}
                    className="flex-grow bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 outline-none"
                />
                <button onClick={handleAdd} className="bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700 transition">
                    Add
                </button>
            </div>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
                {(items || []).map(item => (
                    <li key={item} className="flex justify-between items-center bg-slate-700 p-2 rounded-md">
                        <span className="text-slate-300">{item}</span>
                        <button onClick={() => onDelete(item)} className="text-slate-400 hover:text-red-500 transition">
                            <DeleteIcon className="w-5 h-5" />
                        </button>
                    </li>
                ))}
                 {(items || []).length === 0 && (
                    <li className="text-center text-slate-500 py-4">No {title.toLowerCase()} added yet.</li>
                )}
            </ul>
        </div>
    );
};

const gearCategories = [
    { id: 'coreTackle', label: 'Core Tackle' },
    { id: 'banksideSetup', label: 'Bankside' },
    { id: 'toolsAndAccessories', label: 'Tools & Accs' },
    { id: 'fishCare', label: 'Fish Care' },
    { id: 'baiting', label: 'Baiting' },
    { id: 'luggageAndTransport', label: 'Luggage' },
];

type GearView = Exclude<keyof Gear, 'baits' | 'rigs'>;


const GearManager: React.FC<GearManagerProps> = ({ gear, setGear }) => {
    const [activeView, setActiveView] = useState<GearView>('coreTackle');
    
    const handleAddItem = (category: GearView, item: string) => {
        if (item && !((gear[category] as string[]) || []).includes(item)) {
            setGear(g => {
                const newItems = [...((g[category] as string[]) || []), item].sort();
                return { ...g, [category]: newItems };
            });
        }
    };

    const handleDeleteItem = (category: GearView, item: string) => {
        setGear(g => ({
            ...g,
            [category]: ((g[category] as string[]) || []).filter(i => i !== item)
        }));
    };
    
    const activeTabClasses = "flex-1 p-3 font-semibold text-white bg-slate-700/80 rounded-t-lg text-xs sm:text-sm";
    const inactiveTabClasses = "flex-1 p-3 font-semibold text-slate-400 hover:bg-slate-700/50 rounded-t-lg transition-colors text-xs sm:text-sm";

    const currentCategory = gearCategories.find(c => c.id === activeView);
    const currentItems = gear[activeView] || [];
    const currentTitle = currentCategory ? currentCategory.label : '';

    return (
        <div className="space-y-4 max-w-lg mx-auto">
            <div className="flex items-center gap-3 mb-4">
                 <GearIcon className="w-8 h-8 text-cyan-400" />
                 <h2 className="text-2xl font-bold text-white">Manage Gear</h2>
            </div>
            
            <div className="flex border-b border-slate-700">
                 {gearCategories.map(cat => (
                     <button
                        key={cat.id}
                        onClick={() => setActiveView(cat.id as GearView)}
                        className={activeView === cat.id ? activeTabClasses : inactiveTabClasses}
                    >
                        {cat.label}
                    </button>
                 ))}
            </div>

            <div className="bg-slate-800 p-4 rounded-b-lg">
                <GearList 
                    title={currentTitle} 
                    items={currentItems} 
                    onAdd={(item) => handleAddItem(activeView, item)} 
                    onDelete={(item) => handleDeleteItem(activeView, item)} 
                />
            </div>
        </div>
    );
};

export default GearManager;