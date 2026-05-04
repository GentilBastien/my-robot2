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
const leaveGameBtn = document.getElementById('leave-game-btn');
const rejoinGameBtn = document.getElementById('rejoin-game-btn');
const endTurnBtn = document.getElementById('end-turn-btn');

let websocket = null;
let logged = false;
let login = '';
let inQueue = false;
let hasProposal = false;
let currProposalId = undefined;
let answeredProposal = false;
let inGame = false;
let currGameId = undefined;

connectWsBtn.onclick = () => {
  login = connectWsInput.value;
  websocket = new WebSocket('ws://localhost:8080/api/v1/game?login=' + login);

  websocket.onopen = _ => {
    updateLogged(true, login);
    console.log('onOpen !');
  };
  websocket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.type === 'LOGGED_IN') {
      currGameId = message.payload.gameId;
      console.log('LOGGED_IN', currGameId);
      if (currGameId) {
        rejoinGameBtn.disabled = false;
        enterQueue.disabled = true;
        leaveQueue.disabled = true;
      }
    }
    if (message.type === 'SEND_PROPOSAL') {
      console.log('SEND_PROPOSAL');
      updateProposal(true);
      currProposalId = message.payload.proposalId;
    }
    if (message.type === 'PROPOSAL_TIMED_OUT') {
      console.log('PROPOSAL_TIMED_OUT');
      enterQueue.disabled = answeredProposal;
      leaveQueue.disabled = !answeredProposal;
      updateProposal(false);
    }
    if (message.type === 'PROPOSAL_DECLINED') {
      console.log('PROPOSAL_DECLINED by ', message.payload.loginDeclined);
      enterQueue.disabled = login !== message.payload.loginDeclined;
      leaveQueue.disabled = login === message.payload.loginDeclined;
      updateProposal(false);
    }
    if (message.type === 'PROPOSAL_ACCEPTED') {
      console.log('PROPOSAL_ACCEPTED');
      enterQueue.disabled = true;
      leaveQueue.disabled = true;
      updateProposal(false);
      updateGame(true);
      currGameId = message.payload.gameId;
    }

    if (message.type === 'GAME_FINISHED') {
      console.log('GAME_FINISHED');
      enterQueue.disabled = false;
      leaveQueue.disabled = true;
      rejoinGameBtn.disabled = true;
      updateGame(false);
      currGameId = undefined;
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
  enterQueue.disabled = true;
  leaveQueue.disabled = true;
  clientSent(login, 'ACCEPT_PROPOSAL', { proposalId: currProposalId });
};

declineProposal.onclick = () => {
  answeredProposal = true;
  enterQueue.disabled = true;
  leaveQueue.disabled = true;
  clientSent(login, 'DECLINE_PROPOSAL', { proposalId: currProposalId });
};

leaveGameBtn.onclick = () => {
  updateGame(false);
  rejoinGameBtn.disabled = false;
  enterQueue.disabled = true;
  leaveQueue.disabled = true;
  clientSent(login, 'LEAVE_GAME');
};
rejoinGameBtn.onclick = () => {
  updateGame(true);
  rejoinGameBtn.disabled = true;
  clientSent(login, 'REJOIN_GAME');
};
endTurnBtn.onclick = () => {
  clientSent(login, 'TURN_END');
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
  inGame = flag;
  if (flag) {
    inGameSpan.style.display = 'inline-block';
    enterQueue.disabled = true;
    leaveQueue.disabled = true;
  } else {
    inGameSpan.style.display = 'none';
    enterQueue.disabled = false;
    leaveQueue.disabled = true;
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
