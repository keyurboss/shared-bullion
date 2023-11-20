/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AuthenticationCreds,
  AuthenticationState,
  BufferJSON,
  initAuthCreds,
  proto,
} from '@whiskeysockets/baileys';
import { fireStore } from './firebase.app';
export const useFireStoreAuthState = async (
  collectionName: string,
  serverName: string,
): Promise<{ state: AuthenticationState; saveCreds: () => Promise<void> }> => {
  const collection = fireStore.collection(collectionName);
  //   collection.doc(serverName).set({})
  setTimeout(() => {
    writeData({ aasdsad: 'ASDASDasd' }, 'kkkkk.sasdasd');
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const writeData = async (data: any, file: string) => {
    data = JSON.stringify(data, BufferJSON.replacer);
    collection.doc(serverName).update(
      {
        [file]: data,
      },
      {
        // exists:true
        // merge:true
      },
    );
    return;
  };

  const readData = async (file: string) => {
    try {
      console.log('Reading ', file);
      const data = await collection.doc(serverName).get();
      if (!data.exists) {
        return null;
      }
      const cc = data.data();
      let finalRead = cc?.[file]
        ? JSON.parse(cc?.[file], BufferJSON.reviver)
        : null;
      if (typeof finalRead === 'string') {
        finalRead = JSON.parse(finalRead, BufferJSON.reviver);
      }
      // debugger
      // console.log('final REad ', finalRead);
      // console.log(typeof finalRead)
      return finalRead;
    } catch (error) {
      return null;
    }
  };

  const removeData = async (file: string) => {
    try {
      await collection.doc(serverName).update(
        {
          [file]: null,
        },
        {
          exists: true,
        },
      );
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
