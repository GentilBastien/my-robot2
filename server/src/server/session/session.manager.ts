import WebSocket from 'ws';
import { ActionData, Coordinate, ServerMessage, ServerMessageType, SessionStateTypeEnum } from 'shared';
import { GameProposal } from '@server/proposal/game-proposal';
import { ProposalManager } from '@server/proposal/proposal-manager';
import { Session } from '@server/session/session';
import { QueueManager } from '@server/queue/queue.manager';
import { GameManager } from '@server/game/game.manager';
import { GameSession } from '@server/game/game-session';

export class SessionManager {
  private readonly proposalManager: ProposalManager;
  private readonly gameManager: GameManager;
  private readonly queueManager: QueueManager;
  private readonly sessions: Record<string, Session> = {};

  constructor() {
    this.proposalManager = new ProposalManager(this);
    this.gameManager = new GameManager();
    this.queueManager = new QueueManager();
  }

  public register(login: string, webSocket: WebSocket): void {
    const previouslyRegistered = this.gameManager.hasGameSession(login);
    if (previouslyRegistered) {
      const previousSession = this.gameManager.hasSessionLinkedToAGame(login);
      this.sessions[login] = { ...previousSession, webSocket };
    } else {
      this.sessions[login] = { login, webSocket, state: SessionStateTypeEnum.ONLINE };
    }
    /**
     * out of scope of register function, so websocket can send the message
     */
    ((): void => this.sendSession(this.sessions[login]))();

    console.log(Object.keys(this.sessions));
  }

  public unregister(ws: WebSocket): void {
    for (const login in this.sessions) {
      const session = this.sessions[login];
      if (session.webSocket === ws) {
        if (session.state === SessionStateTypeEnum.IN_QUEUE) {
          this.queueManager.remove(session.login);
        }
        if (session.state === SessionStateTypeEnum.PROPOSAL_ASKING) {
          this.proposalManager.declineProposal(session, session.proposalId!);
        }
        if (session.state === SessionStateTypeEnum.IN_GAME) {
          this.leaveGame(session);
        }
        delete this.sessions[login];

        console.log(Object.keys(this.sessions));
        return;
      }
    }
    throw 'Client not found';
  }

  public isAlreadyRegistered(login: string): boolean {
    return this.sessions[login] !== undefined;
  }

  public matchmakingFromQueue(): string[] | null {
    return this.queueManager.removeAllMatchedAndGet();
  }

