const connectWsInput = document.getElementById('connect-ws-input');
const connectWsBtn = document.getElementById('connect-ws');
const disconnectWsBtn = document.getElementById('disconnect-ws');
const connectedSpan = document.getElementById('connected-span');
const blockLoginA = document.getElementById('block-login-a');

let websocket = null;
let logged = false;
let login = '';

connectWsBtn.onclick = () => {
  login = connectWsInput.value;
  websocket = new WebSocket('ws://localhost:8080/api/v1/game?login=' + login);
  websocket.onopen = (a, b) => {
    updateLogged(true, login);
  };
  websocket.onmessage = event => {
    const message = JSON.parse(event.data);
    console.log('received:', message);
  };
};

disconnectWsBtn.onclick = () => {
  updateLogged(false);
  websocket.close();
};

function updateLogged(flag, login) {
  if (flag) {
    connectedSpan.innerHTML = 'Connected as <b>' + login + '</b>';
    blockLoginA.style.display = 'none';
    disconnectWsBtn.style.display = 'block';
  } else {
    connectedSpan.innerText = '';
    blockLoginA.style.display = 'block';
    disconnectWsBtn.style.display = 'none';
  }
  logged = flag;
  connectWsBtn.disabled = flag;
  disconnectWsBtn.disabled = !flag;
}
