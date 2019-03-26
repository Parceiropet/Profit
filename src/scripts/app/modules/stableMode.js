/*
Verifica qual o ambiente atual
Pode definir funções específicas para cada ambiente (vtex ou produção)
Exemplo de chamada padrão:
    var stableMode = new PFTX.modules.stableMode().init();
Exemplo de chamada com função definida para executar apenas no ambiente VTEX:
    var stableMode = new PFTX.modules.stableMode({
                        onStable: minhaFunction
                    }).init();
*/

(function($, window, document, undefined) {

    'use strict';

    var modules = PFTX.modules;

    function stableMode(_config){
        this.config = {
            onStable : function(){
                console.log('AMBIENTE DE DESENVOLVIMENTO');
            },
            onProduction: function(){
                console.log('AMBIENTE DE PRODUÇÃO');
            }
        };

        $.extend(this.config, _config);
    };

    stableMode.prototype.bindEvents = function() {
        var url = window.location.href;

        if(url.indexOf('vtex') > -1)
            this.config.onStable();
        else
            this.config.onProduction();
    };

    stableMode.prototype.init = function() {
        this.bindEvents();
    };

    modules.stableMode = stableMode;

})(jQuery, window, document);
