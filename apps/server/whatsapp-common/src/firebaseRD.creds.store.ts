/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthenticationCreds,
  AuthenticationState,
  BufferJSON,
  initAuthCreds,
  proto,
} from '@whiskeysockets/baileys';
import { firebaseDb } from './firebase.app';
function processFileName(name: string): string {
  try {
    name = name.replaceAll('.', '@');
    return name;
  } catch (error) {
    console.log("File Name Is",name)
    console.error(error)
    throw error
  }
}
export const useFireBaseRealTimeDatabaseStoreAuthState = async (
  collectionName: string,
  serverName: string,
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> => {
  const collection = firebaseDb.ref(collectionName).child(serverName);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const writeData = async (data: any, file: string) => {
    data = JSON.stringify(data, BufferJSON.replacer);
    collection.child(processFileName(file)).set(data);
    return;
  };

  const readData = async (file: string) => {
    try {
      console.log('Reading ', file);
      const data = await collection.child(processFileName(file)).get();
      if (!data.exists()) {
        return null;
      }
      const cc = data.val();
      let finalRead = JSON.parse(cc, BufferJSON.reviver);
      if (typeof finalRead === 'string') {
        finalRead = JSON.parse(finalRead, BufferJSON.reviver);
      }
      return finalRead;
    } catch (error) {
      return null;
    }
  };

  const removeData = async (file: string) => {
    try {
      await collection.child(file).set(null);
    } catch {
      //
    }
  };

  const creds: AuthenticationCreds =
    (await readData('creds')) || initAuthCreds();

  return {
    state: {
      creds,
      keys: {
        get: async (type: any, ids: string[]) => {
          const data: { [_: string]: any } = {};
          await Promise.all(
            ids.map(async (id) => {
              let value = await readData(`${type}-${id}`);
              if (type === 'app-state-sync-key' && value) {
                value = proto.Message.AppStateSyncKeyData.fromObject(value);
              }

              data[id] = value;
            }),
          );

          return data;
        },
        set: async (data: any) => {
          const tasks: Promise<void>[] = [];
          for (const category in data) {
            for (const id in data[category]) {
              const value = data[category][id];
              const file = `${category}-${id}`;
              tasks.push(value ? writeData(value, file) : removeData(file));
            }
          }

          await Promise.all(tasks);
        },
      },
    },
    saveCreds: () => {
      return writeData(creds, 'creds');
    },
  };
};
