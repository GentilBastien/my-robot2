import { Injectable } from '@angular/core';
import { ClientMessage, ClientMessageType, PathCostCoordinate, ServerMessage, ServerMessageType } from 'shared';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface A {
  gameId: string;
  proposalId: string;
  loginDeclined: string;
  possiblePaths: PathCostCoordinate[];
}

export enum WSState {}

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private readonly websocketSubject = new BehaviorSubject<WebSocket | null>(null);
  public readonly websocketReady$ = new Subject<boolean>();

  public get websocket(): WebSocket | null {
    return this.websocketSubject.getValue();
  }

  private readonly onSendSessionSubject = new Subject<ServerMessage<{ gameId: string }>>();
  private readonly onProposalReceivedSubject = new Subject<ServerMessage<{ proposalId: string }>>();
  private readonly onProposalAcceptedSubject = new Subject<ServerMessage<{ gameId: string }>>();
  private readonly onProposalDeclinedSubject = new Subject<ServerMessage<{ loginDeclined: string }>>();
  private readonly onProposalTimedOutSubject = new Subject<ServerMessage<object>>();
  private readonly onGameFinishedSubject = new Subject<ServerMessage<object>>();
  private readonly onPossiblePathsSubject = new Subject<ServerMessage<{ possiblePaths: PathCostCoordinate[] }>>();

  public readonly sendSession$ = this.onSendSessionSubject.asObservable();
  public readonly proposalReceived$ = this.onProposalReceivedSubject.asObservable();
  public readonly proposalAccepted$ = this.onProposalAcceptedSubject.asObservable();
  public readonly proposalDeclined$ = this.onProposalDeclinedSubject.asObservable();
  public readonly proposalTimedOut$ = this.onProposalTimedOutSubject.asObservable();
  public readonly gameFinished$ = this.onGameFinishedSubject.asObservable();
  public readonly possiblePaths$ = this.onPossiblePathsSubject.asObservable();

  public createWebsocket(login: string): Observable<boolean> {
    const ws = new WebSocket(`ws://localhost:8080/api/v1/game?login=${login}`);
    ws.onopen = () => this.wsOnOpen(ws);
    ws.onmessage = messageEvent => this.wsOnMessage(messageEvent);
    ws.onclose = () => this.wsOnClose();
    ws.onerror = () => this.wsOnError();
    return this.websocketReady$;
  }

  public destroyWebsocket(): void {
    this.websocket?.close();
    this.websocketSubject.next(null);
    console.log('Websocket DESTROYED');
  }

  private wsOnOpen(ws: WebSocket): void {
    console.log('Websocket OPENED');
    this.websocketSubject.next(ws);
    this.websocketReady$.next(true);
  }

  private wsOnClose(): void {
    console.log('Websocket CLOSED');
    this.websocketSubject.next(null);
    this.websocketReady$.next(false);
  }

  private wsOnError(): void {
    console.log('Websocket ERROR');
    this.websocketSubject.next(null);
  }

  private wsOnMessage(messageEvent: MessageEvent): void {
    const message: ServerMessage<A> = JSON.parse(messageEvent.data);
    console.log('Websocket RECEIVE', message);
    switch (message.type) {
      case ServerMessageType.SEND_SESSION:
        return this.onSendSessionSubject.next(message);
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

  public sendToServer<T extends Record<string, string | undefined>>(
    login: string,
    type: ClientMessageType,
    payload?: T
  ): void {
    const clientMessage: ClientMessage<T> = { login, type, payload };
    console.log('Websocket SEND ', clientMessage);
    this.websocket?.send(JSON.stringify(clientMessage));
  }
}
