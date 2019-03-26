(function($, window, document, undefined){

    'use strict';

    PFTX.modules.tabs = function(container, btns, tabs, classActiveName, classInActiveName){

        var $listButtons = $(container).find(btns);
        var $listTabs = $(container).find(tabs);
        var activeClass = false;

        // Verifico se está sem conteudo e oculto SE SIM
        $listTabs.each(function(){
            var current = $(this).index();
            if ($(this).text().length === 0) {
                $(this).hide();
                $listButtons.eq(current).hide();
            }
        });

        $(container).live('click', btns, function(e){

            if ($(e.target).hasClass(btns.replace('.',''))) {
                // Removendo class active dos elementos
                $listButtons.removeClass(classActiveName);
                $listTabs.removeClass(classActiveName);

                // capturo a posição do elemento clicado
                var current = $(e.target).index();

                // adicionando class active ao elemento clicado e ao seu respectivo conteúdo
                $(e.target).addClass(classActiveName);
                $listTabs.eq(current).addClass(classActiveName);
            }
        });
    };

})(jQuery, window, document);