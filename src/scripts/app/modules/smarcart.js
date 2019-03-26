/*
Exemplo de chamada padrão:
    var smartCart = new PFTX.modules.smartCart().init();
Exemplo de chamada com função definida para executar apenas no ambiente VTEX:
    var smartCart = new PFTX.modules.smartCart({
                        target: '.myClass'
                    }).init();
*/

(function($, window, document, undefined) {

    'use strict';

    var modules = PFTX.modules;

    function smartCart(_config){
        this.config = {
            target : '.header__minicart',
            cartTitle: 'Sua Sacola',
            payments: 7,
            btnGoToCheckout: true
        };

        $.extend(this.config, _config);
    };

    smartCart.prototype.bindEvents = function() {
        this.buildCart();
        var _that = this;

        $(this.config.target).on('click', '.smartCart__item--remove', function(event){
            event.preventDefault();
            var el = this;
            vtexjs.checkout.getOrderForm().then(function(orderForm){
                var item = orderForm.items[0];
                item.index = $(el).data('index');
                return vtexjs.checkout.removeItems([item]);
            }).done(function(orderForm){
                $('.smartCart').remove();
            });
        });
    };

    smartCart.prototype.buildCart = function() {
        var items = vtexjs.checkout.orderForm.items;

        if(items.length == 0) {
            $(this.config.target).append('<div class="smartCart cart-empty"><div class="smartCart__close"></div><p class="smartCart__message">Sua sacola está vazia</p></div>');
        }
        else {
            var html = '<div class="smartCart">';
            html += '<a href="#" class="smartCart__close"></a>';
            html += '<h4 class="smartCart__title">'+this.config.cartTitle+'</h4>';
            html += '<ul class="smartCart__list">';

            var img,name,link,price,quantity,itemIndex;
            for(var i = 0; i < items.length; i++) {
                img = items[i].imageUrl;
                name = items[i].name;
                link = items[i].detailUrl;
                price = items[i].formattedPrice;
                quantity = items[i].quantity;
                itemIndex = i;

                html += '<li class="smartCart__item"><a class="smartCart__item--link" href="'+link+'" title="'+name+'">';
                html += '<figure class="smartCart__item--image"><img src="'+img+'" alt="'+name+'" /></figure>';
                html += '<span class="smartCart__item--info">';
                html += '<span class="smartCart__item--name">'+name+'</span>';
                html += '<span class="smartCart__item--price">'+price+'</span>';
                html += '<span class="smartCart__item--quantity">'+quantity+'</span>';
                html += '<span class="smartCart__item--action"><span href="#" class="smartCart__item--remove" data-index="'+itemIndex+'">Remover</span></span>';
                html +='</span>';
                html += '</a></li>';
            }
            html += '</ul>';
            html += '<div class="smartCart__footer">';
            html += '<ul class="smartCart__footer--payments">';
            for(var i = 0; i < this.config.payments; i++) {
                html += '<li class="smartCart__footer--payment"></li>';
            }
            html += '</ul>';
            var total = vtexjs.checkout.orderForm.value.toString();
            total = 'R$ '+total.slice(0,-2)+','+total.slice(-2);
            html += '<span class="smartCart__footer--total">Subtotal: <strong>'+total+'</strong></span>';
            html += '</div>';
            if(this.config.btnGoToCheckout)
                html += '<a href="/checkout/#/cart" class="smartCart__goToCheckout" title="Checkout">Fechar Pedido</a>';
            html += '</div>';

            $(this.config.target).append(html);
        }
    };

    smartCart.prototype.init = function() {
        this.bindEvents();
    };

    modules.smartCart = smartCart;

})(jQuery, window, document);
