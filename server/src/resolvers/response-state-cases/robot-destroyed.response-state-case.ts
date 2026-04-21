import { RobotDestroyedResponseStateEvent } from '@events/response-state.event';
import { Reducer } from 'shared';
import { GameCalculator } from '@game/game-calculator/game.calculator';
import { RequestStateEvent } from '@events/request-state.event';
import { PriorityListStructure } from '@structures/priority-list/priority-list.structure';

export function robotDestroyedResponseStateCase(
  gameCalculator: GameCalculator,
  robotDestroyedResponseStateEvent: RobotDestroyedResponseStateEvent,
  pendingRequestEvents: PriorityListStructure<RequestStateEvent>
): Reducer {}
