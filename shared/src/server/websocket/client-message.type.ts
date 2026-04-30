export const ClientMessageType = {
  LOGGED_IN: 'LOGGED_IN',
  QUEUE: 'QUEUE',
  DEQUEUE: 'DEQUEUE',
  ACCEPT_PROPOSAL: 'ACCEPT_PROPOSAL',
  DECLINE_PROPOSAL: 'DECLINE_PROPOSAL',
  LEAVE_GAME: 'LEAVE_GAME',
  REJOIN_GAME: 'REJOIN_GAME',
  TURN_END: 'TURN_END',
  MOVEMENT: 'MOVEMENT',
  ACTION: 'ACTION',
} as const;

export type ClientMessageType = (typeof ClientMessageType)[keyof typeof ClientMessageType];
