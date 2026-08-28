import { Component, ElementRef, inject, viewChild } from "@angular/core";
import { AuthenticationService } from "../../../../core/services/authentication.service";

@Component({
  selector: "mr2-login-page",
  imports: [],
  templateUrl: "./login-page.html",
  styleUrl: "./login-page.scss",
})
export class LoginPage {
  private readonly authenticationService = inject(AuthenticationService);

  protected readonly loginInput =
    viewChild<ElementRef<HTMLInputElement>>("connectInput");

  protected onLogin(): void {
    const loginInput: string | undefined =
      this.loginInput()?.nativeElement.value;
    this.authenticationService.setLogin(loginInput);
  }
}
