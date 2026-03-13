import {useState, useEffect} from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

export const useUser = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    await firebaseUser.getIdToken();
                    setUser(firebaseUser);
                } catch {
                    // Token is invalid or revoked — sign out to clear the stale session
                    await signOut(auth);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    return { user, loading };
}
