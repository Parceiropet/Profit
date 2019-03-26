/*
Controla a exibição da prateleira.
Exemplo de chamada padrão:
    var gridControl = new PFTX.modules.gridControl().init();
*/

(function($, window, document, undefined) {

    'use strict';

    var modules = PFTX.modules;

    function gridControl(_config){
        this.config = {
            button: '.grid-control',
            listClass: 'grid-list',
            tableClass: 'grid-table',
            currentGrid: 'table'
        };

        $.extend(this.config, _config);
    };

    gridControl.prototype.bindEvents = function() {
      var cf = this.config;
        $(cf.button).on('click', function(e){
          e.preventDefault();

          $('html').toggleClass(cf.listClass).toggleClass(cf.tableClass);
          $(this).toggleClass('list').toggleClass('table');

          cf.currentGrid = (cf.currentGrid === "table")? "list": "table";
          window.localStorage.setItem('PFTX.gridControl', cf.currentGrid);
        });
    };

    gridControl.prototype.loadGrid = function(){
      var cf = this.config;

      var gridStatus = window.localStorage.getItem('PFTX.gridControl') || cf.currentGrid;

      cf.currentGrid = gridStatus;
      $(cf.button).removeClass('list').removeClass('table').addClass(gridStatus);
      window.localStorage.setItem('PFTX.gridControl', gridStatus);

      var htmlClass = (cf.currentGrid === "table")? "grid-table":"grid-list";

      $('html').removeClass('list').removeClass('table').addClass(htmlClass);
    };

    gridControl.prototype.init = function() {
        this.loadGrid();
        this.bindEvents();
    };

    modules.gridControl = gridControl;

})(jQuery, window, document);
