var Lobby = Backbone.View.extend({

  startTemplate:
    '<div class="grid-col-6 grid-col--center color-scheme--grey">' +
    '<h1>Welcome!</h1>' +
    '<p>' +
    '  Ready for some intense coding action?' +
    '</p>' +
    '<p>' +
    '<div class="field field--text">' +
    '  <input class="js-lobby-username" type="text" placeholder="username" />' +
    '</div>' +
    '</p>' +
    '<p class="js-lobby-players"></p>' +
    '<button class="js-lobby-ready button button--large button--fill-space">Ready</button>' +
    '</div>'

, readyTemplate:
    '<div class="grid-col-6 grid-col--center color-scheme--grey">' +
    '<h1>Welcome!</h1>' +
    '<p>' +
    '  Game starting in: {{seconds}} seconds' +
    '</p>' +
    '<p class="js-lobby-players"></p>' +
    '</div>'

, playerTemplate:
    '{{#hasPlayers}}Players:' +
    '<ul>' +
    '{{#players}}<li>{{.}}</li>{{/players}}' +
    '</ul>' +
    '{{/hasPlayers}}' +
    '{{^hasPlayers}}No players have joined yet.{{/hasPlayers}}'

, events: {
    'click .js-lobby-ready': '_readyUp'
  }

, initialize: function () {
    this.ready = false;
    this.seconds = '?';
    return this;
  }

, render: function () {
    if (this.ready) {
      this.$el.html(Mustache.render(this.readyTemplate, {
        seconds: this.seconds
      }));
    } else if (!this.rendered) {
      this.$el.html(Mustache.render(this.startTemplate, {}));
    }

    this.$el.find('.js-lobby-players').html(Mustache.render(this.playerTemplate, {
      players:    this.players
    , hasPlayers: this.players && this.players.length > 0
    }));

    this.rendered = true;

    return this;
  }

, updateFromLobby: function (data) {
    this.seconds = data.counter;
    this.players = data.lobby;
    this.render();
  }

, updateFromGame: function (data) {
    this.seconds = 0;
    this.players = [];
    _.each(data.leaderboard, function (user) {
      this.players.push(user.name);
    }.bind(this));

    this.render();
  }

, _readyUp: function () {
    var username = this.$el.find('.js-lobby-username').val() || 'default';
    this.ready = true;
    this.render();
    this.trigger('user', {
      name: username
    });
  }

, isReady: function () {
    return this.ready;
  }

});