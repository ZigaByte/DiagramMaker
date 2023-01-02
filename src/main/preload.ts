import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';

export type MenuCommandUndo = 'menu-undo';
export type MenuCommandRedo = 'menu-redo';

export type MenuCommandConnect = 'menu-connect';
export type MenuCommandDelete = 'menu-delete';

export type Channels =
  | MenuCommandUndo
  | MenuCommandRedo
  | MenuCommandAddNode
  | MenuCommandConnect
  | MenuCommandDelete;

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    sendMessage(channel: Channels, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
});
