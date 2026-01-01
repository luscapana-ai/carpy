
import React from 'react';
import type { Catch } from '../types';
import { FishIcon, WeightIcon, CalendarIcon, LocationIcon, DeleteIcon, EditIcon, CameraIcon, SunIcon, CloudIcon, HumidityIcon, WindIcon, WavesIcon } from './icons';

interface CatchCardProps {
    catchItem: Catch;
    onDelete: (id: string) => void;
    onEdit: (catchItem: Catch) => void;
}

const InfoPill: React.FC<{ icon: React.ReactNode, text: string | undefined }> = ({ icon, text }) => {
    if (!text) return null;
    return (
        <div className="flex items-center gap-2 bg-slate-700/50 rounded-full px-3 py-1 text-sm">
            {icon}
            <span className="text-slate-300">{text}</span>
        </div>
    );
};

const CatchCard: React.FC<CatchCardProps> = ({ catchItem, onDelete, onEdit }) => {

    const getWeatherDisplay = (weather: Catch['weather']) => {
        if (!weather) return null;

        const { temp, condition, windSpeed, windDirection } = weather;
        const lowerCaseCondition = condition.toLowerCase();
        let conditionIcon: React.ReactNode;

        if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) {
            conditionIcon = <SunIcon className="w-4 h-4 text-yellow-400" />;
        } else if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('shower') || lowerCaseCondition.includes('drizzle')) {
            conditionIcon = <HumidityIcon className="w-4 h-4 text-blue-400" />;
        } else {
            conditionIcon = <CloudIcon className="w-4 h-4 text-slate-400" />;
        }
        
        const windText = (windSpeed !== undefined && windSpeed !== null) && windDirection ? `${windSpeed}kph ${windDirection}` : undefined;

        return (
             <>
                <InfoPill icon={<SunIcon className="w-4 h-4 text-orange-400" />} text={`${temp}°C`} />
                <InfoPill icon={conditionIcon} text={condition} />
                {windText && <InfoPill icon={<WindIcon className="w-4 h-4 text-sky-400" />} text={windText} />}
            </>
        )
    }

    const getRiverDisplay = (river: Catch['river']) => {
        if (!river) return null;
        return (
            <>
                <InfoPill icon={<WavesIcon className="w-4 h-4 text-cyan-400" />} text={`Level: ${river.level}`} />
                <InfoPill icon={<WavesIcon className="w-4 h-4 text-cyan-400" />} text={`Flow: ${river.flow}`} />
                <InfoPill icon={<WavesIcon className="w-4 h-4 text-cyan-400" />} text={`Clarity: ${river.clarity}`} />
            </>
        );
    }

    return (
        <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg flex flex-col sm:flex-row">
            {catchItem.photo ? (
                <img src={catchItem.photo} alt={`Photo of ${catchItem.species}`} className="w-full h-48 sm:w-48 sm:h-auto object-cover" />
            ) : (
                <div className="w-full h-48 sm:w-48 sm:h-auto bg-slate-700 flex items-center justify-center">
                    <CameraIcon className="w-12 h-12 text-slate-500" />
                </div>
            )}
            
            <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-white">{catchItem.species}</h3>
                         <div className="flex items-center gap-2">
                             <button onClick={() => onEdit(catchItem)} className="text-slate-400 hover:text-cyan-400 transition">
                                <EditIcon className="w-5 h-5" />
                            </button>
                            <button onClick={() => onDelete(catchItem.id)} className="text-slate-400 hover:text-red-500 transition">
                                <DeleteIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                        <WeightIcon className="w-5 h-5 text-green-400" />
                        <p className="text-2xl font-semibold text-green-400">{catchItem.weight.lbs}lb {catchItem.weight.oz}oz</p>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2">
                        <InfoPill icon={<FishIcon className="w-4 h-4 text-cyan-400" />} text={catchItem.bait} />
                        {catchItem.rig && <InfoPill icon={<FishIcon className="w-4 h-4 text-cyan-400" />} text={catchItem.rig} />}
                        {getWeatherDisplay(catchItem.weather)}
                        {getRiverDisplay(catchItem.river)}
                    </div>
                     <div className="mt-3 space-y-2 text-sm text-slate-400">
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4"/>
                            <span>{new Date(catchItem.date).toLocaleString()}</span>
                        </div>
                         <div className="flex items-center gap-2">
                            <LocationIcon className="w-4 h-4"/>
                            <span>{catchItem.location}</span>
                        </div>
                    </div>
                    {catchItem.notes && <p className="mt-3 text-slate-300 bg-slate-700/30 p-2 rounded-md text-sm italic">"{catchItem.notes}"</p>}
                </div>
            </div>
        </div>
    );
};

export default CatchCard;
