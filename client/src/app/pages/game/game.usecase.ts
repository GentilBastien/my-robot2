import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '@core/services/game.service';
import { from } from 'rxjs';
import { routeConstants } from '@app/app.routes';

@Injectable()
export class GameUsecase {
  private readonly router = inject(Router);
  private readonly gameService = inject(GameService);

  public leavesGame(login: string): void {
    this.gameService.sendLeaveGame(login);
    from(this.router.navigate([routeConstants.HUB])).subscribe();
  }
}
