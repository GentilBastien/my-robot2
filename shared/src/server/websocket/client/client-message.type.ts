export const ClientMessageType = {
  QUEUE: 'QUEUE',
  DEQUEUE: 'DEQUEUE',
  ACCEPT_PROPOSAL: 'ACCEPT_PROPOSAL',
  DECLINE_PROPOSAL: 'DECLINE_PROPOSAL',
  TURN_END: 'TURN_END',
  MOVEMENT: 'MOVEMENT',
  ACTION: 'ACTION',
} as const;

export type ClientMessageType = (typeof ClientMessageType)[keyof typeof ClientMessageType];
