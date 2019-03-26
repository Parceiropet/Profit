(function($, window, document, undefined) {
  'use strict';

  var modules = PFTX.modules;

  function customSelect(_config) {
    /*jshint validthis: true */
    this.config = {
      target: 'select'
    };

    $.extend(this.config, _config);
  }

  customSelect.prototype.bindEvents = function() {
    this.onClickTitle();
    this.onBlur();
    this.onSelectItem();

    // pegando o valor inicial
    $(this.config.target).each(function(){
      var value = $(this).val();
      var text = $(this).find('option:selected').text();
      $(this).next('.fakeSelect').find('.fakeSelect__item')
        .each(function(){
          if($(this).attr('data-value') == value) {
            $(this).parents('.fakeSelect')
                .attr('data-selected', value)
                .find('.fakeSelect__title a').html(text);
          }
        });
    });
  };

  customSelect.prototype.build = function() {
    var fakeSelect, option, options, listOption;

    $(this.config.target).each(function(){
        options = [];
        listOption = '';

        $(this).find('option').each(function(){
          option = {key: $(this).text(), value: $(this).val()};
          options.push(option);
        });

        for (var i = 0; i < options.length; i++) {
          listOption += '<a class="fakeSelect__item" data-value="'+options[i].value+'">'+options[i].key+'</a>';
        }

        fakeSelect = '<dl class="fakeSelect" data-selected=""><dt class="fakeSelect__title"><a>Selecione</a><span class="fakeSelect__arrow"></span><dd class="fakeSelect__list">'+listOption+'</dd></dl>';

        $(fakeSelect).insertAfter($(this));

        $('.fakeSelect__list').hide();
      });
  };

  customSelect.prototype.onClickTitle = function() {
    $('body').on('click', '.fakeSelect__title', function(event){
      event.stopPropagation();
      $(this).parent().toggleClass('active')
        .find('.fakeSelect__list').toggle();
    });
  };

  customSelect.prototype.onSelectItem = function() {
    var _that = this;

    $('body').on('click', '.fakeSelect__item', function(event){
      event.stopPropagation();
      var value = $(this).attr('data-value');
      var text = $(this).text();

      $(this).parent().hide()
        .parent().attr('data-selected', value).removeClass('active')
        .prev(_that.config.target).val(value).trigger('change');

      $(this).parents('.fakeSelect')
        .find('.fakeSelect__title a').html(text);
    });
  };

  customSelect.prototype.onBlur = function() {
    $('html').on('click', function(){
      $('.fakeSelect').removeClass('active')
        .find('.fakeSelect__list').hide();
    });
  };

  customSelect.prototype.init = function() {
    this.build();
    this.bindEvents();
  };

  modules.customSelect = customSelect;

})(jQuery, window, document);
