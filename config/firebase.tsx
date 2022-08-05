import { initializeApp } from "firebase/app";
import { FIREBASE_CONFIG } from "./firebaseConfig"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithCustomToken
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  DocumentData,
  DocumentReference,
  Firestore
} from "firebase/firestore";


const firebaseapp = initializeApp(FIREBASE_CONFIG);

export const auth = getAuth();

export default firebaseapp;

export const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
});

export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db:Firestore = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: any, additionalInformation = {}) : Promise<DocumentReference<DocumentData>> => {
    const userDocRef = doc(db, "users", userAuth.uid);
    const userSnapshot = await getDoc(userDocRef);
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation,
            });
        } catch (error: any) {
            console.log(error.message);
        }
    }
    return userDocRef;
};

export const onAuthStateChangedListener = (callback: any) => onAuthStateChanged(auth, callback);

export const createAuthUserWithEmailAndPassword = async (email: string, password: string) :Promise<any> => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const signInWithEmail = (email: string, password: string) => {
    return new Promise(function (resolve, reject) {
        createUserWithEmailAndPassword(auth, email, password).then((userCredential: any) => {
            // Signed in
            const user = userCredential.user;
            localStorage.setItem("user", user);
            resolve(true);
        })
        .catch((error: any) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    });
};
