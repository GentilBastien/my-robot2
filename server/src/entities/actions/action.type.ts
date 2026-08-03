export interface TargetedAction {
  readonly targetRobotId: string;
}

export interface ZoneAction {
  readonly targetCoordinates: string;
  readonly radius: number;
}

export interface DamageAction {
  readonly damage: number;
}

export interface HealAction {
  readonly heal: number;
}

export interface ShieldAction {
  readonly shield: number;
}
