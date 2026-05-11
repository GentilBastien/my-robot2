import { Game } from './OLDCODE/game';
import { createServer } from '@server/server';
import { GameProposal } from '@server/proposal/game-proposal';
import { createNewGame } from '@game/game-generator/game.generator';

const logins = ['bast', 'jade', 'raph', 'wass'];
const gameProposal: GameProposal = {
  id: '',
  accepted: new Set<string>(logins),
  createdAt: 15968754,
  declined: false,
  loginDeclined: undefined,
  logins: logins,
};
const game: Game = createNewGame(gameProposal);

createServer().then();
