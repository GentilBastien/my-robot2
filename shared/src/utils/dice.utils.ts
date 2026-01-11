export class DiceUtils {
  public static roll(nDices: number, nFaces: number): number {
    let cumul: number = 0;
    for (let i = 0; i < nDices; i++) {
      cumul += DiceUtils.rollFaces(nFaces);
    }
    return cumul;
  }

  private static rollFaces(nFaces: number): number {
    return Math.floor(Math.random() * nFaces + 1);
  }
}