  public receiveJoinQueue(login: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.ONLINE, 'Must be online to enter queue');
    if (session.gameId !== undefined) {
      throw 'Cannot join queue if a game must be re-joined first';
    }
    this.queueManager.add(login);
    session.state = SessionStateTypeEnum.IN_QUEUE;
  }

  public receiveLeaveQueue(login: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.IN_QUEUE, 'Must be in queue to leave queue');
    this.queueManager.remove(login);
    session.state = SessionStateTypeEnum.ONLINE;
  }

  public receiveAcceptProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.PROPOSAL_ASKING, 'Must have a proposal to accept it');
    session.state = SessionStateTypeEnum.PROPOSAL_ANSWERED;
    this.proposalManager.acceptProposal(session, proposalId);
  }

  public receiveDeclineProposal(login: string, proposalId: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.PROPOSAL_ASKING, 'Must have a proposal to decline it');
    session.state = SessionStateTypeEnum.PROPOSAL_ANSWERED;
    this.proposalManager.declineProposal(session, proposalId);
  }

  public receiveLeaveGame(login: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.IN_GAME, 'Must be in a game to leave game');
    this.leaveGame(session);
  }

  public receiveRejoinGame(login: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.ONLINE, 'Must online to rejoin a game previously left');
    if (session.gameId === undefined) {
      throw 'Must have a gameId to rejoin a game';
    }
    const gameSession = this.gameManager.getGameSession(login);
    if (gameSession) {
      session.state = SessionStateTypeEnum.IN_GAME;
      this.gameManager.updateGameSession(gameSession.id, session);
    } else {
      throw 'no gameSession found to rejoin';
    }
  }

  public receiveTurnEnd(login: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.IN_GAME, 'Must be in a game to endTurn');
    this.gameManager.receiveTurnEnd(session);
  }

  public receivePathGameEvent(login: string, path: Coordinate[]): void {
    const session = this.sessions[login];
    this.gameManager.receivePath(session, path);
  }

  public receiveAction(login: string, actionData: ActionData): void {
    const session = this.sessions[login];
    this.gameManager.receiveAction(session, actionData);
  }

  public sendSession(session: Session): void {
    this.sendToSession(session, { type: ServerMessageType.LOGGED_IN, payload: { gameId: session.gameId } });
  }

  public sendGameProposal(gameProposal: GameProposal): void {
    this.queueManager.removeAll(gameProposal.logins);
    this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.state = SessionStateTypeEnum.PROPOSAL_ASKING;
        session.proposalId = gameProposal.id;
      },
      { type: ServerMessageType.SEND_PROPOSAL, payload: { proposalId: gameProposal.id } }
    );
  }

  public sendGameProposalAccepted(gameProposal: GameProposal): void {
    const sessions = this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.state = SessionStateTypeEnum.IN_GAME;
        session.proposalId = undefined;
        session.gameId = gameProposal.id;
      },
      {
        type: ServerMessageType.PROPOSAL_ACCEPTED,
        payload: { gameId: gameProposal.id },
      }
    );
    this.gameManager.createGame(gameProposal, sessions);
  }

  public sendGameProposalDeclined(gameProposal: GameProposal): void {
    this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.proposalId = undefined;
        if (gameProposal.loginDeclined === session.login) {
          this.leaveQueue(session);
        } else {
          this.joinQueue(session);
        }
      },
      {
        type: ServerMessageType.PROPOSAL_DECLINED,
        payload: gameProposal.loginDeclined,
      }
    );
  }

  public sendGameProposalTimedOut(gameProposal: GameProposal): void {
    this.updateSessionsAndSend(
      gameProposal.logins,
      session => {
        session.proposalId = undefined;
        if (gameProposal.accepted.has(session.login)) {
          this.joinQueue(session);
        } else {
          this.leaveQueue(session);
        }
      },
      {
        type: ServerMessageType.PROPOSAL_TIMED_OUT,
      }
    );
  }

  public sendGameFinished(gameSession: GameSession): void {
    this.updateSessionsAndSend(
      gameSession.sessions.map(s => s.login),
      session => {
        session.state = SessionStateTypeEnum.ONLINE;
        session.proposalId = undefined;
        session.gameId = undefined;
      },
      {
        type: ServerMessageType.GAME_FINISHED,
      }
    );
  }

  public receiveAndSendPossiblePaths(login: string): void {
    const session = this.sessions[login];
    this.checkSessionState(session, SessionStateTypeEnum.IN_GAME, 'Must be in a game to get possible paths');
    const possiblePaths = this.gameManager.getPossiblePaths(session);
    this.sendToSession(session, { type: ServerMessageType.POSSIBLE_PATHS, payload: { possiblePaths } });
  }

  //UTILS

  private joinQueue(session: Session): void {
    this.queueManager.add(session.login);
    session.state = SessionStateTypeEnum.IN_QUEUE;
  }

  private leaveQueue(session: Session): void {
    this.queueManager.remove(session.login);
    session.state = SessionStateTypeEnum.ONLINE;
  }

  private checkSessionState(session: Session, requiredState: SessionStateTypeEnum, message: string): void {
    if (session.state !== requiredState) {
      throw message;
    }
  }

  private leaveGame(session: Session): void {
    const gameSession = this.gameManager.getGameSession(session.login);
    if (gameSession) {
      session.state = SessionStateTypeEnum.ONLINE;
      const newGameSession: GameSession = this.gameManager.updateGameSession(gameSession.id, session);
      if (this.gameManager.isGameSessionIdle(newGameSession.id)) {
        this.gameManager.finishGame(gameSession.id);
        this.sendGameFinished(newGameSession);
      }
    }
  }

  private updateSessionsAndSend<T>(logins: string[], updateSessionFn: (session: Session) => void, message: ServerMessage<T>): Session[] {
    const sessions = logins.map(login => this.sessions[login]).filter(s => s !== undefined);
    sessions.forEach(session => updateSessionFn(session));
    sessions.forEach(session => this.sendToSession(session, message));
    return sessions;
  }

  private sendToSession<T>(session: Session, message: ServerMessage<T>): void {
    session.webSocket.send(JSON.stringify(message));
  }
}
