export type RobotData<T> = {
  map: Map<T, number>;
  getModifier(data: T): number;
  setPoint(data: T, value: number): void;
  addPoint(data: T, value: number): void;
};
