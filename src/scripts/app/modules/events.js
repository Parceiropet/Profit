(function($, window, document, undefined) {

    'use strict';

    PFTX.modules.events = window.PFTX.modules.events || {
        container: null,

        /* For debug */
        log: []
    };

    PFTX.modules.events.listener = function (evt, callback) {
        if(!(this.container instanceof Object)){
            this.container = $('<div />');
        }

        this.container.on(evt, function(evt){
            callback(evt.customData);
        });
    },

    PFTX.modules.events.dispatch = function (evt, __customData) {
        var totalEvents = this.log.length;
        var _evt = evt;
        var _evtHasExist = false;
        var _customData = __customData || {};

        if(!(this.container instanceof Object) ){
            this.container = $('<div>');
        }

        try {
            this.container.trigger({
                'type': _evt,
                customData: _customData
            });
        }catch(err) {
            //console.warn(err);
        }

        this.log.push(_evt);
    }

})(jQuery, window, document);
