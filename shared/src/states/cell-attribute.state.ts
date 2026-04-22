export interface CellAttributeState {
  baseAttribute: BaseAttribute;
  topographyAttribute: TopographyAttribute;
  featureAttribute: FeatureAttribute;
  resourceAttribute: ResourceAttribute;
  raisingLevelAttribute: RaisingLevelAttribute;
}

export enum BaseAttribute {
  WATER,
  PLAIN,
  GRASS,
  DESERT,
  TUNDRA,
  SNOW,
}

export enum TopographyAttribute {
  FLAT,
  HILLS,
  CANYONS,
  MOUNTAINS,
}

export enum FeatureAttribute {
  NONE,
  FOREST,
  JUNGLE,
  MARSH,
  OASIS,
  FLOOD,
  REEF,
  ICE,
}

export enum ResourceAttribute {
  NONE,
  RES1,
  RES2,
  RES3,
}

export enum RaisingLevelAttribute {
  LEVEL1,
  LEVEL2,
  LEVEL3,
}
