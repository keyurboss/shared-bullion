/* eslint-disable no-console */
// eslint-disable-next-line unused-imports/no-unused-imports
import { Boom } from '@hapi/boom';
import makeWASocket, {
  Browsers,
  DisconnectReason,
} from '@whiskeysockets/baileys';
import 'qrcode-terminal';

import { DataSnapshot } from '@firebase/database-types/index.d';
import { BehaviorSubject, Subject } from 'rxjs';
import _generalConfig from './assets/general.config.json';
import { firebaseDb } from './firebase.app';
import { useFireBaseRealTimeDatabaseStoreAuthState } from './firebaseRD.creds.store';

console.log('General Config', _generalConfig);

const ServerConfigBehavior = new BehaviorSubject({
  whatsappLoggedIn: false,
  dbReadStarted: false,
});

let counter = 0;
const messageSubject = new Subject<{ number: string; msg: string }>();
async function connectToWhatsApp() {
  const { state, saveCreds } = await useFireBaseRealTimeDatabaseStoreAuthState(
    _generalConfig.storeCredCollectionName,
    _generalConfig.serverName,
  );
  const sock = makeWASocket({
    auth: state,
    // logger: pin({ level: 'info' }),
    // logger: pin({ level: 'info' }),
    // logger: pin({ level: 'debug' }),
    // can provide additional config here
    printQRInTerminal: true,
    // shouldSyncHistoryMessage: () => false,
    browser: Browsers.ubuntu('Desktop'),
    syncFullHistory: false,
  });
  sock.ev.on('creds.update', saveCreds);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sock.ev.on('connection.update', (update: any) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      ServerConfigBehavior.value.whatsappLoggedIn = false;
      ServerConfigBehavior.next(ServerConfigBehavior.value);
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
      if (typeof a.msg.replaceAll === 'function') {
        a.msg = a.msg.replaceAll('@n@', '\n');
        a.msg = a.msg.replaceAll('\\\\', '\\');
        a.msg = a.msg.replaceAll('\\n', '\n');
      }
      console.log(a.msg);
      counter--;
      sock.sendMessage(`${a.number}@s.whatsapp.net`, {
        footer: 'Confidential',
        text: a.msg,
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
    if (a.exists()) {
      counter++;
      setTimeout(() => {
        messageSubject.next(a.val());
        ref.child(a.key ?? '').remove();
      }, counter * 600);
    }
  };
  ServerConfigBehavior.value.dbReadStarted = true;
  ServerConfigBehavior.next(ServerConfigBehavior.value);
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
