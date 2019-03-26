(function($, window, document, undefined) {

    'use strict';

    PFTX.modules.DataSkuManager = function(selectorGroup) {
        var selector = selectorGroup;
        var _owner = PFTX.modules.DataSkuManager;
        var pathDataSku = "/produto/sku/";
        _owner.objSkusInfo = {
            skuList: []
        };

        if ($(selector).length) {
            var lengthSkus = $(selector).find("label").length;
            var arrSkuList = [];

            $.each(skuJson.skus, function(index, value) {
                if (arrSkuList.indexOf(value.values[value.values.length - 2]) == -1) {
                    arrSkuList.push(value.values[value.values.length - 2]);
                    _owner.objSkusInfo.skuList.push({
                        id: value.sku,
                        name: value.values[value.values.length - 2],
                        thumb: '',
                        texture: ''
                    });

                    callSkuJsonAndMountThumbs(value.sku, value.values[value.values.length - 2]);
                }

            });
        }

        function callSkuJsonAndMountThumbs(intIdSku, skuName) {
            var urlJSONSkuInfos = pathDataSku + intIdSku;
            var objSucess;
            var _skuName = skuName;

            $.getJSON(urlJSONSkuInfos, function(data) {
                objSucess = data;

                try {
                    var totalImages = objSucess[0]["Images"][0].length;
                    if (typeof totalImages != "undefined") {

                        for (var i = 0; i < totalImages; i++) {
                            var indexImages = 0;
                            var archiveTypeId = objSucess[0]["Images"][indexImages][i]["ArchiveTypeId"];

                            if (archiveTypeId == 1) {
                                var urlThumbSku = objSucess[0]["Images"][indexImages][i]["Path"];

                                $.each(_owner.objSkusInfo.skuList, function(index, value) {
                                    if (value.id == intIdSku) {
                                        _owner.objSkusInfo.skuList[index].thumb = urlThumbSku;
                                    }
                                });

                                $(selector).find("label").each(function() {
                                    if (skuName == $(this).text()) {
                                        $(this).css("background", "url('" + urlThumbSku + "') center center no-repeat scroll transparent");
                                        $(this).attr('title', $(this).text());
                                    }
                                });

                            }
                        }
                    }
                } catch (error) {
                    // console.warn(error);
                }

            });
        }
    }


})(jQuery, window, document);