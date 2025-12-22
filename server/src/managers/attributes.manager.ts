import { AttributesEnum } from 'shared';

export class AttributesManager {
  private attributesMap = new Map<AttributesEnum, number>([
    [AttributesEnum.POW, 0],
    [AttributesEnum.MOB, 0],
    [AttributesEnum.CHS, 0],
    [AttributesEnum.CPU, 0],
    [AttributesEnum.ENE, 0],
    [AttributesEnum.INTF, 0],
  ]);

  public getModifier(attr: AttributesEnum): number {
    return Math.floor((attr - 10) / 2);
  }

  public setPoint(attr: AttributesEnum, value: number): void {
    this.attributesMap.set(attr, value);
  }

  public addPoint(attr: AttributesEnum, value: number): void {
    const oldValue = this.attributesMap.get(attr);
    if (oldValue !== undefined) {
      this.attributesMap.set(attr, oldValue + value);
    }
  }
}
