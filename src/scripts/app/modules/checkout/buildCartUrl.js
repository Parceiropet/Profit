(function( $, window, document, undefined ) {

'use strict';

PFTX.modules.checkout = {};

/*
* PFTX.modules.checkout.buildCartUrl(arrayList);
*
* Metodo que monta URL de checkout para produtos com multiplos SKUS
* Recebe um Array como parametro
*/
PFTX.modules.checkout.buildCartUrl = function( products ) {

    var i = 0,
        len = products.length,
        url = "/checkout/cart/add?";

    for (; i < len; i++ ) {
        url += "&sku=" + products[ i ].sku
        + "&qty=" + products[ i ].qty
        + "&seller=" + products[ i ].seller;
    }

    url = url.replace( "&", "" ) + "&sc=1";

    return url;
};

})( jQuery, window, document );