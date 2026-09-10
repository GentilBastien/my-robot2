import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, Reducer, TurnStateTypeEnum } from 'shared';
import { RequestEvent } from '@events/request.event';
import { Effect } from '@entities/effects/effect';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { turnAdvanceReducer, turnStateTypeReducer } from '@reducers/turn.reducer';
import { EffectCalculator } from '@calculators/effect.calculator';
import { TurnCalculator } from '@calculators/turn.calculator';

export class TurnStartResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    //sourceRobotId is the id of the robot that previously played.
    const newTurnState = TurnCalculator.advanceTurn(context);

    const effectStatesFromRobot: EffectState[] = EffectCalculator.getEffectStatesFromRobot(
      context,
      newTurnState.currentTurnRobotId
    );
    const effectStatesFromCell: EffectState[] = EffectCalculator.getEffectStatesFromRobotCell(
      context,
      newTurnState.currentTurnRobotId
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
    const turnStateReducer = turnStateTypeReducer(TurnStateTypeEnum.STARTED);
    const turnReducer = turnAdvanceReducer(newTurnState.currentTurnNumber, newTurnState.currentTurnRobotId);

    return [turnStateReducer, turnReducer];
  }
}
