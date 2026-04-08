export interface ActionResponseErrors {
  wrongTurn?: { robotTurnId: string };
  robotOverheating?: { overheating: number };
  noEnoughAction?: { cost: number; available: number };
  noEnoughMana?: { cost: number; available: number };
  noEnoughRange?: { cost: number; available: number };
  noVision?: { invisible: boolean };
}
