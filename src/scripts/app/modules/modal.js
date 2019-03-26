/*
    Example:

    //Criando o modal
    PFTX.modules.modal.init();

    //Chamando o modal
    var html = ['<span>Olá</span>', '<span>mundo</span>'];  ||  var html = '<span>Olá mundo</span>';
    PFTX.modules.modal.show(html, 'classe_do_seu_modal');

    //Fechando o modal
    PFTX.modules.modal.close();
*/


(function($, window, document, undefined) {

    'use strict';
    PFTX.modules.modal = {};

    PFTX.modules.modal.construct = function() {
        //Criando elementos do modal
        $('.modal_wrapper').length === 0 ? $('body').append('<div class="modal_wrapper"><div class="modal_body"><div class="modal__content"></div></div></div>') :  false;
    };

    PFTX.modules.modal.close = function() {
        var modalWrapper = $('.modal_wrapper');

        $(modalWrapper).fadeOut('slow', function() {
            $(modalWrapper).find('.modal_body').attr('class', 'modal_body');
            $(modalWrapper).find('.modal__content').html('');
        });
        $('#overlay').fadeOut('fast');
        $('html').removeClass('modal-is-open');
    };

    /**
     * [closeEvent description]
     * @param  {[type]} btnArray [description]
     * @return {[type]}          [description]
     */
    PFTX.modules.modal.closeEvent = function (btnArray) {
        if(!btnArray.length) return false;

        $.each(btnArray, function(index, value) {
            $(value).off('click').on('click', function () {
                PFTX.modules.modal.close();
            });
        });
    };

    PFTX.modules.modal.actions = function() {
        $('.modal_wrapper').on('click', function() {
            PFTX.modules.modal.close();
        });
        $('.modal_body').on('click', function(e) {
            e.stopPropagation();
        });

        $(document).keyup(function(e) {
            if (e.keyCode == 27 && $('html').hasClass('modal-is-open')) {
                PFTX.modules.modal.close();
            }
        });
    }

    // Exibindo modal
    PFTX.modules.modal.show = function(content, className) {
        //Resize do modal
        $('#overlay').fadeIn();
        $('html').addClass('modal-is-open');
        var myModal = $('.modal_wrapper');

        if (className) {
            myModal.find('.modal_body').addClass(className).find('.modal__content').empty().append(content);
        } else {
            myModal.find('.modal__content').empty().append(content);
        }

        myModal.fadeIn('fast');
    }

    PFTX.modules.modal.init = function() {
        PFTX.modules.modal.construct();
        PFTX.modules.modal.actions();
    };

})(jQuery, window, document);
