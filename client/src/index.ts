const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  ws.send(
    JSON.stringify({
      type: 'login',
      login: 'player1',
    })
  );
};

ws.onmessage = event => {
  const message = JSON.parse(event.data);

  console.log('received:', message);
};
