const connectWsInput = document.getElementById('connect-ws-input');
const connectWsBtn = document.getElementById('connect-ws');
const disconnectWsBtn = document.getElementById('disconnect-ws');
const connectedSpan = document.getElementById('connected-span');
const blockLoginA = document.getElementById('block-login-a');
const queueDiv = document.getElementById('queue-div');
const enterQueue = document.getElementById('enter-queue-btn');
const leaveQueue = document.getElementById('leave-queue-btn');
const divProposal = document.getElementById('div-proposal');
const acceptProposal = document.getElementById('accept-proposal-btn');
const declineProposal = document.getElementById('decline-proposal-btn');
const inGameSpan = document.getElementById('in-game-span');

let websocket = null;
let logged = false;
let login = '';
let inQueue = false;
let hasProposal = false;
let currProposalId = undefined;
let answeredProposal = false;
let inGame = false;

connectWsBtn.onclick = () => {
  login = connectWsInput.value;
  websocket = new WebSocket('ws://localhost:8080/api/v1/game?login=' + login);

  websocket.onopen = a => {
    updateLogged(true, login);
  };
  websocket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.type === 'SEND_PROPOSAL') {
      console.log('SEND_PROPOSAL');
      updateProposal(true);
      currProposalId = message.proposalId;
    }
    if (message.type === 'PROPOSAL_TIMED_OUT') {
      console.log('PROPOSAL_TIMED_OUT');
      enterQueue.disabled = answeredProposal;
      leaveQueue.disabled = !answeredProposal;
      updateProposal(false);
    }
    if (message.type === 'MATCH_DECLINED') {
      console.log('MATCH_DECLINED by ', message.loginDeclined);
      enterQueue.disabled = login !== message.loginDeclined;
      leaveQueue.disabled = login === message.loginDeclined;
      updateProposal(false);
    }
    if (message.type === 'MATCH_ACCEPTED') {
      console.log('MATCH_ACCEPTED');
      enterQueue.disabled = true;
      leaveQueue.disabled = true;
      updateProposal(false);
      updateGame(true);
    }
  };
};

disconnectWsBtn.onclick = () => {
  updateLogged(false);
  websocket.close();
};

enterQueue.onclick = () => {
  inQueue = true;
  enterQueue.disabled = true;
  leaveQueue.disabled = false;
  clientSent(login, 'QUEUE');
};

leaveQueue.onclick = () => {
  inQueue = false;
  enterQueue.disabled = false;
  leaveQueue.disabled = true;
  clientSent(login, 'DEQUEUE');
};

acceptProposal.onclick = () => {
  answeredProposal = true;
  clientSent(login, 'ACCEPT_PROPOSAL', { proposalId: currProposalId });
};

declineProposal.onclick = () => {
  answeredProposal = true;
  clientSent(login, 'DECLINE_PROPOSAL', { proposalId: currProposalId });
};

function updateLogged(flag, login) {
  if (flag) {
    connectedSpan.innerHTML = 'Connected as <b>' + login + '</b>';
    blockLoginA.style.display = 'none';
    disconnectWsBtn.style.display = 'block';
    queueDiv.style.display = 'block';
  } else {
    connectedSpan.innerText = '';
    blockLoginA.style.display = 'block';
    disconnectWsBtn.style.display = 'none';
    queueDiv.style.display = 'none';
  }
  logged = flag;
  connectWsBtn.disabled = flag;
  disconnectWsBtn.disabled = !flag;
}

function updateProposal(flag) {
  hasProposal = flag;
  if (flag) {
    divProposal.style.display = 'block';
  } else {
    divProposal.style.display = 'none';
    answeredProposal = false;
  }
}

function updateGame(flag) {
  if (flag) {
    inGameSpan.style.display = 'inline-block';
  } else {
    inGameSpan.style.display = 'none';
  }
}

function clientSent(login, type, payload) {
  websocket.send(
    JSON.stringify({
      login,
      type,
      payload,
    })
  );
}
