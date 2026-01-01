
import React, { useState, useEffect } from 'react';
import type { Catch, Gear } from '../types';
import { CameraIcon, LocationIcon, WavesIcon } from './icons';
import { getWeatherForLocation } from '../services/geminiService';
import VoiceLogger from './VoiceLogger';

interface CatchLogFormProps {
    addCatch: (c: Catch) => void;
    gear: Gear;
    existingCatch?: Catch | null;
    onCancel?: () => void;
}

const weatherConditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Rain', 'Showers', 'Thunderstorm', 'Snow', 'Fog', 'Windy'];
const riverLevels = ['Steady', 'Rising', 'Falling', 'Flooded', 'Low'];
const riverFlows = ['None', 'Slow', 'Moderate', 'Fast', 'Torrential'];
const riverClarities = ['Clear', 'Tap-Water', 'Murky', 'Colored', 'Very Dirty'];


const CatchLogForm: React.FC<CatchLogFormProps> = ({ addCatch, gear, existingCatch, onCancel }) => {
    const [date, setDate] = useState(new Date().toISOString().substring(0, 16));
    const [species, setSpecies] = useState('Common Carp');
    const [lbs, setLbs] = useState('');
    const [oz, setOz] = useState('');
    const [bait, setBait] = useState(gear.baits[0] || '');
    const [rig, setRig] = useState(gear.rigs[0] || '');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [photo, setPhoto] = useState<string | undefined>(undefined);
    const [isGettingLocation, setIsGettingLocation] = useState(false);
    const [temp, setTemp] = useState('');
    const [condition, setCondition] = useState(weatherConditions[0]);
    const [windSpeed, setWindSpeed] = useState('');
    const [windDirection, setWindDirection] = useState('');
    const [isFetchingWeather, setIsFetchingWeather] = useState(false);

    const [isRiver, setIsRiver] = useState(false);
    const [riverLevel, setRiverLevel] = useState(riverLevels[0]);
    const [riverFlow, setRiverFlow] = useState(riverFlows[0]);
    const [riverClarity, setRiverClarity] = useState(riverClarities[0]);

    const handleVoiceParsed = (data: any) => {
        if (data.species) setSpecies(data.species);
        if (data.lbs) setLbs(String(data.lbs));
        if (data.oz) setOz(String(data.oz));
        if (data.bait) {
             const matchedBait = gear.baits.find(b => b.toLowerCase().includes(data.bait.toLowerCase()));
             if (matchedBait) setBait(matchedBait);
        }
        if (data.rig) {
             const matchedRig = gear.rigs.find(r => r.toLowerCase().includes(data.rig.toLowerCase()));
             if (matchedRig) setRig(matchedRig);
        }
        if (data.notes) setNotes(data.notes);
    };

    useEffect(() => {
        if (existingCatch) {
            setDate(new Date(existingCatch.date).toISOString().substring(0, 16));
            setSpecies(existingCatch.species);
            setLbs(String(existingCatch.weight.lbs));
            setOz(String(existingCatch.weight.oz));
            setBait(existingCatch.bait);
            setRig(existingCatch.rig || '');
            setLocation(existingCatch.location);
            setNotes(existingCatch.notes || '');
            setPhoto(existingCatch.photo);
            if (existingCatch.weather) {
                setTemp(String(existingCatch.weather.temp));
                setCondition(existingCatch.weather.condition);
                setWindSpeed(String(existingCatch.weather.windSpeed || ''));
                setWindDirection(existingCatch.weather.windDirection || '');
            }
            if (existingCatch.river) {
                setIsRiver(true);
                setRiverLevel(existingCatch.river.level);
                setRiverFlow(existingCatch.river.flow);
                setRiverClarity(existingCatch.river.clarity);
            } else {
                setIsRiver(false);
            }
        }
    }, [existingCatch]);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPhoto(event.target?.result as string);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setIsGettingLocation(true);
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                setLocation(`Lat: ${latitude.toFixed(5)}, Lon: ${longitude.toFixed(5)}`);
                setIsGettingLocation(false);

                setIsFetchingWeather(true);
                const weatherData = await getWeatherForLocation(latitude, longitude);
                if (weatherData) {
                    setTemp(String(Math.round(weatherData.temp)));
                    setCondition(weatherData.condition);
                    setWindSpeed(String(Math.round(weatherData.windSpeed)));
                    setWindDirection(weatherData.windDirection);
                }
                setIsFetchingWeather(false);

            }, (error) => {
                alert("Location access required for tactical precision.");
                setIsGettingLocation(false);
            });
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCatch: Catch = {
            id: existingCatch ? existingCatch.id : new Date().toISOString(),
            date,
            species,
            weight: { lbs: parseInt(lbs || '0'), oz: parseInt(oz || '0') },
            bait,
            rig,
            location,
            notes,
            photo,
            weather: temp && condition ? { 
                temp: parseInt(temp), 
                condition,
                windSpeed: windSpeed ? parseInt(windSpeed) : undefined,
                windDirection: windDirection || undefined,
            } : undefined,
            river: isRiver ? {
                level: riverLevel,
                flow: riverFlow,
                clarity: riverClarity,
            } : undefined,
        };
        addCatch(newCatch);
    };

    const inputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md p-2 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none";
    const labelClasses = "block text-sm font-medium text-slate-300 mb-1";

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto pb-24">
            <h2 className="text-2xl font-bold text-white mb-4">{existingCatch ? 'Edit Catch' : 'Log New Catch'}</h2>
            
            {!existingCatch && <VoiceLogger onCatchParsed={handleVoiceParsed} />}

            <div>
                <label htmlFor="date" className={labelClasses}>Date & Time</label>
                <input type="datetime-local" id="date" value={date} onChange={e => setDate(e.target.value)} className={inputClasses} required />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label htmlFor="species" className={labelClasses}>Species</label>
                    <input type="text" id="species" value={species} onChange={e => setSpecies(e.target.value)} className={inputClasses} required />
                </div>
                <div className="grid grid-cols-2 gap-2">
                     <div>
                        <label htmlFor="lbs" className={labelClasses}>Weight (lbs)</label>
                        <input type="number" id="lbs" value={lbs} onChange={e => setLbs(e.target.value)} className={inputClasses} required />
                    </div>
                     <div>
                        <label htmlFor="oz" className={labelClasses}>Weight (oz)</label>
                        <input type="number" id="oz" value={oz} onChange={e => setOz(e.target.value)} className={inputClasses} required />
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-4">
                <label className="text-sm font-semibold text-slate-200">Weather Details</label>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="temp" className={labelClasses}>Temp (°C)</label>
                        <input type="number" id="temp" value={temp} onChange={e => setTemp(e.target.value)} className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="condition" className={labelClasses}>Condition</label>
                        <select id="condition" value={condition} onChange={e => setCondition(e.target.value)} className={inputClasses}>
                            {weatherConditions.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <WavesIcon className="w-4 h-4 text-cyan-400" />
                        <label className="text-sm font-semibold text-slate-200">River Conditions</label>
                    </div>
                    <input type="checkbox" checked={isRiver} onChange={e => setIsRiver(e.target.checked)} className="w-4 h-4" />
                </div>
                {isRiver && (
                    <div className="grid grid-cols-3 gap-2">
                        <select value={riverLevel} onChange={e => setRiverLevel(e.target.value)} className={inputClasses}>
                            {riverLevels.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                        <select value={riverFlow} onChange={e => setRiverFlow(e.target.value)} className={inputClasses}>
                            {riverFlows.map(f => <option key={f} value={f}>{f}</option>)}
                        </select>
                        <select value={riverClarity} onChange={e => setRiverClarity(e.target.value)} className={inputClasses}>
                            {riverClarities.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <select id="bait" value={bait} onChange={e => setBait(e.target.value)} className={inputClasses} required>
                    {gear.baits.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <select id="rig" value={rig} onChange={e => setRig(e.target.value)} className={inputClasses}>
                    {gear.rigs.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
            </div>

            <div>
                 <div className="flex gap-2">
                    <input type="text" id="location" value={location} onChange={e => setLocation(e.target.value)} className={inputClasses} placeholder="Location/Swim" required />
                    <button type="button" onClick={handleGetLocation} className="p-2 bg-slate-600 rounded-md">
                        <LocationIcon className="w-5 h-5"/>
                    </button>
                 </div>
            </div>

            <div>
                <label className={labelClasses}>Photo</label>
                <div className="mt-1 flex items-center gap-4">
                    {photo ? <img src={photo} alt="Catch" className="w-20 h-20 rounded-md object-cover"/> : <div className="w-20 h-20 bg-slate-700 rounded-md flex items-center justify-center"><CameraIcon className="w-8 h-8 text-slate-500"/></div>}
                    <input id="photo-upload" type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload}/>
                    <label htmlFor="photo-upload" className="cursor-pointer bg-slate-600 text-white py-2 px-4 rounded-md text-sm">Upload Photo</label>
                </div>
            </div>
            
            <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className={inputClasses} placeholder="Fight notes, depth, time of day..."></textarea>

            <div className="flex gap-4 pt-4">
                <button type="submit" className="flex-1 bg-cyan-600 text-white font-bold py-3 rounded-md hover:bg-cyan-700 transition">
                    {existingCatch ? 'Update' : 'Save Catch'}
                </button>
                {onCancel && <button type="button" onClick={onCancel} className="flex-1 bg-slate-600 text-white font-bold py-3 rounded-md">Cancel</button>}
            </div>
        </form>
    );
};

export default CatchLogForm;
