import { AttributesEnum } from 'shared/dist/types/attributes.enum.js';

export class AttributesManager {
  private attributesMap = new Map<AttributesEnum, number>([
    [AttributesEnum.POW, 8],
    [AttributesEnum.MOB, 8],
    [AttributesEnum.CHS, 8],
    [AttributesEnum.CPU, 8],
    [AttributesEnum.ENE, 8],
    [AttributesEnum.INTF, 8],
  ]);

  public getModifier(attr: AttributesEnum): number {
    return Math.floor((attr - 10) / 2);
  }

  public setPoint(attr: AttributesEnum, value: number): void {
    this.attributesMap.set(attr, value);
  }
}
