import firebaseConfig from './assets/firebase.config.json';
import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import * as admin from 'firebase-admin';

const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert({
    clientEmail: firebaseConfig.client_email,
    privateKey: firebaseConfig.private_key,
    projectId: firebaseConfig.project_id,
  }),
  databaseURL: firebaseConfig.database_url,
});

const firebaseDb = firebaseApp.database();

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState('auth');
  const sock = makeWASocket({
    auth: state,
    // logger: pin({ level: 'debug' }),
    // can provide additional config here
    printQRInTerminal: true,
  });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect =
        (lastDisconnect.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log(
        'connection closed due to ',
        lastDisconnect.error,
        ', reconnecting ',
        shouldReconnect,
      );
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('opened connection');
    }
  });
  sock.ev.on('messages.upsert', (m) => {
    console.log(JSON.stringify(m, undefined, 2));

    console.log('replying to', m.messages[0].key.remoteJid);
    await sock.sendMessage(m.messages[0].key.remoteJid!, {
      text: 'Hello there!',
    });
  });
}
// run in main file
connectToWhatsApp();
