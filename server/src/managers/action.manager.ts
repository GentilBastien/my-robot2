import { Action } from '../action/action';
import { ActionOutput } from '../action/action-output';
import { Robot } from '../game-entities/robot';

export class ActionManager {
  public initAction(action: Action, target: Robot): void {
    // action.setOwners(this._owner, target);
    // if (this.arenaManager.actionInRange(action)) {
    //   this.actionManager.computeAction(action);
    // }
  }

  public computeAction(action: Action): ActionOutput {
    return action.computeAction();
  }
}
