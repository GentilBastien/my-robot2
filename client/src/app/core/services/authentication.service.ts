import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { routeConstants } from '@app/app.routes';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private readonly router = inject(Router);

  public readonly login = signal<string>('');
  public readonly isLogged = computed(() => this.login() !== '');

  public signIn(value: string | undefined): void {
    if (value) {
      this.login.set(value);
    }
  }

  public logout(): void {
    this.login.set('');
    from(this.router.navigate([routeConstants.LOGIN])).subscribe();
  }
}
