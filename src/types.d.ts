export {};

declare global {
  interface Window {
    electronAPI?: {
      onActiveWindow: (cb: (payload: any) => void) => (() => void) | void;
    };
  }
}
