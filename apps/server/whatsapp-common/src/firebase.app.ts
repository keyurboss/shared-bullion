import firebaseConfig from './assets/firebase.config.json';
import * as admin from 'firebase-admin';
export const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: firebaseConfig.client_email,
    privateKey: firebaseConfig.private_key,
    projectId: firebaseConfig.project_id,
  }),
  databaseURL: firebaseConfig.database_url,
});

export const firebaseDb = firebaseApp.database();
export const fireStore = firebaseApp.firestore();
