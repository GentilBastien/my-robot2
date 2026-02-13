export class DiceUtils {
  public static roll(nDices: number, nFaces: number): number {
    let sum: number = 0;
    for (let i = 0; i < nDices; i++) {
      sum += DiceUtils.rollFaces(nFaces);
    }
    return sum;
  }

  private static rollFaces(nFaces: number): number {
    return Math.floor(Math.random() * nFaces + 1);
  }
}
