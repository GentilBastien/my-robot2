const ws = new WebSocket('ws://localhost:8080/api/v1/game');

ws.onopen = () => {
  const objToSend = {
    type: 'login',
    login: 'player1',
  };
  ws.send(JSON.stringify(objToSend));
};

ws.onmessage = event => {
  const message = JSON.parse(event.data);
  console.log('received:', message);
};

const aze = {
  type: 'login',
  login: 'player1',
};
ws.send(JSON.stringify(aze));
