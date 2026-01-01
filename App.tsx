
import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import type { Catch, Gear, View, Listing, UserProfile } from './types';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CatchLogForm from './components/CatchLogForm';
import CatchList from './components/CatchList';
import GearManager from './components/GearManager';
import AIAssistant from './components/AIAssistant';
import Marketplace from './components/Marketplace';
import ProfileManager from './components/ProfileManager';
import { initFirebase, syncCatchToCloud, fetchCloudCatches } from './services/firebaseService';

const App: React.FC = () => {
    const [activeView, setActiveView] = useState<View>('dashboard');
    const [catches, setCatches] = useLocalStorage<Catch[]>('carpy_catches', []);
    const [userProfile, setUserProfile] = useLocalStorage<UserProfile>('carpy_profile', {
        name: 'Specimen Angler',
        bio: 'Dedicated carper chasing big commons and mirrors across the UK.',
        preferences: {
            rigs: ['Ronnie Rig', 'Chod Rig'],
            baits: ['Boilie', 'Pop-up']
        }
    });
    
    // Cloud Sync Logic
    useEffect(() => {
        if (userProfile.firebaseConfig) {
            const fb = initFirebase(userProfile.firebaseConfig);
            if (fb) {
                console.log("Ghillie Cloud Synchronized");
                // Optional: Trigger full sync here
            }
        }
    }, [userProfile.firebaseConfig]);

    const [listings, setListings] = useLocalStorage<Listing[]>('carpy_listings', [
        {
            id: 'demo_1',
            title: 'Shimano Ultegra 14000 XTD',
            description: 'Superb condition, spare spool included. Spooled with 15lb mono.',
            price: 85,
            postagePrice: 10.00,
            insuranceFee: 4.50,
            shippingMethod: 'ParcelForce 24',
            isInsured: true,
            isSplitShipping: true,
            category: 'Reels',
            condition: 'Like New',
            location: 'South East',
            sellerId: 'demo_user',
            date: new Date().toISOString(),
            status: 'available'
        }
    ]);
    
    const [gear, setGear] = useLocalStorage<Gear>('carpy_gear', { 
        baits: ['Boilie', 'Corn', 'Wafter', 'Pellet', 'Maggot', 'Bread', 'Hemp', 'Tigernut', 'Pop-up', 'Artificial Corn', 'Glugs'], 
        rigs: ['Hair Rig', 'Ronnie Rig', 'Chod Rig', 'German Rig', 'Combi Rig'],
        coreTackle: ['Rods', 'Reels', 'Lines', 'Braid', 'Flourocarbon', 'Spod rod', 'Marker rod', 'Leads', 'Hooks', 'Swivels', 'Rig rings', 'Silicone', 'Tubing', 'Tail rubbers', 'Beads', 'Hook beads'],
        banksideSetup: ['Pod', 'Bite alarms', 'Bobbins', 'Butt holders', 'Banksticks', 'Bivvy', 'Bedchair', 'Chair', 'Bivvy table', 'Shelter', 'Sleeping bag', 'Pillow'],
        toolsAndAccessories: ['Battery pack', 'Bait drill', 'Baiting needle', 'Binoculars', 'Camera', 'Distance sticks', 'Finger guard', 'First aid kit', 'Fish Spy Drone', 'Head torch', 'Knot puller', 'Lighter', 'Marker float', 'Pliers', 'Polaroid glasses', 'Scissors', 'Torch'],
        fishCare: ['Unhooking mat', 'Landing net', 'Weigh sling', 'Retainer', 'Carp care kit'],
        baiting: ['Throwing stick', 'Catapult', 'Spod', 'Spomb', 'PVA bags', 'PVA string', 'PVA mesh', 'Bait boat', 'Bait floss', 'Boilie chopper', 'Buckets', 'Scoop'],
        luggageAndTransport: ['Backpack', 'Carryall', 'Rod bag', 'Rig wallet', 'Tackle bag/box', 'Luggage', 'Barrow', 'Trolley']
    });
    const [editingCatch, setEditingCatch] = useState<Catch | null>(null);

    const addCatch = async (newCatch: Catch) => {
        const updatedCatches = editingCatch 
            ? catches.map(c => c.id === newCatch.id ? newCatch : c)
            : [newCatch, ...catches];
        
        setCatches(updatedCatches);
        setEditingCatch(null);
        setActiveView('list');

        // Background Cloud Sync if config exists
        if (userProfile.firebaseConfig) {
            await syncCatchToCloud("user_123", newCatch); 
        }
    };

    const addListing = (newListing: Listing) => {
        setListings([newListing, ...listings]);
    };

    const updateListing = (updatedListing: Listing) => {
        setListings(listings.map(l => l.id === updatedListing.id ? updatedListing : l));
    };

    const deleteCatch = useCallback((id: string) => {
        if (window.confirm('Are you sure you want to delete this catch?')) {
            setCatches(catches.filter(c => c.id !== id));
        }
    }, [catches, setCatches]);

    const handleEdit = (catchItem: Catch) => {
        setEditingCatch(catchItem);
        setActiveView('log');
    };

    const handleCancelEdit = () => {
        setEditingCatch(null);
        setActiveView('list');
    }

    const renderView = () => {
        switch (activeView) {
            case 'dashboard':
                return <Dashboard catches={catches} />;
            case 'log':
                return <CatchLogForm addCatch={addCatch} gear={gear} existingCatch={editingCatch} onCancel={handleCancelEdit} />;
            case 'list':
                return <CatchList catches={catches} onDelete={deleteCatch} onEdit={handleEdit} />;
            case 'gear':
                return <GearManager gear={gear} setGear={setGear} />;
            case 'ai':
                return <AIAssistant />;
            case 'marketplace':
                return <Marketplace listings={listings} addListing={addListing} updateListing={updateListing} />;
            case 'profile':
                return <ProfileManager profile={userProfile} setProfile={setUserProfile} catches={catches} />;
            default:
                return <Dashboard catches={catches} />;
        }
    };

    return (
        <Layout activeView={activeView} setActiveView={setActiveView} setEditingCatch={setEditingCatch}>
            {renderView()}
        </Layout>
    );
};

export default App;
