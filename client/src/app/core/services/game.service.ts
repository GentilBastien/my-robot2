import { computed, inject, Injectable, signal } from '@angular/core';
import { WebsocketService } from '@core/services/websocket.service';
import { ClientMessageType, Coordinate, GameState, PathCostCoordinate } from 'shared';

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly websocketService = inject(WebsocketService);

  public readonly gameState$ = this.websocketService.gameState$;
  public readonly possiblePaths$ = this.websocketService.possiblePaths$;

  public readonly gameId = signal<string | undefined>(undefined);
  public readonly hasGame = computed<boolean>(() => this.gameId() !== undefined);
  public readonly gameState = signal<GameState | undefined>(undefined);
  public readonly possiblePaths = signal<PathCostCoordinate[] | undefined>(undefined);

  public setGame(gameId: string | undefined): void {
    this.gameId.set(gameId);
  }

  public setGameState(gameState: GameState | undefined): void {
    this.gameState.set(gameState);
  }

  public setPossiblePaths(pathCostCoordinates: PathCostCoordinate[] | undefined): void {
    this.possiblePaths.set(pathCostCoordinates);
  }

  public refreshGameState(login: string): void {
    if (this.hasGame()) {
      this.websocketService.sendToServer(login, ClientMessageType.ASK_STATE);
    }
  }

  public refreshPossiblePaths(login: string): void {
    if (this.hasGame()) {
      this.websocketService.sendToServer(login, ClientMessageType.ASK_POSSIBLE_PATHS);
    }
  }

  public sendPath(login: string, path: Coordinate[]): void {
    if (this.hasGame()) {
      this.websocketService.sendToServer(login, ClientMessageType.PATH, { path });
    }
  }

  public sendAction(login: string): void {
    if (this.hasGame()) {
      this.websocketService.sendToServer(login, ClientMessageType.ACTION);
    }
  }

  public sendTurnEnd(login: string): void {
    if (this.hasGame()) {
      this.websocketService.sendToServer(login, ClientMessageType.TURN_END);
    }
  }

  public sendLeaveGame(login: string): void {
    if (this.hasGame()) {
      this.websocketService.sendToServer(login, ClientMessageType.LEAVE_GAME);
    }
  }

  public sendRejoinGame(login: string): void {
    if (this.hasGame()) {
      this.websocketService.sendToServer(login, ClientMessageType.REJOIN_GAME);
    }
  }
}
