export const MessageType = {
  QUEUE: 'QUEUE',
  DEQUEUE: 'DEQUEUE',
  ACCEPT_MATCH: 'ACCEPT_MATCH',
  DECLINE_MATCH: 'DECLINE_MATCH',
  TURN_END: 'TURN_END',
  MOVEMENT: 'MOVEMENT',
  ACTION: 'ACTION',
} as const;

export type MessageType = (typeof MessageType)[keyof typeof MessageType];
