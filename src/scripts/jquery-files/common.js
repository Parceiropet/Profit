$(window).ready(function() {
	console.log('0aaa');
	$('.prodImage').each(function (item, element) {
	    var b = $(this).find('img').attr('src');
	    var src = b.replace("70-70", "200-200")
	    $(this).find('img').attr('src', src)
	});
});