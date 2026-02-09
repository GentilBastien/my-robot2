// // -----------
// // VALIDATORS
// // -----------
//
// public actionInRange(gameState: Readonly<GameState>, actionInstance: ActionInstance): boolean {
//   const source = this.getRobotCoordinates(gameState, actionInstance.sourceRobotId);
//   const target = this.getRobotCoordinates(gameState, actionInstance.targetRobotId);
//   const hexCellSource = this.hexGrid.getCellAt(source);
//   const hexCellTarget = this.hexGrid.getCellAt(target);
//   return this.hexGrid.isCellInRange(hexCellSource, actionInstance.action.range, hexCellTarget);
// }
//
// public isRobotTurnToPlay(robotId: string): boolean {
//   const robotToPlay = this.turnOrder.currentItem;
//   if (robotToPlay) {
//     return this.turnOrder.currentItem?.id === robotId;
//   }
//   throw 'Temp error';
// }
//
// public isValidMove(gameState: Readonly<GameState>, robotId: string, pathCoordinate: PathCoordinate): boolean {
//   const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
//   const remainingMove = this.getRobotState(gameState, robotId).resources.remainingMove;
//   return (
//     pathCoordinate.cost <= remainingMove && this.coordinateEquals(pathCoordinate.coordinatesPath[0], robotCoordinates)
//   );
// }
//
// // -----------
// // GETTERS
// // -----------
//
// public getRobotState(gameState: Readonly<GameState>, robotId: string): RobotState {
//   const robotFound = gameState.robots[robotId];
//   if (robotFound) {
//     return robotFound;
//   }
//   throw 'Temp error';
// }
//
// public getRobotCoordinates(gameState: Readonly<GameState>, robotId: string): Coordinates {
//   return this.getRobotState(gameState, robotId).coordinates;
// }
//
// public getPossibleTargets(gameState: Readonly<GameState>, robotId: string): PathCoordinate[] {
//   const robotState = this.getRobotState(gameState, robotId);
//   const robotCoordinates = this.getRobotCoordinates(gameState, robotId);
//   const robotCell = this.hexGrid.getCellAt(robotCoordinates);
//   return this.hexGrid.possiblePaths(robotCell, robotState.resources.remainingMove);
// }
//
// // -----------
// // EXECUTORS
// // -----------
//
// public robotMoves(gameState: Readonly<GameState>, robotId: string, pathCoordinate: PathCoordinate): GameState {
//   const targetCoordinates = pathCoordinate.coordinatesPath[pathCoordinate.coordinatesPath.length - 1];
//   const newRobotState = this.getRobotState(gameState, robotId);
//   newRobotState.resources.remainingMove -= pathCoordinate.cost;
//   newRobotState.coordinates = targetCoordinates;
//   return changeRobotState(gameState, newRobotState);
// }
//
// public advanceTurn(gameState: Readonly<GameState>): GameState {
//   const robotToPlay = this.turnOrder.next();
//   const newTurnState: TurnState = {
//     currentTurnNumber: gameState.turnState.currentTurnNumber + 1,
//     currentTurnRobot: this.getRobotState(gameState, robotToPlay.id),
//   };
//   return changeTurnState(gameState, newTurnState);
// }
//
// private coordinateEquals(coordinates1: Coordinates, coordinates2: Coordinates): boolean {
//   return coordinates1.x === coordinates2.x && coordinates1.y === coordinates2.y && coordinates1.z === coordinates2.z;
// }
