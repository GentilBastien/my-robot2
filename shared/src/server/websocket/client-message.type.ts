export const ClientMessageType = {
  CONNECTION: 'CONNECTION',
  QUEUE: 'QUEUE',
  DEQUEUE: 'DEQUEUE',
  ACCEPT_PROPOSAL: 'ACCEPT_PROPOSAL',
  DECLINE_PROPOSAL: 'DECLINE_PROPOSAL',
  LEAVE_GAME: 'LEAVE_GAME',
  REJOIN_GAME: 'REJOIN_GAME',
  TURN_END: 'TURN_END',
  POSSIBLE_PATHS: 'POSSIBLE_PATHS',
  PATH: 'PATH',
  ACTION: 'ACTION',
} as const;

export type ClientMessageType = (typeof ClientMessageType)[keyof typeof ClientMessageType];
