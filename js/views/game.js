var Game = Backbone.View.extend({

  template:
    '<div class="grid-col-8 grid-row js-left-container">' +
    '<div class="js-stats grid-col-12 grid-row padding-bottom--none">' +
    '  <div class="js-stats-time grid-col-2 grid-col--align-center grid-col--no-spacing"></div>' +
    '  <div class="js-stats-hearts grid-col-8 grid-col--align-center grid-col--no-spacing"></div>' +
    '  <div class="js-stats-correct grid-col-2 grid-col--align-center grid-col--no-spacing"></div>' +
    '  <div class="grid-col-2 grid-col--no-spacing grid-col--align-center"><small>TIME LEFT</small></div>' +
    '  <div class="grid-col-8 grid-col--align-center grid-col--no-spacing grid-col--align-center"><small>LIVES</small></div>' +
    '  <div class="grid-col-2 grid-col--align-right grid-col--no-spacing grid-col--align-center"><small>POINTS</small></div>' +
    '</div>' +
    '<article class="js-problem grid-col-12 grid-row color-scheme--grey"></article>' +
    '</div>' +
    '<div class="grid-col-4 grid-row js-right-container">' +
    '<div class="js-leaderboard grid-col-12 grid-row padding-bottom--none color-scheme--grey">' +
    '</div>' +
    '</div>'

, initialize: function () {
    this.hearts = 5;
    this.correct = 0;
    this.seconds = 1;
    this.lobby = [];

    return this;
  }

, render: function () {
    this.$el.html(Mustache.render(this.template));

    this._renderStats();
    this._renderProblem();
    this._renderLeaderboard();
    this._updateStats();

    return this;
  }

, _updateStats: function () {
    this.stats.set(this.hearts, this.correct, this.seconds);
  }

, _updateLeaderboard: function (data) {
    this.leaderboard.update(data);
  }

, _renderStats: function () {
    this.stats = new Stats({
      el: $('.js-stats')
    }).render();
  }

, _renderLeaderboard: function () {
    this.leaderboard = new Leaderboard({
      el: $('.js-leaderboard')
    });
  }

, _renderProblem: function () {
    var problem = new Problem({
      el:          $('.js-problem')
    , subProblems: PROBLEMS[this.correct % PROBLEMS.length]
    }).render();

    problem.on('success', function () {
      this.correct ++;
      this._renderProblem();
      this._updateStats();
      this._triggerChange();
    }.bind(this));

    problem.on('failure', function () {
      this.hearts --;
      this._updateStats();
      this._triggerChange();
    }.bind(this));
  }

, update: function (data) {
    this.seconds = data.counter;
    this._updateLeaderboard(data.leaderboard);
    this._updateStats();
  }

, _triggerChange: function () {
    this.trigger('user', {
      hearts: this.hearts
    , correct: this.correct
    });
  }

});