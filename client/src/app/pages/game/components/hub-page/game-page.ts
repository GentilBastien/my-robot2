import { Component, inject } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { GameUsecase } from '@app/pages/game/game.usecase';

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

  protected onLeaveGame(): void {
    this.gameUsecase.leavesGame(this.login());
  }
}
