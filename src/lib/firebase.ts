import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAwSkQ668QYHtEFigEkA4Gfq2tDzYUybMw",
  authDomain: "eyfamily-1521e.firebaseapp.com",
  projectId: "eyfamily-1521e",
  storageBucket: "eyfamily-1521e.appspot.com",
  messagingSenderId: "325798641220",
  appId: "1:325798641220:web:332a221df45f1cc439c611"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Create temporary admin account if it doesn't exist
const setupTempAdmin = async () => {
  try {
    await createUserWithEmailAndPassword(auth, 'admin@example.com', 'admin123');
    console.log('Temporary admin account created');
  } catch (error: any) {
    if (error.code === 'auth/email-already-in-use') {
      console.log('Admin account already exists');
    } else {
      console.error('Error creating admin account:', error);
    }
  }
};

setupTempAdmin();

export { auth, db };