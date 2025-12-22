import { Comparable } from './weight.ts';

export type ComparableRobot = Robot & Comparable<Robot>;

export type Robot = {
  name: string;

  x: number;
  y: number;
  orientation: number;

  //characteristics
  pow: number;
  mob: number;
  chs: number;
  cpu: number;
  ene: number;
  intf: number;

  //statistics
  hp: number;
  damage: number;
  accuracy: number;
  dodge: number;
  critical: number;
  damageReduction: number;
  armor: number;
  moveSpeed: number;
  attackSpeed: number;

  //resources
  mana: number;
  maxMana: number;
  regenMana: number;
  energyModules: number;
  overheating: number;
};
