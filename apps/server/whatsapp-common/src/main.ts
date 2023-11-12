/* eslint-disable no-console */
// eslint-disable-next-line unused-imports/no-unused-imports
import 'qrcode-terminal';
import { Boom } from '@hapi/boom';
import makeWASocket, {
  Browsers,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import pin from 'pino';

import { DataSnapshot } from '@firebase/database-types/index.d';
import { BehaviorSubject, Subject } from 'rxjs';
import _generalConfig from './assets/general.config.json';
import { firebaseDb } from './firebase.app';
import { useFireBaseRealTimeDatabaseStoreAuthState } from './firebaseRD.creds.store';

// const ServerConfig = ;

const ServerConfigBehavior = new BehaviorSubject({
  whatsappLoggedIn: false,
  dbReadStarted: false,
});

const messageSubject = new Subject<{ number: string; message: string }>();
async function connectToWhatsApp() {
  const { state, saveCreds } = await useFireBaseRealTimeDatabaseStoreAuthState(
    _generalConfig.storeCredCollectionName,
    _generalConfig.serverName,
  );
  const sock = makeWASocket({
    auth: state,
    logger: pin({ level: 'info' }),
    // logger: pin({ level: 'debug' }),
    // can provide additional config here
    printQRInTerminal: true,
    // shouldSyncHistoryMessage: () => false,
    browser: Browsers.ubuntu('Desktop'),
    syncFullHistory: false,
  });
  sock.ev.on('creds.update', saveCreds);
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !==
        DisconnectReason.loggedOut;
      console.log(
        'connection closed due to ',
        lastDisconnect?.error,
        ', reconnecting ',
        shouldReconnect,
      );
      // reconnect if not logged out
      if (shouldReconnect) {
        connectToWhatsApp();
      }
    } else if (connection === 'open') {
      console.log('opened connection');
      ServerConfigBehavior.value.whatsappLoggedIn = true;
      ServerConfigBehavior.next(ServerConfigBehavior.value);
      if (!ServerConfigBehavior.value.dbReadStarted) {
        ReadMessagesFromFirebase();
      }
    }
  });
  messageSubject.subscribe((a) => {
    if (ServerConfigBehavior.value.whatsappLoggedIn) {
      if (typeof a.message.replaceAll === 'function') {
        a.message = a.message.replaceAll('@n@', '\n');
        a.message = a.message.replaceAll('\\n', '\n');
      }
      console.log(a.message);
      sock.sendMessage(`${a.number}@s.whatsapp.net`, {
        footer: 'Confidential',
        text: a.message,
      });
    }
  });
}

setInterval(() => {
  firebaseDb.ref(_generalConfig.statusPath).set({
    lastOnline: {
      '.sv': 'timestamp',
    },
    data: ServerConfigBehavior.value,
  });
}, 5000);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ReadMessagesFromFirebase() {
  const ref = firebaseDb.ref(_generalConfig.readPath);
  const CB: (a: DataSnapshot, b?: string | null) => void = (a) => {
    // if(a.exists()){}
    messageSubject.next(a.val());
    ref.child(a.key ?? '').remove();
  };
  ref.on('child_added', CB);
  const subscription = ServerConfigBehavior.subscribe(
    ({ whatsappLoggedIn }) => {
      if (!whatsappLoggedIn) {
        subscription.unsubscribe();
        ref.off('child_added', CB);
        ServerConfigBehavior.value.dbReadStarted = false;
        ServerConfigBehavior.next(ServerConfigBehavior.value);
        // Remove Firebase Reading
      }
    },
  );
}
connectToWhatsApp();
