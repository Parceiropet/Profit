(function ($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
    doacao = new PFTX.constructor.page('doacao');


    doacao.constructorOngs = function(ongs) {
        // console.log('constructorOngs', ongs);

        ongs.forEach(function(item) {

            var name = item.nome,
                text = (item.descricao) ? item.descricao : "Confira a lista da ONG",
                lista = item.lista,
                url = (item.url) ? item.url : lista,
                banner = item.banner,
                logo = item.logo;

            var srcImageBanner = '//api.vtex.com/parceiropet/dataentities/ON/documents/' + item.id + '/banner/attachments/' + banner;
            var srcLogo = '//api.vtex.com/parceiropet/dataentities/ON/documents/' + item.id + '/logo/attachments/' + logo;

            var html = [
                '<li class="doacao__list-item">',
                    '<label class="logo-container"><img src="' + srcLogo +'" alt="'+ name +'" class="logo" /></label>',
                    '<div class="list-item__header">',
                        '<h2 class="list-item__title">'+ name +'</h2>',
                        '<img src="'+ srcImageBanner +'" alt="'+ name +'" />',
                    '</div>',
                    '<div class="list-item__description">',
                        '<span class="list-item__description--title">Descrição</span>',
                        '<p class="list-item__description--text">'+ text +'</p>',
                    '</div >',
                    '<div class="list-item__link">',
                        '<a href="'+ url +'" class="doacao-link-ong">'+ url +'</a>',
                        '<a href="'+ lista +'" class="doacao-link-list" id="link-list">Doar Agora!</a>',
                    '</div>',
                '</li>'
            ].join('');
            // window.console.log(html);
            $('.doacao__list').append(html);
        });
    }

    doacao.getOngs = function() {
        console.log('getOngs new');
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "/parceiropet/dataentities/ON/search?_fields=id,banner,descricao,lista,logo,nome,url",
            "type": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/vnd.vtex.ds.v10+json"
            }
        }

        $.ajax(settings).done(function (data) {
            doacao.constructorOngs(data);
        }).fail(function(error){
            console.log('error:');
            console.log(error);
        }).always(function(data){
            console.log('always');
            console.log(data);
        })
    }


    doacao.DOMReady = function () {
        doacao.getOngs()
    };

    doacao.ajaxStop = function () {

    };

    pages.doacao = doacao;

})(jQuery, window, document);
