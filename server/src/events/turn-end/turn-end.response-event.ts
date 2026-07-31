import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, Reducer, TurnStateTypeEnum } from 'shared';
import { RequestEvent } from '@events/request.event';
import { Effect } from '@entities/effects/effect';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { startTurnReducer } from '@reducers/turn.reducer';
import { ResourcesRequestEvent } from '@events/resources/resources.request-event';
import { TurnStartRequestEvent } from '@events/turn-start/turn-start.request-event';
import { TurnCalculator } from '@calculators/turn.calculator';
import { EffectCalculator } from '@calculators/effect.calculator';

export class TurnEndResponseEvent implements ResponseEvent {
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
    /**
     * At the end of the turn, get the effects from the robot ending turn, and the effects from the cell it is on.
     */
    const effectStatesFromRobot: EffectState[] = EffectCalculator.getEffectStatesFromRobot(context, this.turnRobotId);
    const effectStatesFromCell: EffectState[] = EffectCalculator.getEffectStatesFromRobotCell(
      context,
      this.turnRobotId
    );

    const requestStateEventsFromEffects: RequestEvent[] = [...effectStatesFromRobot, ...effectStatesFromCell].flatMap(
      effectState => {
        const effect: Effect = EffectCalculator.getEffect(effectState);
        return effect.handle({
          trigger: EffectTrigger.ON_TURN_END,
          effectState,
          gameState: context.gameState,
          gameStateHandler: context.gameStateHandler,
        });
      }
    );
    context.pendingRequests.insertEnd(requestStateEventsFromEffects);

    const resourcesRequestEvent: ResourcesRequestEvent = new ResourcesRequestEvent(this.turnRobotId);
    context.pendingRequests.insertEnd(resourcesRequestEvent);

    TurnCalculator.advanceTurn(context);

    const turnStartRequestEvent = new TurnStartRequestEvent(this.turnRobotId);
    context.pendingRequests.insertEnd(turnStartRequestEvent);

    return startTurnReducer(TurnStateTypeEnum.FINISHED);
  }
}
