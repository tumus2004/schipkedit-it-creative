import '../styles/globals.css';
import '../styles/SolarSystem.css';
import '../styles/showcase.css';
import type { AppProps } from 'next/app';
import dotenv from 'dotenv';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  // credential: admin.credential.cert(serviceAccount),
  databaseUrl: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
