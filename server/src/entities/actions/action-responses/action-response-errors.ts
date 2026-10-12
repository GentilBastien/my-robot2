export interface ActionResponseErrors {
  wrongTurn?: { robotTurnId: string };
  actionUnavailable?: { conditions: string[] };
  robotOverheating?: { overheating: number };
  notEnoughAction?: { cost: number; available: number };
  notEnoughMana?: { cost: number; available: number };
  notEnoughRange?: { required: number; available: number };
  noVision?: { invisible: boolean };
}
