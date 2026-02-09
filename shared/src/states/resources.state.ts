export interface ResourcesState {
  isAlive: boolean;

  totalMove: number;
  remainingMove: number;

  hp: number;
  maxHp: number;
  regenHp: number;

  mana: number;
  maxMana: number;
  regenMana: number;

  overheating: number;
  maxOverheating: number;
  coolingDown: number;
  isOverheating: boolean;

  energyModules: number;
}
