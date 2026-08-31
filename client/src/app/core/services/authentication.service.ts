import { computed, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthenticationService {
  public readonly login = signal<string>("");
  public readonly isLogged = computed(() => this.login() !== "");

  public signIn(value: string | undefined): void {
    if (value) {
      this.login.set(value);
    }
  }

  public logout(): void {
    this.login.set("");
  }
}
