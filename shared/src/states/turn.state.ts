import { TurnStateTypeEnum } from '../enums/turn-state-type.enum';

export interface TurnState {
  currentTurnNumber: number;
  currentTurnRobotId: string;
  turnStateTypeEnum: TurnStateTypeEnum;
}
