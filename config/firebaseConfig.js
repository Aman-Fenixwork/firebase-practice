export const FIREBASE_CONFIG = {
  // apiKey: "AIzaSyBgbvcJbpOKovjHIHZ7SqqUdhX030T3cSI",

  // authDomain: "fir-practice-257ae.firebaseapp.com",

  // databaseURL: "https://fir-practice-257ae-default-rtdb.firebaseio.com",

  // projectId: "fir-practice-257ae",

  // storageBucket: "fir-practice-257ae.appspot.com",

  // messagingSenderId: "578280036524",

  // appId: "1:578280036524:web:f2aa8405c20504b54d2709",

  // measurementId: "G-GCDPPLXQGF"

  apiKey:  `${process.env.NEXT_PUBLIC_FIREBASE_apiKey}`,
  authDomain:  `${process.env.NEXT_PUBLIC_FIREBASE_authDomain}`,
  projectId:  `${process.env.NEXT_PUBLIC_FIREBASE_projectId}`,
  storageBucket:  `${process.env.NEXT_PUBLIC_FIREBASE_storageBucket}`,
  messagingSenderId:  `${process.env.NEXT_PUBLIC_FIREBASE_messagingSenderId}`,
  appId: `${process.env.NEXT_PUBLIC_FIREBASE_appId}`,
  measurementId: `${process.env.NEXT_PUBLIC_FIREBASE_measurementId}`
  };