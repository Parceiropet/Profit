(function($, window, document, undefined) {

    'use strict';

    PFTX.modules.user = {};

    PFTX.modules.user.isLogged = function(){
        if($('.welcome').find('#login').length) return false;
        else return true;
    };

})(jQuery, window, document);