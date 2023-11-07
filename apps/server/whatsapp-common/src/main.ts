/* eslint-disable no-console */
// eslint-disable-next-line unused-imports/no-unused-imports
import { Boom } from '@hapi/boom';
import makeWASocket, { DisconnectReason } from '@whiskeysockets/baileys';
import _generalConfig from './assets/general.config.json';
import { useFireBaseRealTimeDatabaseStoreAuthState } from './firebaseRD.creds.store';
import pin from 'pino';

const ServerConfig = {
  whatsappLoggedIn: false,
  dbReadStarted: false,
};

console.log(ServerConfig);

async function connectToWhatsApp() {
  const { state, saveCreds } = await useFireBaseRealTimeDatabaseStoreAuthState(
    _generalConfig.storeCredCollectionName,
    _generalConfig.serverName,
  );
  // const { state, saveCreds } = await useFireStoreAuthState(
  //   _generalConfig.storeCredCollectionName,
  //   _generalConfig.serverName,
  // );
  const sock = makeWASocket({
    auth: state,
    logger: pin({ level: 'info' }),
    // logger: pin({ level: 'debug' }),
    // can provide additional config here
    printQRInTerminal: true,
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
    } else {
      console.log(connection);
    }
  });
  sock.ev.on('presence.update', (update) => {
    console.log(update.id, 'Is Online', update.presences);
  });
}
// run in main file
connectToWhatsApp();
