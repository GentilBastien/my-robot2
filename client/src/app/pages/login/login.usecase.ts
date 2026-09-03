import { inject, Injectable } from '@angular/core';
import { AuthenticationService } from '@core/services/authentication.service';
import { WebsocketService } from '@core/services/websocket.service';
import { Router } from '@angular/router';
import { from, of, switchMap } from 'rxjs';
import { routeConstants } from '@app/app.routes';

@Injectable()
export class LoginUsecase {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly websocketService = inject(WebsocketService);
  private readonly router = inject(Router);

  public readonly loadingSignIn = this.authenticationService.loadingSignIn;

  public destroyWebsocket(): void {
    this.websocketService.destroyWebsocket();
  }

  public signIn(login: string | undefined): void {
    if (login && login.length > 0) {
      this.authenticationService.loadingSignIn.set(true);
      this.authenticationService.signIn(login);
      this.websocketService
        .createWebsocket(login)
        .pipe(
          switchMap(ready => {
            if (ready) {
              return from(this.router.navigate([routeConstants.HUB]));
            } else {
              return of(ready);
            }
          })
        )
        .subscribe(() => this.authenticationService.loadingSignIn.set(false));
    }
  }
}
