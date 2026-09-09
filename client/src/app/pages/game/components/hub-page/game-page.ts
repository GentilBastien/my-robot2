import { Component, computed, inject } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { GameUsecase } from '@app/pages/game/game.usecase';
import { Coordinate, PathCostCoordinate } from 'shared';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mr2-game-page',
  imports: [ReactiveFormsModule],
  providers: [GameUsecase],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly gameUsecase = inject(GameUsecase);

  protected readonly login = this.authenticationService.login;
  protected readonly possiblePaths = this.gameUsecase.possiblePaths;
  protected readonly gameState = this.gameUsecase.gameState;

  protected yourTurn = computed<boolean>(() => this.gameState()?.turnState.currentTurnRobotId === this.login());

  protected pathForm = new FormControl<string>('');

  protected onTurnEnd(): void {
    this.gameUsecase.doTurnEnd(this.login());
  }

  protected onGetPossiblePaths(): void {
    this.gameUsecase.refreshPossiblePaths(this.login());
  }

  protected onMovement(): void {
    const coordinates = this.mapInputValueToCoordinates(this.pathForm.value);
    this.gameUsecase.doMovement(this.login(), coordinates);
  }

  protected onLeaveGame(): void {
    this.gameUsecase.leaveGame(this.login());
  }

  // readonly numCols = 5;
  // readonly numRows = 4;
  //
  // readonly rows: number[] = Array(this.numRows).fill(0);
  // readonly cols: number[] = Array(this.numCols).fill(0);
  //
  // protected isOddRow(index: number): boolean {
  //   return index % 2 === 0;
  // }

  protected stringifyPathCost(value: PathCostCoordinate): string {
    return value.coordinatesPath.map(c => `(${c.x},${c.y},${c.z})`).join(', ');
  }

  protected onCopyPath(value: PathCostCoordinate): void {
    this.pathForm.setValue(this.stringifyPathCost(value));
  }

  private mapInputValueToCoordinates(inputValue: string | null): Coordinate[] {
    // (1,2,-3), (7,5,-12) into [{x:1, y:2, z:-3}, {x:7, y:5, z:-12}]
    if (inputValue) {
      return inputValue.split(', ').map(elem => {
        const xyz = elem
          .slice(1, -1)
          .split(',')
          .map(e => Number(e));
        return { x: xyz[0], y: xyz[1], z: xyz[2] };
      });
    }
    return [];
  }
}
