import { ClientMessageType } from './client-message.type';
import { Coordinate } from '../../types/coordinate';

export interface ClientMessage<T extends Record<string, string | Coordinate[] | undefined>> {
  login: string;
  type: ClientMessageType;
  payload?: T;
}
