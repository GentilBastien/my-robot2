import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, Reducer, RobotStateTypeEnum, TurnStateTypeEnum } from 'shared';
import { RequestEvent } from '@events/request.event';
import { Effect } from '@entities/effects/effect';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { turnStateTypeReducer } from '@reducers/turn.reducer';
import { ResourcesRequestEvent } from '@events/resources/resources.request-event';
import { TurnStartRequestEvent } from '@events/turn-start/turn-start.request-event';
import { EffectCalculator } from '@calculators/effect.calculator';
import { RobotCalculator } from '@calculators/robot.calculator';

export class TurnEndResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;

  public constructor(parameters: { sourceRobotId: string; responseValidated: boolean }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    /**
     * At the end of the turn, get the effects from the robot ending turn, and the effects from the cell it is on.
     */
    const effectStatesFromRobot: EffectState[] = EffectCalculator.getEffectStatesFromRobot(context, this.sourceRobotId);
    const effectStatesFromCell: EffectState[] = EffectCalculator.getEffectStatesFromRobotCell(
      context,
      this.sourceRobotId
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

    const isRobotDead = RobotCalculator.hasStates(context, this.sourceRobotId, RobotStateTypeEnum.DEAD);
    if (!isRobotDead) {
      const resourcesRequestEvent: ResourcesRequestEvent = new ResourcesRequestEvent(this.sourceRobotId);
      context.pendingRequests.insertEnd(resourcesRequestEvent);
    }

    const turnStartRequestEvent = new TurnStartRequestEvent(this.sourceRobotId);
    context.pendingRequests.insertEnd(turnStartRequestEvent);

    const turnStateReducer = turnStateTypeReducer(TurnStateTypeEnum.FINISHED);

    return [turnStateReducer];
  }
}
