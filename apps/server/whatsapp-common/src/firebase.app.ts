import { existsSync, readFileSync } from 'fs';
import firebaseConfig from './assets/firebase.config.json';
import * as admin from 'firebase-admin';
import { join } from 'path';
try {
  const generalConfigPath = join(__dirname, 'firebase.config.json');
  if (existsSync(generalConfigPath)) {
    const d = JSON.parse(readFileSync(generalConfigPath).toString());
    if (typeof d === 'object') {
      Object.assign(firebaseConfig, d);
    }
  }
} catch (error) {
  //
}
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
