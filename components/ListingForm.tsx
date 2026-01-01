
import React, { useState, useRef } from 'react';
import type { Listing } from '../types';
import { appraiseGear, estimateShipping } from '../services/geminiService';
import { Camera, Tag, Loader2, Sparkles, Truck, ShieldAlert, Video, Play, Square, RefreshCcw, Users, Info } from 'lucide-react';
import { BotIcon, GBPIcon, PackageIcon, InsuranceIcon, VideoIcon, VerifiedIcon, SplitIcon } from './icons';

interface ListingFormProps {
    onSave: (l: Listing) => void;
    onCancel: () => void;
}

const UK_REGIONS = ["South East", "South West", "London", "Midlands", "North West", "North East", "Wales", "Scotland"];
const CATEGORIES = ["Rods", "Reels", "Alarms", "Bivvies", "Furniture", "Luggage", "Terminal Tackle"];

const SELLER_FEE_PERCENT = 0.05;

const ListingForm: React.FC<ListingFormProps> = ({ onSave, onCancel }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [postage, setPostage] = useState('5.00');
    const [insurance, setInsurance] = useState('2.50');
    const [shippingMethod, setShippingMethod] = useState('Royal Mail Tracked 48');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [condition, setCondition] = useState<'New' | 'Like New' | 'Good' | 'Used'>('Good');
    const [location, setLocation] = useState(UK_REGIONS[0]);
    const [photo, setPhoto] = useState<string | null>(null);
    const [video, setVideo] = useState<string | null>(null);
    const [isAppraising, setIsAppraising] = useState(false);
    const [isCalculatingShipping, setIsCalculatingShipping] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [showCamera, setShowCamera] = useState(false);
    const [isSplitShipping, setIsSplitShipping] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => setPhoto(event.target?.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const startRecording = async () => {
        setShowCamera(true);
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (videoRef.current) videoRef.current.srcObject = stream;
            
            const recorder = new MediaRecorder(stream);
            mediaRecorderRef.current = recorder;
            chunksRef.current = [];

            recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setVideo(url);
                stream.getTracks().forEach(track => track.stop());
                setShowCamera(false);
            };

            recorder.start();
            setIsRecording(true);
            
            setTimeout(() => {
                if (recorder.state === 'recording') stopRecording();
            }, 8000);
        } catch (err) {
            alert("Camera access denied. Video proof is recommended for high-value gear.");
            setShowCamera(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleAIAppraisal = async () => {
        if (!photo && !title) {
            alert("Please add a photo or title first so the Ghillie can see what you're selling!");
            return;
        }
        setIsAppraising(true);
        const appraisal = await appraiseGear(photo || '', title || description);
        if (appraisal) {
            if (appraisal.itemName) setTitle(appraisal.itemName);
            if (appraisal.suggestedPrice) setPrice(String(appraisal.suggestedPrice));
            if (appraisal.description) setDescription(appraisal.description);
            handleShippingEstimate(appraisal.itemName, appraisal.suggestedPrice, category);
        }
        setIsAppraising(false);
    };

    const handleShippingEstimate = async (t: string, p: number, c: string) => {
        setIsCalculatingShipping(true);
        const estimate = await estimateShipping(t, p, c);
        if (estimate) {
            setPostage(String(estimate.postageCost));
            setInsurance(String(estimate.insuranceFee));
            setShippingMethod(estimate.courier);
        }
        setIsCalculatingShipping(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            id: Date.now().toString(),
            title,
            description,
            price: parseFloat(price),
            postagePrice: parseFloat(postage),
            insuranceFee: parseFloat(insurance),
            shippingMethod,
            category,
            condition,
            location,
            photo: photo || undefined,
            verificationVideo: video || undefined,
            sellerId: 'user_123',
            date: new Date().toISOString(),
            status: 'available',
            isInsured: parseFloat(insurance) > 0,
            isSplitShipping
        });
    };

    const inputClasses = "w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-cyan-500 outline-none";
    const labelClasses = "block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2";

    const itemPriceNum = parseFloat(price || '0');
    const marketplaceFee = itemPriceNum * SELLER_FEE_PERCENT;
    const totalShipping = parseFloat(postage || '0') + parseFloat(insurance || '0');
    const sellerShippingShare = isSplitShipping ? totalShipping / 2 : 0;
    const netProceeds = itemPriceNum - marketplaceFee - sellerShippingShare;
    const buyerShippingShare = isSplitShipping ? totalShipping / 2 : totalShipping;

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-slate-800/30 p-6 rounded-2xl border border-slate-700 shadow-inner">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>Gear Photo</label>
                        <div className="relative group overflow-hidden rounded-xl bg-slate-900 border-2 border-dashed border-slate-700 h-64 flex items-center justify-center cursor-pointer hover:border-cyan-500 transition-colors">
                            {photo ? (
                                <img src={photo} alt="Preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center">
                                    <Camera className="w-12 h-12 text-slate-600 mx-auto mb-2" />
                                    <span className="text-slate-500 text-sm">Upload Still Photo</span>
                                </div>
                            )}
                            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className={labelClasses}>Video Proof (Mandatory for Escrow)</label>
                        <div className="relative h-64 bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden group">
                            {showCamera ? (
                                <div className="relative h-full w-full">
                                    <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
                                        {isRecording ? (
                                            <button type="button" onClick={stopRecording} className="bg-red-600 p-4 rounded-full animate-pulse shadow-2xl">
                                                <Square className="w-6 h-6 text-white" />
                                            </button>
                                        ) : (
                                            <button type="button" onClick={() => setIsRecording(true)} className="bg-cyan-600 p-4 rounded-full shadow-2xl">
                                                <Video className="w-6 h-6 text-white" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="absolute top-4 left-4 bg-red-600/20 text-red-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-red-600/30">
                                        <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                                        LIVE VERIFICATION
                                    </div>
                                </div>
                            ) : video ? (
                                <div className="relative h-full w-full">
                                    <video src={video} controls className="w-full h-full object-cover" />
                                    <button 
                                        type="button" 
                                        onClick={startRecording}
                                        className="absolute top-4 right-4 bg-slate-800/80 p-2 rounded-lg text-white hover:bg-slate-700 transition"
                                    >
                                        <RefreshCcw className="w-4 h-4" />
                                    </button>
                                    <div className="absolute top-4 left-4 bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 border border-emerald-500/30">
                                        <VerifiedIcon className="w-3 h-3" />
                                        GHILLIE VERIFIED CLIP
                                    </div>
                                </div>
                            ) : (
                                <div className="h-full w-full flex flex-col items-center justify-center gap-3 p-8 text-center">
                                    <VideoIcon className="w-12 h-12 text-slate-700" />
                                    <p className="text-xs text-slate-500">Record proof of condition for Escrow protection.</p>
                                    <button 
                                        type="button" 
                                        onClick={startRecording}
                                        className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition"
                                    >
                                        Start Video Verification
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className={labelClasses}>Listing Title</label>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Shimano Ultegra 14000 XTD" className={inputClasses} required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className={labelClasses}>Price (£)</label>
                            <div className="relative">
                                <GBPIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                <input type="number" value={price} onChange={e => setPrice(e.target.value)} className={`${inputClasses} pl-10`} required />
                            </div>
                        </div>
                        <div>
                            <label className={labelClasses}>Condition</label>
                            <select value={condition} onChange={e => setCondition(e.target.value as any)} className={inputClasses}>
                                <option>New</option>
                                <option>Like New</option>
                                <option>Good</option>
                                <option>Used</option>
                            </select>
                        </div>
                    </div>

                    {/* New: Seller Fee Transparency Section */}
                    <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-700/50 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-slate-400">Marketplace Fee (5%)</span>
                            <span className="text-slate-200">-£{marketplaceFee.toFixed(2)}</span>
                        </div>
                        {isSplitShipping && (
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-slate-400">Shipping Subsidy (Halves)</span>
                                <span className="text-slate-200">-£{sellerShippingShare.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="pt-2 border-t border-slate-700 flex justify-between items-center">
                            <span className="text-xs font-bold text-cyan-400 uppercase">Estimated Proceeds</span>
                            <span className="text-lg font-black text-white">£{netProceeds.toFixed(2)}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 italic flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            Proceeds are released from Escrow after buyer confirms delivery.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700 space-y-4">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <Truck className="w-4 h-4 text-cyan-400" />
                                <h4 className="text-xs font-bold text-white uppercase">Shipping Hub</h4>
                            </div>
                            <button 
                                type="button" 
                                onClick={handleAIAppraisal}
                                disabled={isAppraising}
                                className="text-[10px] bg-slate-800 hover:bg-slate-700 text-cyan-400 font-bold px-2 py-1 rounded border border-cyan-500/30 flex items-center gap-1 transition-all"
                            >
                                {isAppraising ? <Loader2 className="w-3 h-3 animate-spin" /> : <BotIcon className="w-3 h-3" />}
                                {isAppraising ? "Appraising..." : "AI Suggest"}
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelClasses}>Postage (£)</label>
                                <input type="number" value={postage} onChange={e => setPostage(e.target.value)} className={inputClasses} />
                            </div>
                            <div>
                                <label className={labelClasses}>Insurance (£)</label>
                                <input type="number" value={insurance} onChange={e => setInsurance(e.target.value)} className={inputClasses} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between bg-slate-800/80 p-3 rounded-lg border border-slate-700/50">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${isSplitShipping ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'}`}>
                                    <SplitIcon className="w-4 h-4" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white">Go Halves (50/50)</p>
                                    <p className="text-[9px] text-slate-400">Split delivery & insurance with buyer</p>
                                </div>
                            </div>
                            <input 
                                type="checkbox" 
                                checked={isSplitShipping} 
                                onChange={(e) => setIsSplitShipping(e.target.checked)}
                                className="w-5 h-5 accent-emerald-500 cursor-pointer"
                            />
                        </div>

                        {isSplitShipping && (
                            <div className="bg-emerald-500/5 p-2 rounded border border-emerald-500/20 flex justify-between text-[10px]">
                                <span className="text-slate-400 font-medium italic">Buyer pays: £{buyerShippingShare.toFixed(2)}</span>
                                <span className="text-emerald-400 font-bold">Seller pays: £{buyerShippingShare.toFixed(2)}</span>
                            </div>
                        )}
                        
                        <div>
                            <label className={labelClasses}>Service</label>
                            <input type="text" value={shippingMethod} onChange={e => setShippingMethod(e.target.value)} className={inputClasses} placeholder="e.g. UPS / Royal Mail" />
                        </div>
                    </div>

                    <div>
                        <label className={labelClasses}>Item Description</label>
                        <textarea 
                            value={description} 
                            onChange={e => setDescription(e.target.value)} 
                            rows={4} 
                            className={inputClasses} 
                            placeholder="Detailed description..."
                            required
                        ></textarea>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-700">
                <button 
                    type="submit" 
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95 disabled:opacity-50"
                    disabled={!video && parseFloat(price) > 50}
                >
                    {!video && parseFloat(price) > 50 ? "Video Proof Required" : "Post Secure Listing"}
                </button>
                <button type="button" onClick={onCancel} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-bold py-4 rounded-xl transition-all">
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ListingForm;
