import { AttributesTypeEnum, RobotData } from 'shared';

export class AttributesRobotManager implements RobotData<AttributesTypeEnum> {
  public map = new Map<AttributesTypeEnum, number>([
    [AttributesTypeEnum.POW, 0],
    [AttributesTypeEnum.MOB, 0],
    [AttributesTypeEnum.CHS, 0],
    [AttributesTypeEnum.CPU, 0],
    [AttributesTypeEnum.ENE, 0],
    [AttributesTypeEnum.INTF, 0],
  ]);

  public getModifier(attr: AttributesTypeEnum): number {
    return Math.floor((attr - 10) / 2);
  }

  public setPoint(attr: AttributesTypeEnum, value: number): void {
    this.map.set(attr, value);
  }

  public addPoint(attr: AttributesTypeEnum, value: number): void {
    const oldValue = this.map.get(attr);
    if (oldValue !== undefined) {
      this.map.set(attr, oldValue + value);
    }
  }
}
