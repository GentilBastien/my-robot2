import { Injectable } from '@angular/core';
import { ClientMessageType, PathCostCoordinate, ServerMessage, ServerMessageType } from 'shared';
import { Subject } from 'rxjs';

export interface A {
  gameId: string;
  proposalId: string;
  loginDeclined: string;
  possiblePaths: PathCostCoordinate[];
}

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private websocket: WebSocket | null = null;

  private readonly onLoggedInSubject = new Subject<ServerMessage<{ gameId: string }>>();
  private readonly onProposalReceivedSubject = new Subject<ServerMessage<{ proposalId: string }>>();
  private readonly onProposalAcceptedSubject = new Subject<ServerMessage<{ gameId: string }>>();
  private readonly onProposalDeclinedSubject = new Subject<ServerMessage<{ loginDeclined: string }>>();
  private readonly onProposalTimedOutSubject = new Subject<ServerMessage<object>>();
  private readonly onGameFinishedSubject = new Subject<ServerMessage<object>>();
  private readonly onPossiblePathsSubject = new Subject<ServerMessage<{ possiblePaths: PathCostCoordinate[] }>>();

  public readonly loggedIn$ = this.onLoggedInSubject.asObservable();
  public readonly proposalReceived$ = this.onProposalReceivedSubject.asObservable();
  public readonly proposalAccepted$ = this.onProposalAcceptedSubject.asObservable();
  public readonly proposalDeclined$ = this.onProposalDeclinedSubject.asObservable();
  public readonly proposalTimedOut$ = this.onProposalTimedOutSubject.asObservable();
  public readonly gameFinished$ = this.onGameFinishedSubject.asObservable();
  public readonly possiblePaths$ = this.onPossiblePathsSubject.asObservable();

  public createWebsocket(login: string): void {
    this.websocket = new WebSocket(`ws://localhost:8080/api/v1/game?login=${login}`);
    this.websocket.onopen = () => this.wsOnOpen();
    this.websocket.onmessage = messageEvent => this.wsOnMessage(messageEvent);
    this.websocket.onclose = () => this.destroyWebsocket();
  }

  public destroyWebsocket(): void {
    this.websocket = null;
    console.log('Websocket onclose');
  }

  private wsOnOpen(): void {
    console.log('Websocket onopen');
  }

  private wsOnMessage(messageEvent: MessageEvent): void {
    console.log('Websocket onmessage', messageEvent);
    const message: ServerMessage<A> = JSON.parse(messageEvent.data);
    switch (message.type) {
      case ServerMessageType.LOGGED_IN:
        return this.onLoggedInSubject.next(message);
      case ServerMessageType.SEND_PROPOSAL:
        return this.onProposalReceivedSubject.next(message);
      case ServerMessageType.PROPOSAL_ACCEPTED:
        return this.onProposalAcceptedSubject.next(message);
      case ServerMessageType.PROPOSAL_DECLINED:
        return this.onProposalDeclinedSubject.next(message);
      case ServerMessageType.PROPOSAL_TIMED_OUT:
        return this.onProposalTimedOutSubject.next(message);
      case ServerMessageType.POSSIBLE_PATHS:
        return this.onPossiblePathsSubject.next(message);
      case ServerMessageType.GAME_FINISHED:
        return this.onGameFinishedSubject.next(message);
    }
  }

  public sendToServer(login: string, type: ClientMessageType, payload?: object): void {
    const a = { login, type, payload };
    console.log('Websocket send ', a);
    this.websocket?.send(JSON.stringify(a));
  }
}
