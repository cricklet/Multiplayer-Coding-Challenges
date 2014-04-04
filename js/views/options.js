var Options = Backbone.View.extend({

  events: {
    'click .js-options-button': '_clickedOption'
  }

, template:       '<pre class="js-options-container challenge-options prettify-snippet--theme-ace-dark"></pre>'
, optionTemplate: '<div class="js-options-button challenge-option" data-next="{{next}}">{{text}}</div>'

, initialize: function (attrs) {
    // [
    //   {text: '<p>', next: false}
    // , {text: '  hello', next: false}
    // , {text: '<p>', next: true}
    // ]
    this.options = attrs.options;
  }

, render: function () {
    var $el = this.$el
      , el  = this.el
      ;

    $el.html(Mustache.render(this.template));

    var $optionsEl = $el.find('.js-options-container')
      ;

    _.each(this.options, function (option) {
      $optionsEl.append(Mustache.render(this.optionTemplate, option));
    }.bind(this));

    $optionsEl[0].innerHTML = PR.prettyPrintOne($optionsEl[0].innerHTML, 'html');

    return this;
  }

, _clickedOption: function (e) {
    var $target = $(e.currentTarget)
      , next    = $target.attr('data-next')
      ;

    if (next === true || next === 'true') {
      this.trigger('success');
      $target.addClass('right');
    } else {
      this.trigger('failure');
      $target.addClass('wrong');
    }
  }

});