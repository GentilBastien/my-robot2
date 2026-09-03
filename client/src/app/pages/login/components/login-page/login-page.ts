import { Component, ElementRef, inject, OnInit, viewChild } from '@angular/core';
import { LoginUsecase } from '@app/pages/login/login.usecase';

@Component({
  selector: 'mr2-login-page',
  imports: [],
  providers: [LoginUsecase],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage implements OnInit {
  private readonly loginUsecase = inject(LoginUsecase);

  protected readonly loginInput = viewChild<ElementRef<HTMLInputElement>>('connectInput');
  protected readonly loadingSignIn = this.loginUsecase.loadingSignIn;

  public ngOnInit(): void {
    this.loginUsecase.destroyWebsocket();
  }

  protected onLogin(): void {
    const loginInput: string | undefined = this.loginInput()?.nativeElement.value;
    this.loginUsecase.signIn(loginInput);
  }
}
