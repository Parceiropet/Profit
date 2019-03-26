/*
    Example:

    var faleconosco = new PFTX.modules.masterdata({
        store: 'lojaModelo',
        entity: 'FC'
    }).init();

    faleconosco.get('dataEntityId,nome,cidade','0-10');

    var dados = {
        nome: 'Vinicius Rocha',
        cidade: 'Rio de Janeiro',
        empresa: 'Profite'
    };

    faleconosco.post(dados);

    dados.nome = 'Vinicius Maciel';

    faleconosco.put(dados);

    dados.id = 'FC-1234';

    faleconosco.delete(dados);
*/
(function($, window, document, undefined) {

    'use strict';

    var modules = PFTX.modules;

    function masterdata(_config) {
        this.config = {
            store: '',
            entity: '',
            appKey: false,
            appToken: false
        };

        $.extend(this.config, _config);
    };

    masterdata.prototype.headers = {
        'Accept': 'application/vnd.vtex.ds.v10+json',
        'Content-Type': 'application/json'
    };

    masterdata.prototype.get = function(filters, range){
        var _that = this;
        range = typeof range !== 'undefined' ? range : '0-50';

        _that.headers['REST-Range'] = 'resources=' + range;

        $.ajax({
            url: '/'+_that.config.store+'/dataentities/'+_that.config.entity+'/search?_fields='+filters,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            headers: _that.headers,
            success: function(data) {
                console.log(data);
                return data;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseText) {
                    if ($.parseJSON(jqXHR.responseText)) {
                        var errorM = $.parseJSON(jqXHR.responseText).Message;
                        console.log(errorM);
                        return errorM;
                    }
                }
            }
        });
    };

    masterdata.prototype.post = function(data){
        var _that = this,
            post = JSON.stringify(data);

        $.ajax({
            url: 'http://api.vtexcrm.com.br/'+_that.config.store+'/dataentities/'+_that.config.entity+'/documents',
            type: 'POST',
            data: post,
            dataType: 'json',
            crossDomain: true,
            headers: _that.headers,
            success: function(response) {
                console.log(response);
                return response;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseText) {
                    if ($.parseJSON(jqXHR.responseText)) {
                        var errorM = $.parseJSON(jqXHR.responseText).Message;
                        console.log(errorM);
                        return null;
                    }
                }
            }
        });
    };

    masterdata.prototype.put = function(data){
        var _that = this,
            post = JSON.stringify(data),
            id = data.id.slice(3);

        $.ajax({
            url: 'http://api.vtexcrm.com.br/'+_that.config.store+'/dataentities/'+_that.config.entity+'/documents/'+id,
            type: 'PUT',
            data: post,
            dataType: 'json',
            crossDomain: true,
            headers: _that.headers,
            success: function(response) {
                console.log(response);
                return response;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseText) {
                    if ($.parseJSON(jqXHR.responseText)) {
                        var errorM = $.parseJSON(jqXHR.responseText).Message;
                        console.log(errorM);
                        return null;
                    }
                }
            }
        });
    };

    masterdata.prototype.patch = function(data){
        var _that = this,
            post = JSON.stringify(data),
            id = data.id.slice(3);

        $.ajax({
            url: 'http://api.vtexcrm.com.br/'+_that.config.store+'/dataentities/'+_that.config.entity+'/documents/'+id,
            type: 'PATCH',
            data: post,
            dataType: 'json',
            crossDomain: true,
            headers: _that.headers,
            success: function(response) {
                return response;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseText) {
                    if ($.parseJSON(jqXHR.responseText)) {
                        var errorM = $.parseJSON(jqXHR.responseText).Message;
                        console.log(errorM);
                        return null;
                    }
                }
            }
        });
    };

    masterdata.prototype.delete = function(data){
        var _that = this,
            id = data.id.slice(3);

        $.ajax({
            url: 'http://api.vtexcrm.com.br/'+_that.config.store+'/dataentities/'+_that.config.entity+'/documents/'+id,
            type: 'DELETE',
            dataType: 'json',
            crossDomain: true,
            headers: _that.headers,
            success: function(response) {
                return response;
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseText) {
                    if ($.parseJSON(jqXHR.responseText)) {
                        var errorM = $.parseJSON(jqXHR.responseText).Message;
                        console.log(errorM);
                        return null;
                    }
                }
            }
        });
    };

    masterdata.prototype.init = function() {
        console.log('masterdata.js pronto');
        if(_that.config.appKey) _that.headers['x-vtex-api-appKey'] = _that.config.appKey;
        if(_that.config.appToken) _that.headers['x-vtex-api-appToken'] = _that.config.appToken;
        return this;
    };

    modules.masterdata = masterdata;

})(jQuery, window, document);
