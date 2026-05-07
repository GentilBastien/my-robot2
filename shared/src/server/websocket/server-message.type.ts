export const ServerMessageType = {
  LOGGED_IN: 'LOGGED_IN',
  SEND_PROPOSAL: 'SEND_PROPOSAL',
  PROPOSAL_ACCEPTED: 'PROPOSAL_ACCEPTED',
  PROPOSAL_DECLINED: 'PROPOSAL_DECLINED',
  PROPOSAL_TIMED_OUT: 'PROPOSAL_TIMED_OUT',
  GAME_FINISHED: 'GAME_FINISHED',
  POSSIBLE_PATHS: 'POSSIBLE_PATHS',
} as const;

export type ServerMessageType = (typeof ServerMessageType)[keyof typeof ServerMessageType];
