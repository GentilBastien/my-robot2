import { QueueEventEmitter } from './queue/queue-event-emitter';

export class EventHandler {
  private queueEventEmitter = new QueueEventEmitter();

  // private sessionManager = new SessionManager();
  // private proposalManager = new ProposalManager();

  constructor() {
    this.emitter.on('queue:join', ({ login }) => {
      // this.sessionManager.receiveJoinQueue(login);
    });
    this.emitter.on('queue:leave', ({ login }) => {
      // this.sessionManager.receiveLeaveQueue(login);
    });
    this.emitter.on('proposal:accepted', ({ login, proposalId }) => {
      // this.sessionManager.receiveAcceptProposal(login, proposalId);
    });
    this.emitter.on('proposal:declined', ({ login, proposalId }) => {
      // this.sessionManager.receiveDeclineProposal(login, proposalId);
    });
  }

  public get emitter(): QueueEventEmitter {
    return this.queueEventEmitter;
  }
}
