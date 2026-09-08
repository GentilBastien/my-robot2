import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { GameUsecase } from '@app/pages/game/game.usecase';
import { Coordinate, PathCostCoordinate } from 'shared';

@Component({
  selector: 'mr2-game-page',
  imports: [],
  providers: [GameUsecase],
  templateUrl: './game-page.html',
  styleUrl: './game-page.scss',
})
export class GamePage {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly gameUsecase = inject(GameUsecase);

  protected login = this.authenticationService.login;
  protected possiblePaths = this.gameUsecase.possiblePaths;

  protected coordinates = viewChild<ElementRef<HTMLInputElement>>('coordinates');
  protected pathMovement = computed<Coordinate[]>(() => {
    const coordinatesValue: string | undefined = this.coordinates()?.nativeElement.value;
    if (coordinatesValue) {
      const coords: Coordinate[] = coordinatesValue.split(' ').map(a => {
        const xyz = a.split(',').map(e => Number(e));
        return { x: xyz[0], y: xyz[1], z: xyz[2] };
      });
      return coords;
    }
    return [];
  });

  protected onTurnEnd(): void {
    this.gameUsecase.doTurnEnd(this.login());
  }

  protected onGetPossiblePaths(): void {
    this.gameUsecase.refreshPossiblePaths(this.login());
  }

  protected onMovement(): void {
    this.gameUsecase.doMovement(this.login(), this.pathMovement());
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
}
