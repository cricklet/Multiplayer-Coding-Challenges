var Problem = Backbone.View.extend({

  template: '<h2>{{prompt}}</h2>' +
            '<div class="js-problem-options  margin-bottom--1"></div>' +
            '<div class="grid-col-12 grid-col--no-spacing grid-col--center">' +
            '<button class="js-problem-next button--alternate button button--large button--fill-space">Next</button>' +
            '</div>'

, initialize: function (attrs) {
    // [ [options], [options] ]
    this.subProblems = attrs.subProblems;
    this.subProblemIndex = 0;
  }

, render: function () {
    var $el        = this.$el
      , subProblem = this.subProblems[this.subProblemIndex]
      ;

    $el.html(Mustache.render(this.template, subProblem));

    var $optionsEl = $el.find(".js-problem-options");

    var optionsView = new Options({
      el:      $optionsEl
    , options: subProblem.options
    });
    optionsView.render();

    this.listenTo(optionsView, 'success', this._success.bind(this));
    this.listenTo(optionsView, 'failure', this._failure.bind(this));

    return this;
  }

, _success: function () {
    this.subProblemIndex ++;
    if (this.subProblemIndex >= this.subProblems.length) {
      this._finish();
    } else {
      this.render();
    }
  }

, _finish: function () {
    var $nextEl = this.$el.find(".js-problem-next")

    $nextEl.removeClass("button--alternate");
    $nextEl.click(function () {
      this.trigger('success');
      this._successDoge();
    }.bind(this));

    this._successDoge();
    setTimeout(function () {
      this._successDoge();
    }.bind(this), 500);
  }

, _failure: function () {
    this.trigger('failure');
  }

, _successDoge: function () {
    var compliments      = ['wow', 'much code', 'amaze', 'beautiful', 'nice', 'so hip', 'cool', 'omg', 'want', 'good', 'much fix', 'less bug', 'yes codes']
      , complimentsIndex = Math.floor(Math.random()*compliments.length)
      , compliment       = compliments[complimentsIndex]
      ;

    var $doge  = $('<div class="doge">' + compliment + '</div>')
      , width  = $(window).width()
      , height = $(window).height()
      , top    = Math.round(0.2 * height + (0.6 * height * Math.random()))
      , left   = Math.round(0.2 * width  + (0.6 * width  * Math.random()))
      ;

    $doge.css('top', 0);
    $doge.css('left', 0);
    $doge.css('position', 'fixed');
    $doge.css('top', top);
    $doge.css('left', left);
    $doge.css('color', '#' + _.shuffle(['a', 'f', 'c', 'a', '8']).slice(0, 3).join(''))

    $doge.fadeIn(200);
    $('body').append($doge);
    setTimeout(function () {
      $doge.fadeOut(200, function () {
        $doge.remove();
      });
    }, 1000);
  }

});