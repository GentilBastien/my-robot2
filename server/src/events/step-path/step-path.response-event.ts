import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, MovementTypeEnum, Reducer, StepPathCostCoordinate } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { remainingMovementReducer } from '@reducers/resources.reducer';
import { MovementRequestEvent } from '@events/movement/movement.request-event';
import { getEffect, getEffectStatesAtCoordinates } from '@calculators/effect.calculator';
import { getRobotResourcesState } from '@calculators/robot.calculator';

export class StepPathResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  movementType: MovementTypeEnum;
  stepPath: StepPathCostCoordinate;

  public constructor(parameters: {
    sourceRobotId: string;
    responseValidated: boolean;
    movementType: MovementTypeEnum;
    stepPath: StepPathCostCoordinate;
  }) {
    this.sourceRobotId = parameters.sourceRobotId;
    this.responseValidated = parameters.responseValidated;
    this.movementType = parameters.movementType;
    this.stepPath = parameters.stepPath;
  }

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const effectStatesFromCoordinates: EffectState[] = getEffectStatesAtCoordinates(
      context.gameState,
      this.stepPath.endCoordinates
    );

    const requestMovementStateEvent = new MovementRequestEvent(this.sourceRobotId, this.stepPath.endCoordinates);
    context.pendingRequests.insertEnd(requestMovementStateEvent);

    const newPendingRequestStateEvents: RequestEvent[] = effectStatesFromCoordinates.flatMap(effectState => {
      const effect: Effect = getEffect(effectState);
      return effect.handle({
        trigger: EffectTrigger.ON_SURFACE,
        effectState,
        coordinates: this.stepPath.endCoordinates,
        gameState: context.gameState,
        gameCalculator: context.gameCalculator,
      });
    });
    context.pendingRequests.insertEnd(newPendingRequestStateEvents);

    const remainingMove: number = getRobotResourcesState(context.gameState, this.sourceRobotId).remainingMove;
    const newRemainingMove: number = remainingMove - this.stepPath.cost;
    return remainingMovementReducer(this.sourceRobotId, newRemainingMove);
  }
}
