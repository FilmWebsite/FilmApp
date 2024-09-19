import { initializeApp, getApps, getApp, cert, App } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import serviceKey from './service-key.json' assert { type: 'json' };

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    //   @ts-ignore
    credential: cert(serviceKey),
    storageBucket: 'film-ce235.appspot.com', // Ensure you add the correct bucket
  });
} else {
  app = getApp();
}

const adminDB = getFirestore(app);
const adminStorage = getStorage(app).bucket(); // Initialize the storage bucket

export { app as adminApp, adminDB, adminStorage };
