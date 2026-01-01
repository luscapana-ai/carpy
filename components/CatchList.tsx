
import React from 'react';
import type { Catch } from '../types';
import CatchCard from './CatchCard';
import { ListIcon } from './icons';

interface CatchListProps {
    catches: Catch[];
    onDelete: (id: string) => void;
    onEdit: (catchItem: Catch) => void;
}

const CatchList: React.FC<CatchListProps> = ({ catches, onDelete, onEdit }) => {
    if (catches.length === 0) {
        return (
            <div className="text-center py-20">
                <ListIcon className="mx-auto w-16 h-16 text-slate-600 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Your Catch Log is Empty</h2>
                <p className="text-slate-400">Press 'Log Catch' to add your first one!</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
             <h2 className="text-2xl font-bold text-white">My Catches ({catches.length})</h2>
            {catches.map(c => (
                <CatchCard key={c.id} catchItem={c} onDelete={onDelete} onEdit={onEdit} />
            ))}
        </div>
    );
};

export default CatchList;
