/**
 * The effect trigger keys.
 */
export enum EffectTrigger {
  /**
   * Triggered on effect application.
   */
  ON_APPLY,

  /**
   * Triggered on action sent when effect active.
   */
  ON_ACTION,

  /**
   * Triggered on entity walked on effect present on coordinates.
   */
  ON_WALK,

  /**
   * Triggered when turn starts.
   */
  ON_TURN_START,

  /**
   * Triggered when turn ends.
   */
  ON_TURN_END,

  /**
   * Triggered on effect expiration.
   */
  ON_EXPIRE,
}
