import { EventEmitter } from 'events';
import { QueueEvent } from './queue.events';

export class QueueEventEmitter {
  private emitter = new EventEmitter();

  emit<K extends keyof QueueEvent>(event: K, payload: QueueEvent[K]) {
    this.emitter.emit(event, payload);
  }

  on<K extends keyof QueueEvent>(event: K, cb: (payload: QueueEvent[K]) => void) {
    this.emitter.on(event, cb);
  }
}
