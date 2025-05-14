import * as admin from 'firebase-admin';
import serviceAccount from './service_account.json';

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
};

admin.initializeApp(firebaseConfig);

const db = admin.firestore();

// Connect to emulator if needed
if (process.env.FUNCTIONS_EMULATOR === "true") {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:5003';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:5002';
}

export { db };
export default admin;
