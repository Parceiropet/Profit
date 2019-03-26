(function($, window, document, undefined) {

    'use strict';

    var pages = PFTX.pages,
        contact = new PFTX.constructor.page('contato'),
        urlDataEntity = 'https://api.vtexcrm.com.br/parceiropet/dataentities/';

    contact.bindEvents = function() {
        $(document).on('submit', '.form-faleconosco', function(evt) {
            evt && evt.preventDefault();

            var errorMessage = [];
            var errsCount = 0;

            $('.submit-status').remove();
            $('.form-faleconosco input').each(function() {
                var inputName = $(this).prev('.field-label').text().replace('*', '');
                if ($(this).val() === '') {
                    errsCount++;
                    errorMessage.push('O campo ' + inputName + ' é obrigatório.');
                }
            });

            if ($('.field-msg').val() === '') {
                errsCount++;
                errorMessage.push('Não se esqueça da mensagem.');
            }

            if (errsCount) {
                $('html, body').animate({ scrollTop: 0 });

                var completeMessage = '';

                $(errsCount).each(function (index, val) {
                    completeMessage += errorMessage[index]+ '<br />';
                });
            }

            contact.sendData($(this));
        });

    };

    contact.sendData = function(form) {

        var sigla = $(form).attr('action');

        var headers = {
            'Accept': 'application/vnd.vtex.ds.v10+json',
            'Content-Type': 'application/json',
            'REST-Range': 'resources=0-10'
        };

        var data = {
            'name': $(form).find('.field-txt[name="name"]').val(),
            'assunto': $(form).find('.field-combo[name="type-request"]').val(),
            'email': $(form).find('.field-txt[name="email"]').val(),
            'telefoneDDD': $(form).find('.field-ddd[name="telddd"]').val(),
            'telefone': $(form).find('.field-tel[name="telnumber"]').val(),
            'celularDDD': $(form).find('.field-ddd[name="celddd"]').val(),
            'celular': $(form).find('.field-tel[name="celnumber"]').val(),
            'pedido': $(form).find('.field-txt[name="numpedido"]').val(),
            'cpf': $(form).find('.field-txt[name="cpf"]').val(),
            'mensagem': $(form).find('.field-msg[name="message"]').val()
        };

        data = JSON.stringify(data);
        console.log(JSON.stringify(data));


        if(urlDataEntity.indexOf('/dataentities/'+sigla) == -1){
            urlDataEntity += $(form).attr('action');
        }

        console.log('urlDataEntity' + urlDataEntity);

        $.ajax({
            url: urlDataEntity + '/documents',
            type: 'POST',
            data: data,
            dataType: 'json',
            crossDomain: true,
            headers: headers,
            success: function(data) {
                if (data.Id !== '') {
                    $('html, body').animate({ scrollTop: $('.contato-form-wrapper').offset().top -150});
                    $('.form-faleconosco').before('<div class="submit-status success">Sua mensagem foi enviada, obrigado por entrar em contato conosco.</div>');
                    $('.submit-status').slideDown();
                    $('.identity').val(data.Id);
                    $('.form-faleconosco')[0].reset();
                    setTimeout(function(){
                        $('.submit-status').slideUp();
                    },5000);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                if (jqXHR.responseText) {
                    if ($.parseJSON(jqXHR.responseText)) {
                        var errorM = $.parseJSON(jqXHR.responseText).Message;

                        $('html, body').animate({ scrollTop: $('.contato-form-wrapper').offset().top -150});
                        $('.form-faleconosco').before('<div class="submit-status error">' + errorM + '</div>');
                        $('.submit-status').slideDown();
                    }
                }
            }
        });
    };

    contact.DOMReady = function() {
        contact.bindEvents();
        $('input[name="cpf"]').mask("999.999.999-99");
        $('input[name="telnumber"]').mask('99999-999?9');
        $('input[name="celnumber"]').mask('99999-999?9');
    };

    pages.contact = contact;

})(jQuery, window, document);
