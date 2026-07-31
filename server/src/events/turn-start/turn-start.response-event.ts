import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, Reducer, TurnStateTypeEnum } from 'shared';
import { RequestEvent } from '@events/request.event';
import { Effect } from '@entities/effects/effect';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { startTurnReducer } from '@reducers/turn.reducer';
import { EffectCalculator } from '@calculators/effect.calculator';

export class TurnStartResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  turnNumber: number;
  turnRobotId: string;

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    turnNumber: number;
    turnRobotId: string;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.turnNumber = parameters.turnNumber;
    this.turnRobotId = parameters.turnRobotId;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const effectStatesFromRobot: EffectState[] = EffectCalculator.getEffectStatesFromRobot(context, this.turnRobotId);
    const effectStatesFromCell: EffectState[] = EffectCalculator.getEffectStatesFromRobotCell(
      context,
      this.turnRobotId
    );

    const requestEventsFromEffects: RequestEvent[] = [...effectStatesFromRobot, ...effectStatesFromCell].flatMap(
      effectState => {
        const effect: Effect = EffectCalculator.getEffect(effectState);
        return effect.handle({
          trigger: EffectTrigger.ON_TURN_START,
          effectState,
          gameState: context.gameState,
          gameStateHandler: context.gameStateHandler,
        });
      }
    );

    context.pendingRequests.insertEnd(requestEventsFromEffects);
    return startTurnReducer(TurnStateTypeEnum.STARTED);
  }
}
