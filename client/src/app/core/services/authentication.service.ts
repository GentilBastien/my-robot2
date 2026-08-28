import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  private readonly login = signal<string>("");

  public setLogin(loginInput: string | undefined): void {
    if (loginInput) {
      this.login.set(loginInput);
    }
  }
}
