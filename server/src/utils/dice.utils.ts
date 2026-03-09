export function diceRolls(nDices: number, nFaces: number): number {
  let sum = 0;
  for (let i = 0; i < nDices; i++) {
    sum += DiceRollFaces(nFaces);
  }
  return sum;
}

export function DiceRollFaces(nFaces: number): number {
  return Math.floor(Math.random() * nFaces + 1);
}
