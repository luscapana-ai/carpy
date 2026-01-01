
export interface Catch {
  id: string;
  date: string;
  species: string;
  weight: {
    lbs: number;
    oz: number;
  };
  length?: number;
  bait: string;
  rig?: string;
  photo?: string;
  notes?: string;
  location: string;
  weather?: {
    temp: number;
    condition: string;
    windSpeed?: number;
    windDirection?: string;
  };
  river?: {
    level: string; // Steady, Rising, Falling, Flooded
    flow: string;  // Slow, Moderate, Fast, Torrential
    clarity: string; // Clear, Tap-Water, Murky, Colored
  };
  syncStatus?: 'local' | 'synced' | 'pending';
}

export interface Gear {
  baits: string[];
  rigs: string[];
  coreTackle: string[];
  banksideSetup: string[];
  toolsAndAccessories: string[];
  fishCare: string[];
  baiting: string[];
  luggageAndTransport: string[];
}

export interface UserProfile {
  name: string;
  bio: string;
  avatar?: string;
  location?: string;
  preferences: {
    rigs: string[];
    baits: string[];
  };
  firebaseConfig?: string;
}

export interface Listing {
    id: string;
    title: string;
    description: string;
    price: number;
    postagePrice: number;
    insuranceFee: number;
    shippingMethod: string;
    category: string;
    condition: 'New' | 'Like New' | 'Good' | 'Used';
    location: string; // UK Region
    photo?: string;
    verificationVideo?: string; // Base64 or Blob URL for verification
    sellerId: string;
    buyerId?: string;
    date: string;
    status: 'available' | 'escrow_funded' | 'shipped' | 'released' | 'disputed';
    disputeReason?: string;
    isInsured: boolean;
    isSplitShipping: boolean; // New: Option to split costs 50/50
}

export type View = 'dashboard' | 'log' | 'list' | 'gear' | 'ai' | 'marketplace' | 'profile';
