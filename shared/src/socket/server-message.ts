export interface ServerMessage<T> {
  type: string;
  payload: T;
}
