import { GameProposal } from '@server/proposal/game-proposal';

export interface QueueEvent {
  'queue:join': { login: string };
  'queue:leave': { login: string };

  'proposal:created': { proposal: GameProposal };
  'proposal:accepted': { login: string; proposalId: string };
  'proposal:declined': { login: string; proposalId: string };
  'proposal:cancelled': { proposal: GameProposal };
  'proposal:timeout': { proposal: GameProposal };

  'match:ready': { proposal: GameProposal };
}
