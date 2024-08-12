// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr_FE8CoCMSmTzfLZXNHDCbXg3WytRvh8",
  authDomain: "new2-54477.firebaseapp.com",
  projectId: "new2-54477",
  storageBucket: "new2-54477.appspot.com",
  messagingSenderId: "67301208783",
  appId: "1:67301208783:web:8ac774bf3403e14af7fdba",
  measurementId: "G-MX26YM2WBX",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Initialize Firebase Auth and Firestore
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Function for signing in with Google Popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Function for adding a collection and documents to Firestore
export const addCollectionAndDocument = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.name.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Transaction is successful!");
};

// Function for fetching staff and documents from Firestore
export const fetchStaffAndDocuments = async () => {
  const collectionRef = collection(db, "staff");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  const staffMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { name, ...items } = docSnapshot.data();
    acc[name.toLowerCase()] = items;
    return acc;
  }, {});

  return staffMap;
};

// Function for creating/updating a user document in Firestore
export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

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
    } catch (error) {
      console.log("Error in creating user document", error.message);
    }
  }

  return userDocRef;
};

// Function for creating a user with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Function for signing in a user with email and password
export const signinAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
