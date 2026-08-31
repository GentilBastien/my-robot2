import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { AuthenticationService } from '../../../../core/services/authentication.service';
import { Router } from '@angular/router';
import { routeConstants } from '../../../../app.routes';
import { from } from 'rxjs';
import { WebsocketService } from '@core/services/websocket.service';

@Component({
  selector: 'mr2-login-page',
  imports: [],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  private readonly authenticationService = inject(AuthenticationService);
  private readonly websocketService = inject(WebsocketService);
  private readonly router = inject(Router);

  protected readonly loginInput = viewChild<ElementRef<HTMLInputElement>>('connectInput');

  public ngOnInit(): void {
    this.websocketService.destroyWebsocket();
  }

  protected onLogin(): void {
    const loginInput: string | undefined = this.loginInput()?.nativeElement.value;
    if (loginInput && loginInput.length > 0) {
      this.authenticationService.signIn(loginInput);
      from(this.router.navigate([routeConstants.HUB])).subscribe();
    }
  }
}
