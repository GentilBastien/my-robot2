import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GameService {
  public readonly hasGame = signal<boolean>(false);

  public currentlyInGame(value: boolean): void {
    this.hasGame.set(value);
  }
}
