var Leaderboard = Backbone.View.extend({

  template: '<h3>Leaderboard</h3>'

, initialize: function (attrs) {
  }

, render: function () {
    this.$el.html(Mustache.render(this.template));
    return this;
  }

, update: function(data) {
    this.data = data;
    this.render();
  }

});