
import React, { useState, useRef } from 'react';
import type { UserProfile, Catch } from '../types';
import { 
    UserIcon, CameraIcon, GearIcon, FishIcon, WeightIcon, ListIcon, 
    Sparkles, CheckIcon, VerifiedIcon, HistoryIcon, PackageIcon,
    LockIcon, EscrowIcon, CheckoutIcon, ExternalIcon, BotIcon 
} from './icons';

interface ProfileManagerProps {
    profile: UserProfile;
    setProfile: (p: UserProfile) => void;
    catches: Catch[];
}

const ProfileManager: React.FC<ProfileManagerProps> = ({ profile, setProfile, catches }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(profile.name);
    const [bio, setBio] = useState(profile.bio);
    const [avatar, setAvatar] = useState(profile.avatar);
    const [firebaseConfig, setFirebaseConfig] = useState(profile.firebaseConfig || '');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleSave = () => {
        setProfile({
            ...profile,
            name,
            bio,
            avatar,
            firebaseConfig
        });
        setIsEditing(false);
    };

    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setAvatar(event.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleExport = () => {
        const data = { profile, catches };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carpy_backup_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target?.result as string);
                if (data.profile && data.catches) {
                    if (window.confirm("Importing will overwrite current data. Continue?")) {
                        setProfile(data.profile);
                        alert("Profile data imported successfully!");
                    }
                }
            } catch (err) {
                alert("Invalid backup file.");
            }
        };
        reader.readAsText(file);
    };

    const stats = {
        totalCatches: catches.length,
        totalWeight: parseFloat(catches.reduce((sum: number, c: Catch) => sum + (c.weight?.lbs || 0) + ((c.weight?.oz || 0) / 16), 0).toFixed(1)),
        pb: catches.length > 0 ? Math.max(...catches.map((c: Catch) => (c.weight?.lbs || 0) + ((c.weight?.oz || 0) / 16))) : 0,
        mostUsedBait: catches.length > 0 ? catches.reduce((acc, c) => {
            acc[c.bait] = (acc[c.bait] || 0) + 1;
            return acc;
        }, {} as Record<string, number>) : ({} as Record<string, number>),
    };

    const sortedBaits = (Object.entries(stats.mostUsedBait) as [string, number][]).sort((a, b) => b[1] - a[1]);

    return (
        <div className="space-y-8 animate-fade-in pb-24">
            <div className="bg-slate-800/40 p-8 rounded-3xl border border-slate-700/50 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left relative z-10">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-3xl overflow-hidden border-4 border-slate-700 bg-slate-900 shadow-2xl relative rotate-3 transition-transform hover:rotate-0">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-700">
                                    <UserIcon className="w-16 h-16" />
                                </div>
                            )}
                            {isEditing && (
                                <label className="absolute inset-0 bg-cyan-600/60 backdrop-blur-sm flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                    <CameraIcon className="w-8 h-8 text-white" />
                                    <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
                                </label>
                            )}
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-cyan-500 p-2 rounded-xl shadow-lg border-2 border-slate-900">
                            <VerifiedIcon className="w-5 h-5 text-white" />
                        </div>
                    </div>

                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-4">
                            <div className="w-full">
                                {isEditing ? (
                                    <input 
                                        value={name} 
                                        onChange={e => setName(e.target.value)} 
                                        className="bg-slate-900/50 text-3xl font-black text-white border-b-2 border-cyan-500 outline-none w-full py-1"
                                        placeholder="Your Name"
                                    />
                                ) : (
                                    <h2 className="text-4xl font-black text-white tracking-tight">{profile.name}</h2>
                                )}
                                <p className="text-cyan-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">Veteran Specimen Hunter</p>
                            </div>
                            <button 
                                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 ${
                                    isEditing 
                                    ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20' 
                                    : 'bg-slate-700 hover:bg-slate-600 text-cyan-400 border border-slate-600'
                                }`}
                            >
                                {isEditing ? 'Confirm Changes' : 'Edit Profile'}
                            </button>
                        </div>
                        {isEditing ? (
                            <textarea 
                                value={bio} 
                                onChange={e => setBio(e.target.value)} 
                                className="w-full bg-slate-900/50 p-4 rounded-xl text-slate-300 text-sm border border-slate-700 outline-none focus:ring-2 focus:ring-cyan-500/50"
                                rows={3}
                                placeholder="Tell us about your fishing style..."
                            />
                        ) : (
                            <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-2xl">{profile.bio}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                            <EscrowIcon className="w-5 h-5 text-emerald-400" />
                            Ghillie Cloud Sync
                        </h3>
                        {profile.firebaseConfig && (
                            <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded-full border border-emerald-500/20">LIVE CLOUD</span>
                        )}
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-xs text-slate-400 font-bold leading-relaxed italic">Connect your Firebase instance to enable cross-device specimen log persistence and real-time marketplace alerts.</p>
                        
                        <div className="space-y-2">
                             <div className="flex items-center gap-2">
                                <LockIcon className="w-4 h-4 text-slate-500" />
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">SDK Configuration</span>
                            </div>
                            <textarea 
                                value={firebaseConfig}
                                onChange={(e) => setFirebaseConfig(e.target.value)}
                                placeholder='{ "apiKey": "...", "authDomain": "...", "projectId": "..." }'
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-[10px] text-cyan-300 font-mono outline-none focus:border-cyan-500 transition-all h-32"
                            />
                        </div>

                        <div className="flex gap-2">
                            <button 
                                onClick={handleSave}
                                className="flex-grow bg-cyan-600 hover:bg-cyan-500 text-white font-black text-[10px] py-3 rounded-xl uppercase tracking-widest shadow-lg shadow-cyan-900/20"
                            >
                                Connect Sync Engine
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/30 p-8 rounded-3xl border border-slate-700/50 space-y-6">
                    <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-tighter">
                        <PackageIcon className="w-5 h-5 text-cyan-400" />
                        Local Portability
                    </h3>
                    <div className="space-y-4">
                        <p className="text-xs text-slate-400 font-bold leading-relaxed">No Cloud? No problem. Export your entire Carpy vault as a portable JSON file to manually migrate devices.</p>
                        <div className="grid grid-cols-1 gap-3">
                            <button 
                                onClick={handleExport}
                                className="bg-slate-700 hover:bg-slate-600 text-white font-black text-[10px] py-3 rounded-xl uppercase tracking-widest border border-slate-600 transition-all flex items-center justify-center gap-2"
                            >
                                <HistoryIcon className="w-4 h-4" />
                                Generate Portable Vault (.json)
                            </button>
                            <button 
                                onClick={() => fileInputRef.current?.click()}
                                className="bg-slate-700 hover:bg-slate-600 text-white font-black text-[10px] py-3 rounded-xl uppercase tracking-widest border border-slate-600 transition-all flex items-center justify-center gap-2"
                            >
                                <BotIcon className="w-4 h-4" />
                                Restore from Vault
                            </button>
                        </div>
                        <input type="file" ref={fileInputRef} onChange={handleImport} accept=".json" className="hidden" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileManager;
