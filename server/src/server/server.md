# Game Server Documentation
## Overview

This server provides two main communication mechanisms:

- REST API for authentication and data retrieval

- WebSocket connection for in-game communication

Both run on the same Node.js server using Fastify for HTTP routes and WebSocket (ws) for in-game connections.

```
Client
│
├── HTTP (REST API)
│      /api/v1/login
│      /api/v1/robots/:id
│
└── WebSocket
       /api/v1/game
```
## Authentication
A client authenticates with
- login
- password

Its login is used as an identifier

## Queue
A logged client upgrades to websocket connection at route /api/v1/game.

The client is now registered as a Player in the WebsocketManager.

At any moment, the client may send a request to enter queue.

## Routes

### Register a new route
```
export async function registerRoutes(app: FastifyInstance) {
    const prefix = '/api/v1';
    await app.register(loginRoute, { prefix });
    await app.register(robotDetailRoute, { prefix });
    //add new routes here
    ...
}
```