import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyCwihRzGG7knsXJ3SdQuHV_2eYRP-TTrIA",
  authDomain: "test-fbcec.firebaseapp.com",
  projectId: "test-fbcec",
  storageBucket: "test-fbcec.appspot.com",
  messagingSenderId: "778933245862",
  appId: "1:778933245862:web:6268f4e0d5f6acaac92167",
  measurementId: "G-QYJQCG9D3H"
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);