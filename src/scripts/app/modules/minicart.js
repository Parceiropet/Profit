(function($, window, document, undefined) {

    'use strict';

    PFTX.modules.minicart = {};

    PFTX.modules.minicart.activeMiniCart = function() {
        $('.icon-cart').hover(function() {
        	$('header .overlay').addClass('active');
        	$('.header__cart-minicart').addClass('active');
            // $('body').css('oveflow', 'hidden');
        });
        $('.header__cart-minicart').mouseleave(function() {
        	$('header .overlay').removeClass('active');
        	$('.header__cart-minicart').removeClass('active');
            // $('body').css('oveflow', 'auto');
        });

        if ($(window).width()) {
            $('.icon-close-cart').on('click', function() {
                $('header .overlay').removeClass('active');
                $('.header__cart-minicart').removeClass('active');
                // $('body').css('oveflow', 'auto');
            });

            $('header .overlay').click(function() {
                $('header .overlay').removeClass('active');
                $('.header__cart-minicart').removeClass('active');
            });
        }
    };

    // Remove item do carrinho
    PFTX.modules.minicart.removeItem = function() {
        $('.removeItem').on('click', function(e) {
        	e.preventDefault();
            var index = $(this).parent().find('ul').data('index');
            var qty = $(this).parent().find('ul').data('qty');

            var itemsToRemove = [
              {
                "index": index ,
                "quantity": qty
              }
            ]

        	// console.log(itemsToRemove);

        	vtexjs.checkout.removeItems(itemsToRemove);

        	PFTX.modules.minicart.bindEvents();
        });
    };

    // Atribuindo eventos
    PFTX.modules.minicart.bindEvents = function() {

        function formatReal( int ) {
            var tmp = int+'';
            tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
            if( tmp.length > 6 )
                    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

            return tmp;
        }

        vtexjs.checkout.getOrderForm().done(function(orderForm) {
            // console.log(orderForm);
            var itemsLength = orderForm.items.length;
            var totalValue = orderForm.value;
            if (itemsLength >= 1) {

                $('.header__cart-minicart').html('');

                var products = [];

                for (var i = 0; i < itemsLength; i++) {
                    var items = orderForm.items[i];
                    var image = items.imageUrl;
                    var name = items.name;
                    var url = items.detailUrl;
                    var price = formatReal(items.price);
                    var qty = items.quantity;
                    var total = formatReal(totalValue);

                    console.log(items);

                    products[i] = '<li><a href="' + url + '">' +
                        '<div class="header__cart-minicart--image"> ' +
                        '<img src="' + image + '" alt="' + name + '"/>' +
                        '</div>' +
                        '<ul class="header__cart-minicart--data" data-index="' + i + '" data-qty="' + qty + '" >' +
                        '<li>' + name + '</li>' +
                        '<li class="header__cart-minicart--data-price">R$ ' + price + '</li>' +
                        '</ul>' +
                        '<p class="removeItem"></p>' +
                        '</a></li>';
                }

                var html = '<div class="header__cart-minicart-content">' +
                    '<div class="header__cart-minicart--minha-sacola">MINHA SACOLA<i class="icon-close-cart"></i></div>' +
                    '<ul class="header__cart-minicart--products">' + products.join('') + '</ul>' +
                    '<ul class="header__cart-minicart--actions">' +
                    '<li><span class="header__cart-minicart--total">Total: <em>R$ '+ total +'</em></span></li>' +
                    '<li><a href="/checkout/#/cart" class="header__cart-minicart--link">IR PARA CHECKOUT</a></li>' +
                    '</ul>' +
                    '</div>';
                $('.header__cart-minicart').append(html);
            } else {

                $('.header__cart-minicart').html('');

                $('.header__cart-minicart').append('<div class="header__cart-minicart--empty"><i class="icon-cart-empty"></i><div class="header__cart-minicart--empty-content"><p>Seu carrinho está vazio.</p></div></div>');
            }

            $('.header__cart--ammount').text(itemsLength);
        });
    };

    PFTX.modules.minicart.removeItem();

    // Inicia o modulo
    PFTX.modules.minicart.init = function() {

        // Adicionando eventos ao modulo
        PFTX.modules.minicart.bindEvents();
    };
})(jQuery, window, document);
