import { ContextEvent } from '@events/context.event';
import { ResponseEvent } from '@events/response.event';
import { EffectState, MaybeArray, MovementTypeEnum, Reducer, StepPathCostCoordinate } from 'shared';
import { Effect } from '@entities/effects/effect';
import { RequestEvent } from '@events/request.event';
import { EffectTrigger } from '@entities/effects/effect-trigger';
import { remainingMovementReducer } from '@reducers/resources.reducer';
import { MovementRequestEvent } from '@events/movement/movement.request-event';

export class StepPathResponseEvent implements ResponseEvent {
  sourceRobotId: string;
  responseValidated: boolean;
  movementType: MovementTypeEnum;
  stepPath: StepPathCostCoordinate;

  public mapToReducer(context: ContextEvent): MaybeArray<Reducer> {
    const effectStatesFromCoordinates: EffectState[] = context.gameCalculator.getEffectStatesAtCoordinates(
      context.gameState,
      this.stepPath.endCoordinates
    );

    const requestMovementStateEvent = new MovementRequestEvent(this.sourceRobotId, this.stepPath.endCoordinates);
    context.pendingRequests.insertEnd(requestMovementStateEvent);

    const newPendingRequestStateEvents: RequestEvent[] = effectStatesFromCoordinates.flatMap(effectState => {
      const effect: Effect = context.gameCalculator.getEffect(effectState);
      return effect.handle({
        trigger: EffectTrigger.ON_SURFACE,
        effectState,
        coordinates: this.stepPath.endCoordinates,
        gameState: context.gameState,
        gameCalculator: context.gameCalculator,
      });
    });
    context.pendingRequests.insertEnd(newPendingRequestStateEvents);

    const remainingMove: number = context.gameCalculator.getRobotResourcesState(
      context.gameState,
      this.sourceRobotId
    ).remainingMove;
    const newRemainingMove: number = remainingMove - this.stepPath.cost;
    return remainingMovementReducer(this.sourceRobotId, newRemainingMove);
  }

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
}
