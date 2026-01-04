
import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getFirestore, doc, setDoc, collection, query, getDocs, Firestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, type Auth, type User } from "firebase/auth";
import type { Catch } from "../types";

let app: FirebaseApp | null = null;
export let db: Firestore | null = null;
export let auth: Auth | null = null;

export const initFirebase = (configString: string) => {
    try {
        const config = JSON.parse(configString);
        if (getApps().length === 0) {
            app = initializeApp(config);
            db = getFirestore(app);
            auth = getAuth(app);
            return { db, auth };
        } else {
            const existingApp = getApps()[0];
            db = getFirestore(existingApp);
            auth = getAuth(existingApp);
            return { db, auth };
        }
    } catch (e) {
        console.error("Firebase Init Error:", e);
        return null;
    }
};

export const syncCatchToCloud = async (userId: string, catchData: Catch) => {
    if (!db) return;
    try {
        const docRef = doc(db, "users", userId, "catches", catchData.id);
        await setDoc(docRef, { ...catchData, syncStatus: 'synced' });
    } catch (e) {
        console.error("Cloud Sync Error:", e);
    }
};

export const fetchCloudCatches = async (userId: string): Promise<Catch[]> => {
    if (!db) return [];
    try {
        const q = query(collection(db, "users", userId, "catches"));
        const querySnapshot = await getDocs(q);
        const results: Catch[] = [];
        querySnapshot.forEach((doc) => {
            results.push(doc.data() as Catch);
        });
        return results;
    } catch (e) {
        console.error("Fetch Cloud Catches Error:", e);
        return [];
    }
};

export const loginWithGoogle = async (): Promise<User | null> => {
    if (!auth) return null;
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        return result.user;
    } catch (e) {
        console.error("Login Error:", e);
        return null;
    }
};
