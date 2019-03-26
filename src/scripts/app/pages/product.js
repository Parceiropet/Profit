(function ($, window, document, undefined) {

  'use strict';

  var pages = PFTX.pages,
    product = new PFTX.constructor.page('produto');

  // DESATIVADA
  product.prepareInputQty = function () {

    var arrayItens = [];

    setTimeout(function () {
      $('.sku-selector-container').css('opacity', '1')
    }, 1000);
    // Group the input and label and put the input in front of it
    var $set = $('.group_0').children();
    for (var i = 0, len = $set.length; i < len; i += 2) {
      $set.slice(i, i + 2).wrapAll('<div class="product__input-radio"/>');
    }

    arrayItens = skuJson.skus;

    arrayItens = arrayItens.filter(function (thing, index, self) {
      return index === self.findIndex(function (t) {
        return t.dimensions.Tamanho === thing.dimensions.Tamanho;
      });
    });

    arrayItens.forEach(function (item) {
      //console.log('item', item);
      if (item.available) {
        var itemValue = item.values[0];
        var itemPrice = item.bestPrice;
        var bestPriceFormated = item.bestPriceFormated;
        bestPriceFormated = bestPriceFormated.replace('R$ ', '');
        // console.log(bestPriceFormated);

        var $label = $('input[type=radio][data-value=' + itemValue + ']');
        // console.log($label)
        $label.attr('data-price', itemPrice);
        $label.after('<label>' + itemValue + '</label><div class="item-block"><span class="item-price" data-price="' + bestPriceFormated + '">' + bestPriceFormated + '</span><div class="item-block-wrapper"><span class="less">-</span><input type="number" class="item-number"><span class="more">+</span></div></div>');
      } else {
        var itemValue = item.values["0"];
        var itemPrice = item.bestPrice;
        var bestPriceFormated = item.bestPriceFormated;
        bestPriceFormated = bestPriceFormated.replace('R$ ', '');
        var $label = $('input[type=radio][data-value=' + itemValue + ']');
        // console.log($label)
        $label.after('<label>' + itemValue + '</label><div class="item-block"><span class="item-price">000,00</span><div class="item-block-wrapper disable"><span class="less">-</span><input type="number" class="item-number" disabled><span class="more">+</span></div></div>');
      }
    })



    // Add checked class in input.
    // $('sku-selector-container ul').eq(1).click(function() {
    //     $('.skuselector-specification-label').parent().removeClass('checked');
    //     $(this).parent().addClass('checked');
    // })
  }

  /** DESATIVADA
   * [Quantity events with more and less and change with input typind and also quantity  multiplication and print on the scrren]
   */
  product.qtyMoreLess = function () {
    //Set value 1 as default
    $('.controle-quantidade__val').val('1');

    $('.item-block-wrapper span').click(function () {
      var valInput = $(this).parent().find('.item-number').val();
      var numberStr = $(this).parent().parent().find('.item-price').data('price');
      var numberMult = 0;
      numberStr = numberStr.replace(',', '.');

      valInput = parseInt(valInput);

      if ($(this).hasClass('less') && (valInput > 0)) {
        valInput = valInput - 1;
        $(this).parent().find('.item-number').val(valInput);
        numberMult = valInput * numberStr;
        numberMult = numberMult.toFixed(2);
        numberMult = numberMult.replace('.', ',');

        $(this).parent().parent().find('.item-price').text(numberMult);
        // $(this).parent().parent().parent().find('input').data('qty', numberStr);

      } else if ($(this).hasClass('more')) {
        valInput = valInput + 1;
        $(this).parent().find('.item-number').val(valInput);
        numberMult = valInput * numberStr;
        numberMult = numberMult.toFixed(2);
        numberMult = numberMult.replace('.', ',');
        $(this).parent().parent().find('.item-price').text(numberMult);
      }
    });

    $('.item-block-wrapper').on('keyup', '.item-number', function () {
      var valInput = $(this).parent().find('.item-number').val();
      var numberStr = $(this).parent().parent().find('.item-price').data('price');
      var numberMult = 0;
      numberStr = numberStr.replace(',', '.');

      $(this).parent().find('.item-number').val(valInput);
      numberMult = valInput * numberStr;
      // console.log(numberMult);
      numberMult = numberMult.toFixed(2);
      numberMult = numberMult.replace('.', ',');
      $(this).parent().parent().find('.item-price').text(numberMult);

    })
  }

  /**
   * Contorle de eventos na páginad e produtos
   */
  product.eventsControls = function () {
    // evento em shipping
    $('.contentWrapper .header').click(function () {
      $('.product__info--shipping').addClass('active-shipping');
    })
  }
  /**
   * [Active slider in mobile]
   */
  product.activeSlide = function () {
    if($('.thumbs li').length > 1){
      $('#show #include').remove()
      var imgs = $('.image .thumbs li');

      imgs.each(function (item, element) {
        var b = $(this).find('a img').attr('src');
        var src = b.replace("70-70", "200-200")
        $(this).find('a img').attr('src', src)
      })

      $('.thumbs').slick({
        slide: '.thumbs li',
        dots: false,
        arrows: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1
      });
    }else{
      $('.thumbs').hide();
    }
  }

  product.buyButton = {

    amount: function (newSku, newQty) {

      var $href = $('.buy-button.buy-button-ref').attr('href');

      var sku = $href.split('sku=')[1].split('&')[0];
      var qty = $href.split('qty=')[1].split('&')[0];
      var seller = $href.split('seller=')[1].split('&')[0];
      var salesChannel = $href.split('sc=')[1].split('&')[0];

      sku = newSku;
      qty = newQty;

      // console.log('New sku', sku);
      // console.log('New qty', qty);

      $('.buy-button.buy-button-ref').attr('href', '/checkout/cart/add?sku=' + sku + '&qty=' + qty + '&redirect=true&seller=' + seller + '&sc=' + salesChannel);

      $href = $('.buy-button.buy-button-ref').attr('href');

      // console.log('href', $href );
    },

    event: function () {
      var event = this;

      $('#buy-button-cart').click(function (evt) {
        var href = $('.buy-button.buy-button-ref').attr('href');

        evt.preventDefault();

        var textoAlert = '';

        if (href.indexOf('j') === 0) {
          textoAlert = href.replace('javascript:alert(', '');
          textoAlert = textoAlert.replace("'", '');
          textoAlert = textoAlert.replace("')", '');
          alert(textoAlert);

          return
        }

        window.location = href;
      });

      $('.fakesku__item-opcao input[type="radio"]').on('change', function () {
        //console.log('clicou');
        var $this = $('.fakesku__item-opcao input[type="radio"]:checked');


        var skuSelected = $this.data('sku');
        var qtd = $this.parents('.fakesku__item').find('.controle-quantidade__val').val();

        event.amount(skuSelected, qtd);

        $('.fakesku__item').removeClass('item-selected').parents('li').removeClass('selected');
        $this.parents('.fakesku__item').addClass('item-selected').parents('li').addClass('selected');

        // console.log('skuSelected', skuSelected);

      });

			$('body').on('click', '.fakesku__item', function() {
				$(this).find('input[type=radio]')[0].checked = true
				$(this).find('input[type=radio]').trigger('change')
			})
    },

    init: function () {
      this.event();
    }

  }

    product.addToGiftList = function () {

		window.SendData = function(url, postData, callback) {
			var sku = $('li.selected input[type=radio]').attr('data-sku')
			var qtd = $('li.selected input[type=text]').val()
			postData.CheckedItems[0] = sku + '-' + qtd;

			console.log(postData.CheckedItems);

            if (!AddToListCheckSelected()) {
                return;
            }

            $.ajax({
                type: "POST",
                url: url,
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                data: ko.toJSON(postData),
                success: function (data) {
                    if (typeof data !== "undefined") {
                        callback(data);
                    }
                },
                error: function (error) {
                    $('.list-form-box').html(error.responseText);
                    $('.glis-submit').removeClass('clicked');
                }
            });
        }

		var loop = setInterval(function() {

			if ($('#TB_ajaxContent .list-popup').length === 0) {
				var listName = $('.glis-submit.glis-submit-list').text();
		    var listLink = $('.glis-submit.glis-submit-list').text().trim().toLowerCase().replace(/\s/g,"");
				var html = '<div class="list-popup">' +
					'<strong class="list-popup__title">Produto Adicionado á sua lista:</strong>' +
					'<span class="list-popup__list-name">' + listName + '</span>' +
					'<div class="list-popup__buttons">' +
					'<a href="#" class="list-popup__continuar">CONTINUAR ADICIONANDO</a>' +
					'<a href="/list/' + listLink + '" class="list-popup__ver-lista">VER LISTA</a>' +
					'</div>' +
					'</div>';

				$('#TB_ajaxContent .giftlist-insertsku').append(html);
				setTimeout(function(){
					$('.glis-submit-list').click();
				}, 500)

				$('.list-popup__continuar').on('click', function (e) {
					e.preventDefault();
					$('#TB_closeWindowButton').click();
				});
				$('#TB_overlay').show();
			}

		},500);

        $('.glis-submit-list').click();

    };

  product.getFromMasterData = function () {

      vtexjs.checkout.getOrderForm().then(function (data) {
          if(data.loggedIn || (data.clientProfileData && data.clientProfileData.email)) {
              var email = data.clientProfileData.email;
              var apiUrl = '/parceiropet/dataentities/CL/search/?ong=true&email='+email+'&_fields=email,ong';

              $.ajax({
                "headers": {
                  "Accept": "application/vnd.vtex.ds.v10+json",
                  "Content-Type": "application/json"
                },
                "url": apiUrl,

                "crossDomain": true,
                "type": "GET"
            }).success(function (data) {
                if(data.length > 0) $('.product__info--gift-list').show();
            })
          }
      })
  };

  product.newInstallments = 0;

  /**
   * 	custom quantity controller
   */
  product.qtyController = function () {
    console.log('quantityControl');
    $('.product__info--similares li').each(function () {
      var $obj = $(this);

      // console.log('index', index);


      var btnUp = $obj.find('.controle-qt-plus');
      var btnDown = $obj.find('.controle-qt-minus');
      var max = $obj.find('.controle-quantidade__val').attr('max');
      var min = $obj.find('.controle-quantidade__val').attr('min');
      var stockLimit = false;
      btnUp.on('click', function () {
        console.log('clicou para aumentar');
        var input = $(this).prev('.controle-quantidade__val');

        var oldValue = parseFloat(input.val());
        var newVal = '';

        if (oldValue < max) {
          newVal = oldValue + 1;
        } else {
          newVal = oldValue;
        }

        input.val(newVal);
        console.log(input);
        console.log(newVal);

        // Atualiza a qtd produto
        var sku = $(this).parents('.fakesku__item').find('.fakesku__item-opcao input[type="radio"]');

        product.buyButton.amount(sku.data('sku'), newVal);

        var newPrice = $(this).parents('.fakesku__item ').find('.fakesku__item-preco').text().split('R$')[1].trim().replace(',', '.') * newVal;

        //console.log(newPrice);
        // var newInstallments = 0;
        product.getInstallments(newPrice).then(function (data) {

          var data = data.replace(/[\(\B\)\b]/g, '');
          data = JSON.parse(data);
          data = data[0];

          //console.log(data);
          product.newInstallments = 1;
          $.each(data.installments, function (index, item) {

            if (product.newInstallments < item.options.length) {
              product.newInstallments = item.options.length;
            }
          })
        }).then(function () {
          var installmentValue = newPrice / product.newInstallments;
          $('.skuBestPrice, .skuBestInstallmentValue').text("R$ " + newPrice.toFixed(2).toString().replace('.', ','));
          var price = $('.skuBestPrice').text();
          window.localStorage.setItem('PFTX.valueTotal', price);
          $('.modal-assinatura__total-value').text(price);
          $('.skuBestInstallmentValue').text("R$ " + installmentValue.toFixed(2).toString().replace('.', ','));
          $('.skuBestInstallmentNumber').text(product.newInstallments + 'x');
          // console.log("$('.controle-quantidade__val').val()", $('.controle-quantidade__val').val());
          // console.log('skuJson_0.skus[0].availablequantity', skuJson_0.skus[0].availablequantity);

          // Mostra o alert quando o limite de estoque é alcançado.
          if ($obj.find('.controle-quantidade__val').val() == skuJson_0.skus[0].availablequantity && stockLimit === false) {
            stockLimit = true;
          } else if ($obj.find('.controle-quantidade__val').val() == skuJson_0.skus[0].availablequantity && stockLimit === true) {
            alert('A quantidade selecionada não está disponível.');
          }
        });

      });

      btnDown.on('click', function () {
        console.log('clicou para deminuir');
        var input = $(this).next('.controle-quantidade__val');

        var oldValue = parseFloat(input.val());
        var newVal = '';

        if (oldValue > min) {
          newVal = oldValue - 1;
        } else {
          newVal = oldValue;
        }

        input.val(newVal);

        // Atualiza a qtd produto
        var sku = $(this).parents('.fakesku__item').find('.fakesku__item-opcao input[type="radio"]');

        product.buyButton.amount(sku.data('sku'), newVal);

        var newPrice = $(this).parents('.fakesku__item ').find('.fakesku__item-preco').text().split('R$')[1].trim().replace(',', '.') * newVal;

        // console.log(newPrice, newVal);

        product.getInstallments(newPrice).then(function (data) {

          var data = data.replace(/[\(\B\)\b]/g, '');
          data = JSON.parse(data);
          data = data[0];

          //console.log(data);
          product.newInstallments = 1;
          $.each(data.installments, function (index, item) {

            if (product.newInstallments < item.options.length) {
              product.newInstallments = item.options.length;
            }
          })
        }).then(function (data) {

          var installmentValue = newPrice / product.newInstallments;
          $('.skuBestPrice, .skuBestInstallmentValue').text("R$ " + newPrice.toFixed(2).toString().replace('.', ','));
          var price = $('.skuBestPrice').text();
          window.localStorage.setItem('PFTX.valueTotal', price);
          $('.modal-assinatura__total-value').text(price);
          $('.skuBestInstallmentValue').text("R$ " + installmentValue.toFixed(2).toString().replace('.', ','));
          $('.skuBestInstallmentNumber').text(product.newInstallments + 'x');

        });

      });
    });
  };

  product.getInstallments = function (value) {

    return $.ajax({
      url: "https://cs-profite-com-br.umbler.net/vtex-curl/get.php",
      accepts: 'application/json',
      // dataType: 'jsonp',
      // jsonp: "callback",
      // type: 'GET',
      crossDomain: true,
      data: {
        url: 'https://parceiropet.vtexpayments.com.br/api/pvt/installments?request.value=' + value + '&request.salesChannel=1',
        accept: 'application/json',
      }
    });
  }

  product.hideEmptyComponents = function () {
    var buyTogether = $('#divCompreJunto').children().length;

    // console.log(buyTogether, caracteristicas);

    if (!buyTogether) {
      $('#divCompreJunto').parents('.product__block').addClass('component-is-empty');
    }

    if (!caracteristicas) {
      $('#caracteristicas').parents('.product__block').addClass('component-is-empty');
    }
  }

  product.amountSkus = function () {

    var itemSku = $('.product__info--similares li');

    if (itemSku) {

      // var anterior = 0;
      // var current = 0;
      itemSku.each(function () {
        var $this = $(this);

        var $inputSku = $this.find('.fakesku__item-opcao input');
        var id = $inputSku.attr('id');
        // console.log('id', id);

        // console.log('itemID', itemID);

        vtexjs.catalog.getProductWithVariations(id).then(function (obj) {
          // console.log(obj);
          var $obj = obj.skus["0"];

          var sku = $obj.sku;
          var image = $obj.image;
          var qtdMax = $obj.availablequantity;

          $inputSku.attr('data-sku', sku)
            .attr('data-img', image)

          //console.log(qtdMax)

          $this.find('.controle-quantidade__val').attr('max', qtdMax);

          //console.log('obj', obj);
        });
      });

    }
  };

  product.imageZoomControl = function (sku) {
    return $.ajax({
      url: "https://cs-profite-com-br.umbler.net/vtex-curl/get.php",
      accepts: 'application/json',
      dataType: 'jsonp',
      jsonp: "callback",
      type: 'GET',
      crossDomain: true,
      data: {
        url: 'http://parceiropet.vtexcommercestable.com.br/api/catalog_system/pvt/sku/stockkeepingunitbyid/' + sku,
        accept: 'application/json',
      }
    })
    // $('.product__wrapper.image .apresentacao').append(show);
  }

  /**
   * Evento ao selecionar SKU
   */
  product.skuSelectionEvents = function () {
    $('.fakesku__item-opcao input[type="radio"]').on('change', function () {
      var $this = $(this);

      /**
       * Monta o Zoom da página de produto.
       */
      product.imageZoomControl($this.data('sku')).then(function (response) {
        var images = response[0].Images;
        //console.log(response);
        $('#show').remove(); // Remove o zoom Vtex

        /**
         * Monta o HTML com as imagens retornadas pela API
         */
        var html = '<div id="show">' +
                      '<div id="include" class="easyzoom">' +
                        '<a data-standard="' + images[0].ImageUrl + '" href="' + images[0].ImageUrl + '">' +
                          '<img src="' + images[0].ImageUrl + '">' +
                      '</div>' +
                      '<ul class="thumbs">' +
                      '</ul>' +
                    '</div>';
                    $('.apresentacao').append(html);
                    images.forEach(function name(image) {
                      html = '<li>' +
                                '<a href="' + image.ImageUrl + '" data-standard="' + image.ImageUrl + '">' +
                                  '<img src="' + image.ImageUrl + '">' +
                                '</a>' +
                              '</li>';
                      $('#show').find('.thumbs').append(html)
                    });
      }).then(function () {
        /**
         * Aplica o easyzoom no HTML montado
         */
        var $easyzoom = $('.easyzoom').easyZoom({
          loadingNotice: 'Carregando imagem...',
          preventClicks: true,
        });
        // Setup thumbnails
        var api1 = $easyzoom.filter('.easyzoom').data('easyZoom');

        $('.thumbs').on('click', 'a', function(e) {
          var $this = $(this);

          e.preventDefault();

          // Use EasyZoom's `swap` method
          api1.swap($this.data('standard'), $this.attr('href'));
        });
      });
      // Fim do zoom

      var name = $this.val();
      var img = $this.data('img');
      var $elmPrice = $this.parents('.fakesku__item').find('.fakesku__item-preco').text().trim();

      $('.productName').text(name);

      $('.productDescription').html($this.parents('li').find('.fakesku__item-description').html())
      $('.skuBestPrice, .skuBestInstallmentValue').text($elmPrice);

      /**
       * Recalcula o parcelamento no change do sku
       */
      var newPrice = $(this).parents('.fakesku__item').find('.fakesku__item-preco').text().split('R$')[1].trim().replace(',', '.')
      //console.log('newPrice Change', newPrice);
      newPrice = parseFloat(newPrice) * parseInt($this.parents('.fakesku__item').find('.controle-quantidade__val').val());
      product.getInstallments(newPrice).then(function (data) {
        var data = data.replace(/[\(\B\)\b]/g, '');
        data = JSON.parse(data);
        data = data[0];

        //console.log('OKOK', data);
        product.newInstallments = 1;
        $.each(data.installments, function (index, item) {

          if (product.newInstallments < item.options.length) {
            product.newInstallments = item.options.length;
          }
        })
      }).then(function () {
        var installmentValue = newPrice / product.newInstallments;

        $('.skuBestPrice, .skuBestInstallmentValue').text("R$ " + newPrice.toFixed(2).toString().replace('.', ','));
        $('.skuBestInstallmentValue').text("R$ " + installmentValue.toFixed(2).toString().replace('.', ','));
        $('.skuBestInstallmentNumber').text(product.newInstallments + 'x');
      });

    });
  }
  product.skuImageMobile = function(){
    if(skuJson.available == false){
      var sku = skuJson.skus[0].sku;
    }else{
      var sku = $('.fakesku__item-opcao input[type="radio"]:checked').data('sku');
    }
    product.imageZoomControl(sku).then(function (response) {
        var images = response[0].Images;
        console.log(response);
        $('#show').remove(); // Remove o zoom Vtex

        /**
         * Monta o HTML com as imagens retornadas pela API
         */
        var html = '<div id="show">' +
                      '<div id="include" class="easyzoom">' +
                        '<a data-standard="' + images[0].ImageUrl + '" href="' + images[0].ImageUrl + '">' +
                          '<img src="' + images[0].ImageUrl + '">' +
                      '</div>' +
                      '<ul class="thumbs">' +
                      '</ul>' +
                    '</div>';
                    $('.apresentacao').append(html);
                    images.forEach(function name(image) {
                      html = '<li>' +
                                '<a href="' + image.ImageUrl + '" data-standard="' + image.ImageUrl + '">' +
                                  '<img src="' + image.ImageUrl + '">' +
                                '</a>' +
                              '</li>';
                      $('#show').find('.thumbs').append(html)
                    });
      })
  }
  product.makeProductSku = function () {
    var $obj = skuJson.skus["0"];
    var name = $('.productName').text();
    var id = skuJson.productId;
    var description = $('.productDescription').html();
    var sku = $obj.sku;
    var img = $obj.image;
    var price = $obj.bestPriceFormated;
    var maxQtd = $obj.availablequantity;

    // console.log('price', price);


    if ($obj.available) {
      // add product on list sku
      var htmlSku = [
        '<li class="selected">',
        '<div class="fakesku__item item-selected" title="' + name + '">',
        '<span class="fakesku__item-opcao">',
        '<input type="radio" name="sku" id="' + id + '" value="' + name + '" data-sku="' + sku + '" data-img="' + img + '" checked="true">',
        '<label for="' + id + '"></label>',
        '</span>',
        '<span class="fakesku__item-name">' + name + '</span>',
        '<span class="fakesku__item-description" style="display:none">' + description + '</span>',
        '<span class="fakesku__item-preco">' + price + '</span>',
        '<span class="fakesku__item-quantidade">',
        '<div class="controle-quantidade">',
        '<button class="controle-quantidade__btn controle-qt-minus">-</button>',
        '<input type="text" name="controle quantidade" class="controle-quantidade__val" value="1" min="1" max="' + maxQtd + '">',
        '<button class="controle-quantidade__btn controle-qt-plus">+</button>',
        '</div>',
        '</span>',
        '</div>',
        '</li>',
      ].join("");

      // console.log(htmlSku);

      if ($('.product__info--similares ul').length) {
        $('.product__info--similares ul').prepend(htmlSku);
        product.orderSku();

      } else {
        $('.product__info--similares').html('<ul>' + htmlSku + '</ul>');
      }

      $('.product__info--similares ul li').each(function(index, el) {
        if($(this).is(':hidden')){
          $(this).remove();
        }
      });
    } else {
      /**
       * pega o id do sku[0] e chama a funcao que monta o avise-me
       */
      var skuId = skuJson.skus[0].sku;
      product.buildNotifyme(skuId);
    }
    $('.product__wrapper.info').addClass('ready')

    var getProductInfo = function(path, $elem) {
        $.get('/api/catalog_system/pub/products/search/'+ path).then(function(data){
            $elem.find('.fakesku__item-description').html(data[0].description)
        });
    }

    // Carrega as descrições de cada similar
    $('.fakesku__item[rel]').each(function(){
        var path = $(this).attr('rel').split(location.host).reverse()[0]
        getProductInfo(path, $(this))
    })
    product.amountSkus();
  };

  /**
   * Monta o HTML do Avise-me e o envio do mesmo
   * @param {Integer} skuId
   */
  product.buildNotifyme = function (skuId) {
    var skuId = skuId;
    var notifyme = '<div class="notifyme">' +
      '<strong class="notifyme__title">Produto Esgotado - Avise-me</strong>' +
      '<p class="notifyme__text">Este produto está fora de estoque no momento. Preencha os campos a baixo para ser avisado sobre a disponibilidade.</p>' +
      '<form class="notifyme__form">' +
      '<input type="text" name="name" class="notifyme__nome" placeholder="Digite seu Nome" required>' +
      '<input type="email" name="email" class="notifyme__email" placeholder="Digite seu Email" required>' +
      '<input type="hidden" name="skuId" class="notifyme__skuid" value="' + skuId + '">' +
      '<button class="notifyme__btn-avise-me">Avise-me</button>' +
      '</form>' +
      '</div>';
    $('.product__wrapper-box').html('');
    $(document).ajaxStop(function () {
      $('#buy-button-cart').addClass('inactive'); // Coloca o buy-button como inativo.
      $('#buy-button-cart').unbind('click'); // Remove eventos de click do buy-button como inativo.
      $('#buy-button-cart').removeAttr('href'); // Remove qualquer link do buy-button
    });
    $('.product__wrapper-box').append(notifyme); // coloca o html do avise-me no target

    /**
     * atribue evento de submit ao form do avise-me
     */
    $('.notifyme__form').submit(function (e) {
      e.preventDefault();
      var data = {
        notifymeClientName: '',
        notifymeClientEmail: '',
        notifymeIdSku: '',
      }
      data.notifymeClientName = $(this).find('input[name="name"]').val();
      data.notifymeClientEmail = $(this).find('input[name="email"]').val();
      data.notifymeIdSku = $(this).find('input[name="skuId"]').val();

      /**
       * Faz o Post dos dados do formulario do avise-me para VTEX
       */
      $.post('/no-cache/AviseMe.aspx', data).success(function (data) {
        if (data) {
          $('.product__wrapper-box').html('<strong class="notifyme-success">Dados cadastrados com sucesso.</strong>');
        } else {
          alert('Erro ao enviar cadastro, tente novamente.');
        }
      });
    });
  }
  product.salvaPrecoSku = function(){
    var currentValue = $('.item-selected').find('.fakesku__item-preco').text();
    var currentTotal = $('.productPrice').find('.skuBestPrice').text();
    window.localStorage.setItem('PFTX.valueInput', currentValue);
    window.localStorage.setItem('PFTX.valueTotal', currentTotal);
    $('.fakesku__item-opcao input[type="radio"]').change(function() {
      var valor = $(this).parent().parent().find('.fakesku__item-preco').text();
      var valorTotal = $('.productPrice').find('.skuBestPrice').text();
      window.localStorage.setItem('PFTX.valueInput', valor);
      window.localStorage.setItem('PFTX.valueTotal', valorTotal);
    });
  }
  product.recorrencia = function () {
    //Busca se produto tem recorrencia
    function retrieveRecurrenceData() {
      try {
        $.getJSON('/api/catalog_system/pub/products/search/' + location.pathname).then(function (data) {
          if (typeof data[0].items[0].attachments !== 'undefined') {
            var attachments = {
              domainValues: JSON.parse(data[0].items[0].attachments[0].domainValues)[0].DomainValues.split(','),
              fieldName: JSON.parse(data[0].items[0].attachments[0].domainValues)[0].FieldName
            }
            //console.log('attachments', attachments);

            attachments.domainValues.forEach(function (item) {
              //console.log('item busca reccorencia', item)
              mountRecurrenceModal(item);
            });
            $('.product__info--sign').show();
          } else {}
        });
      } catch (error) {
        console.error("Não foi possivel buscar a recorrencia: ", error);
      }
    }

    function mountRecurrenceModal(item) {
      var html = '<li class="modal-assinatura__periodicidade-item">' +
        '<a href="#" class="modal-assinatura__periodicidade-link">' + item + '</a>' +
        '</li>';
      if ($('.modal-assinatura__periodicidade-list').length) {
        $('.modal-assinatura__periodicidade-list').append(html);
      }
      //var valUdn = window.localStorage.getItem('PFTX.valueInput')
      //var valTotal = $('.productPrice').find('.skuBestPrice').text();
      //$('.modal-assinatura__und-value').text(valUdn);
      //$('.modal-assinatura__total-value').text(valTotal);
    }

    function quantityControl() {
      $('body').on('click', '.modal-assinatura .controle-qt-plus', function (e) {
        $('.item-selected').find('.controle-qt-plus').trigger('click');
        // var valTotal = window.localStorage.getItem('PFTX.valueTotal');
        // $('.modal-assinatura__total-value').text(valTotal);
        var valor = $('.item-selected').find('.controle-quantidade__val').val();
        $('.modal-assinatura .controle-quantidade__val').val(valor)
      });
      $('body').on('click', '.modal-assinatura .controle-qt-minus', function (e) {
        $('.item-selected').find('.controle-qt-minus').trigger('click');
        // var valTotal = window.localStorage.getItem('PFTX.valueTotal');
        // $('.modal-assinatura__total-value').text(valTotal);
        var valor = $('.item-selected').find('.controle-quantidade__val').val();
        $('.modal-assinatura .controle-quantidade__val').val(valor)
      });
    }

    function recurrenceSelection() {
      $('body').on('click', '.modal-assinatura__periodicidade-item', function (e) {
        e.preventDefault();
        $('.modal-assinatura__periodicidade-item').removeClass('active');
        $(this).addClass('active');
        var value = $(this).find('a').text().trim();
        var newDate = calculateDeliveryDate(value);
        $('.modal-assinatura__entrega-data').text(newDate);
      });
    }

    /**
     * Add Days in a Date formated as dd/mm/yyyy
     * @param {String} date - Format dd/mm/yyyy
     * @param {Integer} days - Quantity of days to add
     */
    function addDays(myDate, days) {
      var mydateStr = myDate;
      var mydatematch = mydateStr.match(/(\d+)\/(\d+)\/(\d+)/);
      var mydate = new Date(mydatematch[3], mydatematch[2] - 1, mydatematch[1]);

      var mynewdate = new Date();
      mynewdate.setTime(mydate.getTime() + days * 24 * 60 * 60 * 1000); // in miiliseconds
      return mynewdate.toLocaleDateString();
    }

    /**
     * Calucluate the Delivery Date
     */
    function calculateDeliveryDate(value) {
      var days = 0;;
      switch (value) {
        case "1 semana":
          days = 7;
          break;
        case "2 semanas":
          days = 14;
          break;

        case "3 semanas":
          days = 21;
          break;

        case "1 mês":
          days = 30;
          break;

        case "2 meses":
          days = 60;
          break;

        case "3 meses":
          days = 90;
          break;
        case "6 meses":
          days = 180;
          break;

        default:
          days = 1;
          break;
      }

      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth() + 1; //January is 0!

      var yyyy = today.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }
      if (mm < 10) {
        mm = '0' + mm;
      }
      var today = dd + '/' + mm + '/' + yyyy;

      var deliveryDate = addDays(today, days);

      return deliveryDate
    }

    function addToCartWithRecurrence() {
      var skuId = $('.item-selected').find('input[type="radio"]').data('sku');
      var quantity = parseInt($('.item-selected').find('.controle-quantidade__val').val());
      var item = {
        id: skuId,
        quantity: quantity,
        seller: '1'
      };
      vtexjs.checkout.addToCart([item], null, jssalesChannel)
        .done(function (orderForm) {
        }).then(function () {
          vtexjs.checkout.getOrderForm().then(function (orderForm) {
            var itemIndex;
            orderForm.items.forEach(function (item, index) {
              if (item.id == skuId) {
                itemIndex = index;
              }
            });

            var peridoSelecionado = $('.modal-assinatura__periodicidade-item.active').find('.modal-assinatura__periodicidade-link').text();
            vtexjs.checkout.addItemAttachment(itemIndex, "Recorrência", {
                "Período": peridoSelecionado
              }, null, false)
              .then(function (res) {
                if (!res) {
                  console.error("Erro ao adicionar attachment", err);
                } else {
                  window.location = '/checkout/#/cart';
                }
              });
          });
        });
    }

    function bindEvents() {
      $('.product__info--sign-btn').on('click', function (e) {
        e.preventDefault();
        var valor = $('.item-selected').find('.controle-quantidade__val').val();
        $('.modal-assinatura .controle-quantidade__val').val(valor)
        var valUdn = window.localStorage.getItem('PFTX.valueInput');
        var valTotal = window.localStorage.getItem('PFTX.valueTotal');
        $('.modal-assinatura__und-value').text(valUdn);
        $('.modal-assinatura__total-value').text(valTotal);
        $('.modal-assinatura').fadeIn('slow');
        $('.overlay').addClass('active');
        $('.modal-assinatura__periodicidade-item').eq(0).trigger('click');
      });
      $('.modal-assinatura__close, .modal-assinatura__continuar-comprando').on('click', function (e) {
        e.preventDefault();
        $('.modal-assinatura').fadeOut('slow');
        $('.overlay').removeClass('active');
      });

      quantityControl();
      recurrenceSelection();

      $('body').on('click', '.modal-assinatura__finalizar-assinatura', function (e) {
        //window.localStorage.setItem('PFTX.valueInput', '');
        e.preventDefault();
        addToCartWithRecurrence();
      });
    }

    function init() {
      retrieveRecurrenceData();
      bindEvents();
    }
    init();
  };

  product.orderSku = function(){

    /* Adiciona preços em array */
    var skuprices = [];
    $( ".fakesku  > ul > li" ).each(function( index ) {
      var atualprice = $(this).find('.fakesku__item-preco').text().replace("R$",'').replace(",", ".");
      atualprice = parseFloat(atualprice);
      skuprices.push(atualprice);
      $(this).hide();
    });

    skuprices.sort(function(a, b){return a-b});


    /* Verifica preços em ordem */
    var i;
    for (i = 0; i < skuprices.length; i++) {
        var preco = skuprices[i];

        $( ".fakesku  > ul > li" ).each(function( index ) {
        var atualprice = $(this).find('.fakesku__item-preco').text().replace("R$",'').replace(",", ".");
        atualprice = parseFloat(atualprice);
        if(atualprice == preco){
          $(this).clone().appendTo('.fakesku ul').show();
        }

        });
    }

  }

  product.DOMReady = function () {

    product.hideEmptyComponents();

    product.makeProductSku();

    if(window.innerWidth <= 736){
      product.activeSlide();
    }

    var skuSimilares = skuJson.skus.length == 1;

    if (skuSimilares) {
      $('body').addClass('one-sku');
        product.skuSelectionEvents();
      if(window.innerWidth <= 736){
        product.skuImageMobile();
      }
    }



    product.getFromMasterData();

    $(document).one('ajaxStop', function () {
      product.qtyController();
			product.addToGiftList();
    });

    if (window.innerWidth <= 736) {
      // Evento de ver mais
      $('.product__info--informations-more').click(function () {
        $('.product__info--informations').toggleClass('open');
      });

      //product.activeSlide();

      // Troca itens de lugar
      $('.product__info--rating').insertAfter('.product__wrapper.image');
      $('.product__info--informations').insertAfter('.product__wrapper.info');
    }

    window.addEventListener("resize", function () {
      if (window.innerWidth <= 736) {

        // Troca itens de lugar
        $('.product__info--rating').insertAfter('.product__wrapper.image');
        $('.product__info--informations').insertAfter('.product__wrapper.info');

        //product.activeSlide();

      } else {
        // Troca itens de lugar
        $('.product__info--rating').insertAfter('.product__info--name');
        $('.product__info--informations').insertAfter('.product__info--rating');
      }
    })

    $('#notifymeClientName').remove();

    product.buyButton.init();
    // product.prepareInputQty();
    // product.qtyMoreLess();

    // Slick das prateleiras
    $('.prateleira-assinatura ul').slick({
      slide: 'li',
      arrows: true,
      slidesToShow: 5,
      dots: false,
      infinite: true,
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: true,
          slidesToShow: 2,
          slideToScroll: 2,
        }
      }]
    });

    // product.eventsControls();
    // if (window.location.host === "parceiropet.vtexcommercestable.com.br") {
    product.salvaPrecoSku();
    product.recorrencia();
    // }
    if (window.innerWidth <= 736) {
      // Abri as especificações
      $('#caracteristicas tr th').click(function () {
        $(this).parent().find('td').toggleClass('active');
      });
    }

    // Burlando possiveis erros de requisição
    window.ajaxStopReady = false;
    setTimeout(function(){
        if(!window.ajaxStopReady) $(document).trigger('ajaxStop')
    }, 7000)

		$( document ).ajaxStart(function() {
			window.ajaxStopReady = false;
			console.log('ajaxStart');
	    setTimeout(function(){
	        if(!window.ajaxStopReady) $(document).trigger('ajaxStop')
	    }, 5000)
		})

  };

  product.ajaxStop = function () {
      window.ajaxStopReady = true
    $(".aviso-resenha").text(function () {
        return $(this).text().replace('www.lojaexemplo.com.br', 'www.parceiropet.com ');
      });​​​​​
    if ($('.giftlist-insertsku').length > 1) {
      $('#TB_window, #TB_overlay').fadeOut('fast');
    }

    $('.freight-zip-box').attr('placeholder', "Digite seu CEP");
    $('.freight-btn').attr('value', 'calcular');

    product.eventsControls();
    if(window.innerWidth <= 736){
      product.activeSlide();
      $('#calculoFrete h2').click()
    }
  };

  pages.product = product;

})(jQuery, window, document);
