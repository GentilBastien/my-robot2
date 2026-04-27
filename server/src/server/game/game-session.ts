import { Session } from '@server/session/session';
import { Game } from '@game/game';

export interface GameSession {
  id: string;
  game: Game;
  sessions: Session[];
  createdAt: number;
}
