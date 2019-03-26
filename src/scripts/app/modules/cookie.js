(function($, window, document, undefined) {

    'use strict';

    PFTX.modules.cookie = window.PFTX.modules.cookie || {};

    PFTX.modules.cookie.set = function(cname, cvalue, exdays, path){
        var _path = path || "/";
        var _exdays = exdays || 1;
        var d = new Date();
        d.setTime(d.getTime()+(_exdays*24*60*60*1000));
        var expires = "expires="+d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires+"; path="+_path;
    };

    PFTX.modules.cookie.get = function(cname){
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++)
        {
            var c = ca[i].trim();
            if (c.indexOf(name)==0) return c.substring(name.length,c.length);
        }

        return "";
    };

    PFTX.modules.cookie.remove = function(cname, path){
        var _path = path || "/";
        document.cookie = cname+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path="+_path;
    };

})(jQuery, window, document);