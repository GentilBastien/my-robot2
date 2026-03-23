const connectWsBtn = document.getElementById('connect-ws');
const connectWsInput = document.getElementById('connect-ws-input');
const disconnectWsBtn = document.getElementById('disconnect-ws');
const disconnectWsInput = document.getElementById('disconnect-ws-input');

let websocket = null;

connectWsBtn.onclick = () => {
  websocket = new WebSocket('ws://localhost:8080/api/v1/game?login=' + connectWsInput.value);
  websocket.onopen = () => {};
  websocket.onmessage = event => {
    const message = JSON.parse(event.data);
    console.log('received:', message);
  };
};

disconnectWsBtn.onclick = () => {
  websocket.close();
};
