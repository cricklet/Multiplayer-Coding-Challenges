var End = Backbone.View.extend({

  template: '<h1>The Game Has Ended!</h1>'

, initialize: function () {
  }

, render: function () {
    var $el = this.$el
      ;

    $el.html(Mustache.render(this.template));

    return this;
  }
});