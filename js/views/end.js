var End = Backbone.View.extend({

  template: '<div class="grid-col-12 grid-col--align-center"><h3>The Game Has Ended!</h3><p>You got {{{correct}}} points.</p></div>'

, initialize: function (attrs) {
    this.correct = attrs.correct;
  }

, render: function () {
    var $el     = this.$el
      , correct = this.correct
      ;

    $el.html(Mustache.render(this.template, {
      correct: correct
    }));

    return this;
  }
});