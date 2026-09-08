import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@core/services/game.service';
import { from } from 'rxjs';
import { routeConstants } from '@app/app.routes';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Coordinate, GameState, PathCostCoordinate } from 'shared';

@Injectable()
export class GameUsecase {
  private readonly router = inject(Router);
  private readonly gameService = inject(GameService);

  public readonly gameState = this.gameService.gameState;
  public readonly possiblePaths = this.gameService.possiblePaths;

  constructor() {
    this.gameService.gameState$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.receiveGameState(serverMessage.payload?.gameState));
    this.gameService.possiblePaths$
      .pipe(takeUntilDestroyed())
      .subscribe(serverMessage => this.receivePossiblePaths(serverMessage.payload?.possiblePaths));
  }

  /**
   * Refreshes the game state manually.
   */
  public refreshGameState(login: string): void {
    this.gameService.refreshGameState(login);
  }

  /**
   * Refreshes the possible paths manually.
   */
  public refreshPossiblePaths(login: string): void {
    this.gameService.refreshPossiblePaths(login);
  }

  /**
   * Client sends movement to server.
   */
  public doMovement(login: string, path: Coordinate[]): void {
    this.gameService.sendPath(login, path);
  }

  /**
   * Client sends action to server.
   */
  public doAction(login: string): void {
    this.gameService.sendAction(login);
  }

  /**
   * Client sends end turn to server.
   */
  public doTurnEnd(login: string): void {
    this.gameService.sendTurnEnd(login);
  }

  public leaveGame(login: string): void {
    this.gameService.sendLeaveGame(login);
    from(this.router.navigate([routeConstants.HUB])).subscribe();
  }

  public receiveGameState(gameState: GameState | undefined): void {
    this.gameService.setGameState(gameState);
  }

  public receivePossiblePaths(possiblePaths: PathCostCoordinate[] | undefined): void {
    this.gameService.setPossiblePaths(possiblePaths);
  }
}
