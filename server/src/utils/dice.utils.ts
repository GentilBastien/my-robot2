export function DiceUtils_roll(nDices: number, nFaces: number): number {
  let sum = 0;
  for (let i = 0; i < nDices; i++) {
    sum += DiceUtils_rollFaces(nFaces);
  }
  return sum;
}

export function DiceUtils_rollFaces(nFaces: number): number {
  return Math.floor(Math.random() * nFaces + 1);
}
