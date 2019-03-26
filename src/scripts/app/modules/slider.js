(function($, window, document, undefined) {

    'use strict';

    var modules = PFTX.modules;

    function slider(_config){
        this.config = {
            target: '#pftx-slider',
            dots: true,
            arrows: true
        };

        $.extend(this.config, _config);
    };

    var imgs,altImg;
    var skuList = {};

    slider.prototype.bindEvents = function() {
        var _that = this;
        // Events touch
        $(_that.config.target).on('swr',function(){
            slider.prototype.prevImg(_that);
        });
        $(_that.config.target).on('swl',function(){
            slider.prototype.nextImg(_that);
        });

        $(_that.config.target)
            .on('click','.arrow-r',function(){
                slider.prototype.nextImg(_that);
            })
            .on('click','.arrow-l',function(){
                slider.prototype.prevImg(_that);
            });
        $('.dimension-Cor').on('click',function(){
            var cor = $(this).text();
            _that.request(skuList[cor]);
            $(_that.config.target).html('');
            _that.prepare();
        });
    };

    slider.prototype.prepare = function() {
        if(this.config.arrows) {
            $(this.config.target)
                .append('<span class="arrow arrow-l"></span><span class="arrow arrow-r"></span>');
        }
        if(this.config.dots) {
            $(this.config.target)
                .append('<span class="dots"></span>');
        }
        // Percorre os skus do produto para guardar um de cada cor
        for (var i = 0; i < skuJson_0.skus.length; i++) {
            skuList[skuJson_0.skus[i].values["0"]] = skuJson_0.skus[i].sku;
        }
        console.log(skuList);
    };

    slider.prototype.request = function(idProduct) {
        var _that = this;
        if(idProduct == undefined)
            var idProduct = skuJson_0.skus[0].sku;
        // return imgs
        $.ajax({
            url: "/produto/sku/"+idProduct,
            type:'GET',
            dataType: "json",
            success: function(data){
                console.log(data);
                imgs = data[0].Images;
                altImg = data[0].Name;

                _that.montaSlider();
            }
        });
    };

    slider.prototype.montaSlider = function() {
        // Cria os dots
        if(this.config.dots) {
            var $d = $(this.config.target).find('.dots');
            for(var i = 0; i < imgs.length; i++) {
                if(i == 0)
                    $d.append('<i class="dot-item active"></i>');
                else
                    $d.append('<i class="dot-item"></i>');
            }
        }
        // Lista as imagens
        $(this.config.target).append('<ul class="slider-images"></ul>');
        var $list = $(this.config.target).find('.slider-images');
        var maxWidth = $(this.config.target).width();

        $list.css('width',(imgs.length * 100)+'%');
        for(var i = 0; i < imgs.length; i++) {
            if(i == 0) {
                $list.append('<li class="slider-images__item active" style="width:'+maxWidth+'px"><img src="'+imgs[i][0].Path+'" alt="'+altImg+'" data-image="'+i+'"/></li>');
            }
            else {
                $list.append('<li class="slider-images__item" style="width:'+maxWidth+'px"><img src="'+imgs[i][0].Path+'" alt="'+altImg+'" data-image="'+i+'"/></li>');
            }
        }
    };

    slider.prototype.nextImg = function(_that) {
        var w = $('.slider-images__item.active').width();

        if($('.slider-images__item.active').index()+1 != imgs.length) {
            $('.slider-images__item.active')
                .animate({
                    'margin-left': -w
                })
                .removeClass('active')
                .next().addClass('active');
            $(_that.config.target).find('.dot-item.active')
                .removeClass('active')
                .next().addClass('active');
        }
    };
    slider.prototype.prevImg = function(_that) {
        var w = $('.slider-images__item.active').width();

        if($('.slider-images__item.active').index() != 0) {
            $('.slider-images__item.active')
                .removeClass('active')
                .prev().addClass('active')
                .animate({
                    'margin-left': 0
                });
            $(_that.config.target).find('.dot-item.active')
                .removeClass('active')
                .prev().addClass('active');
        }
    };

    slider.prototype.init = function() {
        this.prepare();
        this.request();
        this.bindEvents();
    };

    modules.slider = slider;

})(jQuery, window, document);
