import { WebSocket, WebSocketServer } from 'ws';
import { Client, ClientRegistry } from './client-registry';
import { ClientLoginPayload, ClientMessage, MessageType } from 'shared';
import { Server } from 'node:https';

const clientRegistry = new ClientRegistry();

export function createWebsocketServer(server: Server) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    let login: string | null = null;

    ws.on('message', data => {
      const parsedData: ClientMessage<unknown> = JSON.parse(data.toString());

      switch (parsedData.type) {
        case MessageType.LOGIN: {
          const clientMessageLogin: ClientMessage<ClientLoginPayload> = parsedData as ClientMessage<ClientLoginPayload>;
          login = clientMessageLogin.login;
          const clientToRegister: Client = {
            login,
            ws,
          };
          if (clientRegistry.isAlreadyRegistered(login)) {
            throw 'Client already registered';
          } else {
            clientRegistry.register(login, clientToRegister);
            clientRegistry.sendTo(login, 'login success !!!');
          }
          break;
        }
        default:
          throw 'Unknown type';
      }
    });

    ws.on('close', () => {
      if (login) {
        clientRegistry.unregister(login);
      } else {
        throw 'Server Error, cannot unregister because login is undefined';
      }
    });
  });
  return clientRegistry;
}
