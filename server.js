var http = require('http'),
    sockjs = require('sockjs')
    ;

var webSockets,
    server = http.createServer(),
    clients = {}
    ;

webSockets = sockjs.createServer();
webSockets.on('connection', onConnection);
webSockets.installHandlers(server, { prefix:'/echo' } );
server.listen(9999, '0.0.0.0');

var lobby = [];
var leaderboard = [];

function onConnectionStartup(connection) {
  clients[connection.id] = { connID: connection };
}

function onDataCallback(data, connection) {
  data = JSON.parse(data);

  switch(data.type)
  {
  case 'lobby':
    handleLobbyEvent(data, connection)
    break;
  case 'user':
    handleUserEvent(data, connection)
    break;
  }
}

function handleLobbyEvent(data, connection) {
  if (lobby.length === 0) {
    startLobbyCountDown();
  }
  lobby.push(data.name);
}

function handleUserEvent(data, connection) {
  for (k in data) {
    clients[connection.id][k] = data[k];
  }
}

function startLobbyCountDown() {
  var counter = 2;
  var lobbyCountdown = setInterval(function () {
    broadcast({ type: 'lobbyCountDown', counter: counter--, lobby: lobby });
    if (counter === 0) {
      clearInterval(lobbyCountdown);
      startGame();
    }
  }, 1000);
}

function startGame() {
  var counter = 5;
  var leaderboard = calculateLeaderboard();
  var gameCountdown = setInterval(function () {
    broadcast({ type: 'gameCountDown', counter: counter--, leaderboard: leaderboard });
    if (counter === 0) {
      clearInterval(gameCountdown);
      endGame();
    }
  }, 1000);
}

function calculateLeaderboard() {
  var leaderboard = [];
  Object.keys(clients).forEach(function(c) {
    leaderboard.push(clients[c]);
  });
  leaderboard.sort(function(a,b){
    if (a.points && b.points)
      return b.points-a.points
    return Math.random() - 0.5;
  });
  return leaderboard;
}

function endGame() {
  broadcast({ type: 'endgame' });
  clients = [];
  lobby = [];
}

function onCloseCallback(connection) {
  delete clients[connection.id];
}

function onConnection(conn) {
  onConnectionStartup(conn);

  conn.on('data', function (data) {
    onDataCallback(data, conn);
  });

  conn.on('close', function onCloseCB () {
    onCloseCallback(conn);
  });
}
function broadcast (message) {
  var filter = function(key, value) {
    if (key !== 'connID') return value;
  }
  for ( var i in clients ) {
    clients[i].connID.write( JSON.stringify(message, filter) );
  }
}