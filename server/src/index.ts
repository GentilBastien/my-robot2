import { ServerManager } from './managers/server.manager.js';

/**
 * Program Entry point.
 */
new ServerManager({
  port: 8080,
});
