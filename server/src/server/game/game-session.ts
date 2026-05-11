import { Session } from '@server/session/session';
import { Game } from '../../OLDCODE/game';

export interface GameSession {
  id: string;
  game: Game;
  sessions: Session[];
  createdAt: number;
}
