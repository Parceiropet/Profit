(function($, window, document, undefined){


    'use strict';

    PFTX.modules.removeEmpty = function(container, wrapper){

		$(container).each(function(){

			if($(this).text() == 0){
				if(wrapper){
					$(this).parents(wrapper).hide();
				}else{
					$(this).hide();				
				}
			}else{
				if(wrapper){
					$(this).parents(wrapper).show();
				}else{
					$(this).show();				
				}
			}

		});

	}

})(jQuery, window, document);