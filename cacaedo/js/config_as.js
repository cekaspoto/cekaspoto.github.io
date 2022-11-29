// JavaScript Document
$(document).ready(function () {

	// SVG COLOR //
    jQuery('img.svg').each(function(){
        var $img = jQuery(this);
        var imgID = $img.attr('id');
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');

        jQuery.get(imgURL, function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find('svg');

            // Add replaced image's ID to the new SVG
            if(typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if(typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass+' replaced-svg');
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);

        }, 'xml');

    });
	
	// RESIZE POSITION //
	function resizeImage() {
		var navWidth = $("div.option").width();
		var navHeight = $("div.option").height();
		var navRatio = navWidth / navHeight;

		navWidthMed = navWidth/2;
		navHeightMed = navHeight/2;

		if ($('div.option > a > img').width() > 1) picWidth = $('div.option > a > img').width();
		if ($('div.option > a > img').height() > 1) picHeight = $('div.option > a > img').height();
		picRatio = picWidth / picHeight;
		
		if (navRatio > picRatio) {
			var newHeight = (navWidth / picWidth) * picHeight;
			var newWidth = navWidth;
		} else {
			var newHeight = navHeight;
			var newWidth = (navHeight / picHeight) * picWidth;
		}
		
		newTop = 0 - ((newHeight - navHeight) / 2);
		newLeft =  0 - ((newWidth - navWidth) / 2);
			
		$('div.option > a > img').css({height: newHeight, width: newWidth, top: newTop, left: newLeft});
	}
	resizeImage();
	

	$(window).resize(function(){
		resizeImage();
	});


});