export class GameFunctionsUtils {
  public static mitigateDamageWithArmor(rawDamage: number, armor: number): number {
    return rawDamage / (1 + armor / 100);
  }

  public static mitigateDamageWithRobust(rawDamage: number, robust: number): number {
    return rawDamage * (1 - robust / 100);
  }
}
