import { Client, WebsocketManager } from '../websocket.manager';
import { MessageType } from 'shared';
import { WebSocket } from 'ws';

export function handleLogin(
  websocketManager: WebsocketManager,
  ws: WebSocket,
  login: string,
  payload: Record<string, string>
) {
  const clientToRegister: Client = { login, ws };
  if (payload.password === 'correctPassword') {
    if (websocketManager.isAlreadyRegistered(login)) {
      websocketManager.sendTo({
        login,
        type: MessageType.LOGIN,
        code: 401,
        payload: {
          message: 'Already connected',
        },
      });
    } else {
      websocketManager.register(login, clientToRegister);
      websocketManager.sendTo({
        login,
        type: MessageType.LOGIN,
        code: 200,
        payload: {
          message: 'Login success !!!',
        },
      });
    }
  } else {
    websocketManager.sendTo({
      login,
      type: MessageType.LOGIN,
      code: 403,
      payload: {
        message: 'Bad password',
      },
    });
  }
}
