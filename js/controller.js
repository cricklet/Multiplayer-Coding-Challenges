$(document).ready(function () {
  var sock = new SockJS('http://127.0.0.1:9999/echo')

  var sendData = function (type, data) {
    if (data === undefined) {
      data = {}
    }

    data['type'] = type;
    sock.send(JSON.stringify(data));
  }

  var $el = $('.js-container')
    , game = null
    , lobby = null
    ;

  var startLobby = function () {
    $el.empty();
    game = null;

    lobby = new Lobby({
      el: $el
    }).render();

    lobby.on('user', function (data) {
      sendData('lobby', data);
      sendData('user', data);
    });
  }

  var startGame = function () {
    $el.empty();
    lobby = null;

    game = new Game({
      el: $el
    }).render();
  }

  var endGame = function () {
    $el.empty();
    lobby = null;
    game = null;

    end = new End({
      el: $el
    }).render();
  }

  startLobby();

  sock.onmessage = function (e) {
    var data = JSON.parse(e.data);

    switch ( data.type ) {
      case 'lobbyCountDown':
        if (lobby) {
          lobby.updateFromLobby(data);
        }
        console.log(data);
        break;
      case 'gameCountDown':
        if (lobby) {
          lobby.updateFromGame(data);
          if (lobby.isReady()) {
            startGame();
          }
        }
        if (game) {
          game.update(data);
        }
        console.log(data);
        break;
      case 'endgame':
        endGame();
        console.log(data);
        break;
    }
  };
});