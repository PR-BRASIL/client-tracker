export interface Event {
  handle: (path: string) => Promise<void>;
}
