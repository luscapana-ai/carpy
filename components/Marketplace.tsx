
import React, { useState } from 'react';
import type { Listing } from '../types';
import { 
    MarketIcon, SearchIcon, PriceIcon, GBPIcon, LocationIcon, ExternalIcon, 
    PlusIcon, XIcon, EscrowIcon, LockIcon, ShippingIcon, CheckIcon, HistoryIcon,
    WarningIcon, PackageIcon, InsuranceIcon, CheckoutIcon, PlayIcon, VerifiedIcon,
    SplitIcon, FilterIcon
} from './icons';
import ListingForm from './ListingForm';

const UK_REGIONS = ["South East", "South West", "London", "Midlands", "North West", "North East", "Wales", "Scotland"];
const CATEGORIES = ["Rods", "Reels", "Alarms", "Bivvies", "Furniture", "Luggage", "Terminal Tackle"];
const CONDITIONS = ["New", "Like New", "Good", "Used"];

const BUYER_TRANSACTION_FEE = 1.00;

interface MarketplaceProps {
    listings: Listing[];
    addListing: (l: Listing) => void;
    updateListing: (l: Listing) => void;
}

const Marketplace: React.FC<MarketplaceProps> = ({ listings, addListing, updateListing }) => {
    const [search, setSearch] = useState('');
    const [region, setRegion] = useState('All');
    const [category, setCategory] = useState('All');
    const [conditionFilter, setConditionFilter] = useState('All');
    const [isAdding, setIsAdding] = useState(false);
    const [activeTab, setActiveTab] = useState<'browse' | 'transactions'>('browse');
    const [viewingVideo, setViewingVideo] = useState<string | null>(null);

    const filteredListings = listings.filter(l => {
        if (activeTab === 'browse') {
            const searchLower = search.toLowerCase();
            const searchTokens = searchLower.split(/\s+/).filter(t => t.length > 0);
            
            // Enhanced multi-token partial matching: all words must be found in at least one field
            const matchesSearch = searchTokens.every(token => 
                l.title.toLowerCase().includes(token) || 
                l.description.toLowerCase().includes(token) ||
                l.category.toLowerCase().includes(token)
            );
            
            const matchesRegion = region === 'All' || l.location === region;
            const matchesCategory = category === 'All' || l.category === category;
            const matchesCondition = conditionFilter === 'All' || l.condition === conditionFilter;
            
            return matchesSearch && matchesRegion && matchesCategory && matchesCondition && l.status === 'available';
        }
        return l.status !== 'available';
    });

    const handleBuy = (item: Listing) => {
        const fullShipping = (item.postagePrice || 0) + (item.insuranceFee || 0);
        const buyerShipping = item.isSplitShipping ? fullShipping / 2 : fullShipping;
        const total = item.price + buyerShipping + BUYER_TRANSACTION_FEE;

        const confirmationMsg = `Ghillie Secure Checkout:\n\n` +
            `Item Price: £${item.price.toFixed(2)}\n` +
            `Secure Shipping: £${fullShipping.toFixed(2)}\n` +
            (item.isSplitShipping ? `Split Costs Subsidy: -£${(fullShipping / 2).toFixed(2)}\n` : '') +
            `Buyer Transaction Fee: £${BUYER_TRANSACTION_FEE.toFixed(2)}\n` +
            `------------------\n` +
            `Total to Escrow: £${total.toFixed(2)}\n\n` +
            `Ghillie holds these funds in Escrow until you confirm receipt. Proceed?`;

        if (window.confirm(confirmationMsg)) {
            updateListing({
                ...item,
                status: 'escrow_funded',
                buyerId: 'user_123' 
            });
            setActiveTab('transactions');
        }
    };

    const handleRelease = (item: Listing) => {
        if (window.confirm("Release funds to the seller? Confirm you have received the item in described condition.")) {
            updateListing({ ...item, status: 'released' });
        }
    };

    const handleShip = (item: Listing) => {
        updateListing({ ...item, status: 'shipped' });
    };

    const handleDispute = (item: Listing) => {
        const reason = prompt("Describe the issue with this item. Reference the Video Verification if applicable:");
        if (reason) {
            updateListing({ ...item, status: 'disputed', disputeReason: reason });
        }
    };

    const getStatusBadge = (status: Listing['status']) => {
        switch (status) {
            case 'escrow_funded': return <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><LockIcon className="w-3 h-3"/> IN ESCROW</span>;
            case 'shipped': return <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><ShippingIcon className="w-3 h-3"/> DISPATCHED</span>;
            case 'released': return <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><CheckIcon className="w-3 h-3"/> COMPLETED</span>;
            case 'disputed': return <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1"><WarningIcon className="w-3 h-3"/> DISPUTED</span>;
            default: return null;
        }
    };

    const filterSelectClasses = "bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-bold text-slate-300 outline-none focus:border-cyan-500 transition-all cursor-pointer hover:bg-slate-800";

    return (
        <div className="space-y-6 pb-24">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-800 rounded-lg shadow-inner">
                        <MarketIcon className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-white tracking-tight uppercase tracking-tighter">Tackle Exchange</h2>
                        <div className="flex items-center gap-1.5">
                            <VerifiedIcon className="w-3 h-3 text-emerald-400" />
                            <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Video Verified Gear</p>
                        </div>
                    </div>
                </div>
                <button 
                    onClick={() => setIsAdding(true)}
                    className="w-full sm:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20 transition-all active:scale-95"
                >
                    <PlusIcon className="w-4 h-4" />
                    List Item
                </button>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex gap-2 p-1 bg-slate-800/50 rounded-xl border border-slate-700 w-fit">
                    <button onClick={() => setActiveTab('browse')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'browse' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}><SearchIcon className="w-4 h-4" />Browse</button>
                    <button onClick={() => setActiveTab('transactions')} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === 'transactions' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'}`}><HistoryIcon className="w-4 h-4" />Activity</button>
                </div>

                {activeTab === 'browse' && (
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-800/40 p-4 rounded-2xl border border-slate-700/50">
                            <div className="md:col-span-1 relative group">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input 
                                    type="text" 
                                    value={search} 
                                    onChange={e => setSearch(e.target.value)} 
                                    placeholder="Search gear (e.g. shimano reels)..." 
                                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-2 pl-10 pr-4 text-xs font-bold text-white outline-none focus:border-cyan-500 transition-all"
                                />
                            </div>
                            <select value={category} onChange={e => setCategory(e.target.value)} className={filterSelectClasses}>
                                <option value="All">All Categories</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <select value={region} onChange={e => setRegion(e.target.value)} className={filterSelectClasses}>
                                <option value="All">All Regions</option>
                                {UK_REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <select value={conditionFilter} onChange={e => setConditionFilter(e.target.value)} className={filterSelectClasses}>
                                <option value="All">Any Condition</option>
                                {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="flex gap-2 items-center px-1">
                            <button 
                                onClick={() => setConditionFilter(conditionFilter === 'Used' ? 'All' : 'Used')}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${conditionFilter === 'Used' ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
                            >
                                Used Gear Only
                            </button>
                            <button 
                                onClick={() => setConditionFilter(conditionFilter === 'New' ? 'All' : 'New')}
                                className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all border ${conditionFilter === 'New' ? 'bg-cyan-600 text-white border-cyan-500' : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'}`}
                            >
                                Brand New Only
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredListings.length > 0 ? filteredListings.map(item => (
                    <div key={item.id} className={`bg-slate-800 border rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border-slate-700 hover:border-cyan-500/50`}>
                        <div className="relative h-44 overflow-hidden group">
                            {item.photo ? (
                                <img src={item.photo} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            ) : (
                                <div className="w-full h-full bg-slate-700 flex items-center justify-center"><MarketIcon className="w-12 h-12 text-slate-500" /></div>
                            )}
                            
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                {item.verificationVideo && (
                                    <button 
                                        onClick={() => setViewingVideo(item.verificationVideo!)}
                                        className="bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 border border-white/20 hover:bg-white/20 transition"
                                    >
                                        <PlayIcon className="w-4 h-4" />
                                        Watch Proof
                                    </button>
                                )}
                            </div>

                            <div className="absolute top-3 left-3 flex flex-col gap-2">
                                <span className="bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10">{item.condition}</span>
                                {item.verificationVideo && (
                                    <span className="bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1">
                                        <VerifiedIcon className="w-3 h-3" /> VERIFIED
                                    </span>
                                )}
                                {item.isSplitShipping && (
                                    <span className="bg-cyan-500/90 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded border border-white/10 flex items-center gap-1 shadow-lg shadow-cyan-500/20">
                                        <SplitIcon className="w-3 h-3" /> 50/50 SHIPPING
                                    </span>
                                )}
                                {getStatusBadge(item.status)}
                            </div>
                        </div>

                        <div className="p-4 space-y-3">
                            <div>
                                <h3 className="font-bold text-white text-base truncate">{item.title}</h3>
                                <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-medium uppercase">
                                    <LocationIcon className="w-3 h-3" />
                                    <span>{item.location} • {item.category}</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <div className="bg-slate-900/50 rounded-lg p-2 border border-slate-700 flex-1 min-w-[100px]">
                                    <div className="flex items-center gap-1 text-slate-500 text-[9px] font-bold uppercase mb-1">
                                        <PackageIcon className="w-3 h-3" /> Postage
                                    </div>
                                    <div className="text-white text-xs font-bold">
                                        {item.isSplitShipping ? (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-500 line-through">£{item.postagePrice}</span>
                                                <span className="text-cyan-400">£{(item.postagePrice / 2).toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            `£${item.postagePrice || 0}`
                                        )}
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 rounded-lg p-2 border border-slate-700 flex-1 min-w-[100px]">
                                    <div className="flex items-center gap-1 text-slate-500 text-[9px] font-bold uppercase mb-1">
                                        <InsuranceIcon className="w-3 h-3" /> Insurance
                                    </div>
                                    <div className="text-emerald-400 text-xs font-bold">
                                        {item.isSplitShipping ? (
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-slate-500 line-through">£{item.insuranceFee}</span>
                                                <span>£{(item.insuranceFee / 2).toFixed(2)}</span>
                                            </div>
                                        ) : (
                                            `£${item.insuranceFee || 0}`
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                                <div className="flex items-center gap-1 text-cyan-400 font-black text-xl">
                                    <GBPIcon className="w-4 h-4" />
                                    <span>{item.price}</span>
                                </div>
                                <div className="text-[9px] text-slate-500 italic uppercase font-bold tracking-tight">{item.shippingMethod}</div>
                            </div>

                            <div className="space-y-2 pt-2">
                                {item.status === 'available' && (
                                    <button 
                                        onClick={() => handleBuy(item)}
                                        className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 active:scale-95 text-sm shadow-lg shadow-emerald-900/20"
                                    >
                                        <CheckoutIcon className="w-4 h-4" />
                                        Secure Buy
                                    </button>
                                )}

                                {item.status === 'escrow_funded' && item.buyerId === 'user_123' && (
                                    <div className="space-y-2">
                                        <div className="text-[10px] text-center font-bold text-slate-500 uppercase">Held in Escrow</div>
                                        <button onClick={() => handleDispute(item)} className="w-full bg-slate-700 text-slate-400 py-2 rounded-lg text-xs hover:text-red-400 transition-all border border-slate-600">Dispute & Trigger AI Review</button>
                                    </div>
                                )}

                                {item.status === 'shipped' && item.buyerId === 'user_123' && (
                                    <button onClick={() => handleRelease(item)} className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-lg active:scale-95 text-sm">Confirm & Release Funds</button>
                                )}

                                {item.status === 'escrow_funded' && item.sellerId === 'user_123' && (
                                    <button onClick={() => handleShip(item)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"><ShippingIcon className="w-4 h-4" />Mark Shipped</button>
                                )}
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full py-20 text-center bg-slate-800/20 rounded-3xl border border-dashed border-slate-700">
                        <PackageIcon className="w-16 h-16 text-slate-800 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-500">No gear matches your search.</h3>
                        <p className="text-slate-400 text-sm mt-1">Try adjusting your filters or conditions.</p>
                        {(search || category !== 'All' || region !== 'All' || conditionFilter !== 'All') && (
                            <button 
                                onClick={() => { setSearch(''); setCategory('All'); setRegion('All'); setConditionFilter('All'); }}
                                className="mt-4 text-cyan-400 font-bold uppercase tracking-widest text-xs hover:text-cyan-300"
                            >
                                Reset All Filters
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Video Player Modal */}
            {viewingVideo && (
                <div className="fixed inset-0 bg-black/90 z-[200] flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setViewingVideo(null)}>
                    <div className="relative max-w-lg w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-700" onClick={e => e.stopPropagation()}>
                        <div className="absolute top-4 right-4 z-10">
                            <button onClick={() => setViewingVideo(null)} className="p-2 bg-black/50 text-white rounded-full"><XIcon /></button>
                        </div>
                        <video src={viewingVideo} autoPlay controls className="w-full h-auto aspect-video object-cover" />
                        <div className="p-6">
                            <div className="flex items-center gap-2 mb-2">
                                <VerifiedIcon className="w-5 h-5 text-emerald-400" />
                                <h3 className="text-lg font-bold text-white">Ghillie Verification Proof</h3>
                            </div>
                            <p className="text-xs text-slate-400">This clip serves as legal proof of the item's condition. Escrow funds are released only when buyer confirms the item matches this footage.</p>
                        </div>
                    </div>
                </div>
            )}

            {isAdding && (
                <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-xl z-[100] overflow-y-auto">
                    <div className="container mx-auto p-4 max-w-2xl py-10">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-black text-white tracking-tight">Post Gear</h2>
                            <button onClick={() => setIsAdding(false)} className="p-3 bg-slate-800 text-slate-400 hover:text-white rounded-full"><XIcon /></button>
                        </div>
                        <ListingForm 
                            onSave={(l) => { addListing(l); setIsAdding(false); }}
                            onCancel={() => setIsAdding(false)} 
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Marketplace;
