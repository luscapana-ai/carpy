
import { initializeApp, getApps } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import type { Catch, UserProfile } from "../types";

let db: any = null;
let auth: any = null;

export const initFirebase = (configString: string) => {
    try {
        const config = JSON.parse(configString);
        if (getApps().length === 0) {
            const app = initializeApp(config);
            db = getFirestore(app);
            auth = getAuth(app);
            return { db, auth };
        }
    } catch (e) {
        console.error("Firebase Init Error:", e);
        return null;
    }
};

export const syncCatchToCloud = async (userId: string, catchData: Catch) => {
    if (!db) return;
    const docRef = doc(db, "users", userId, "catches", catchData.id);
    await setDoc(docRef, catchData);
};

export const fetchCloudCatches = async (userId: string): Promise<Catch[]> => {
    if (!db) return [];
    const q = query(collection(db, "users", userId, "catches"));
    const querySnapshot = await getDocs(q);
    const results: Catch[] = [];
    querySnapshot.forEach((doc) => {
        results.push(doc.data() as Catch);
    });
    return results;
};

export const loginWithGoogle = async () => {
    if (!auth) return null;
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
};
