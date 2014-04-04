var Stats = Backbone.View.extend({

  heartTemplate:   '{{#hearts}}<img src="http://media-cache-ak0.pinimg.com/736x/e8/b7/49/e8b749ef64c58a40c65ae330df605e68.jpg" style="height: 30px; width:30px"></img>{{/hearts}}'
, correctTemplate: '<h2>{{correct}}</h2>'
, timeTemplate:    '<h2>{{minutes}}:{{seconds}}</h2>'

, initialize: function () {
  }

, render: function () {
    var $el     = this.$el
      , hearts  = this.hearts
      , correct = this.correct
      , seconds = this.seconds
      ;

    $el.find('.js-stats-hearts').html(
      Mustache.render(this.heartTemplate, {hearts: hearts})
    );

    $el.find('.js-stats-correct').html(
      Mustache.render(this.correctTemplate, {correct: correct})
    );

    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    seconds = seconds > 9 ? seconds : "0" + seconds;

    var time = minutes + ":" + seconds;
    $el.find('.js-stats-time').html(
      Mustache.render(this.timeTemplate, {minutes: minutes, seconds: seconds})
    );

    return this;
  }

, set: function (hearts, correct, seconds) {
    this.hearts  = new Array(hearts);
    for (var i = 0; i < hearts; i ++) this.hearts[i] = 'HEART';

    this.seconds = seconds;
    this.correct = correct;
    this.render();
  }

});