import * as admin from 'firebase-admin';
import serviceAccount from './service_account.json';

const firebaseConfig: admin.AppOptions = {
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
};

admin.initializeApp(firebaseConfig);

export const db = admin.firestore();;
export default admin;
