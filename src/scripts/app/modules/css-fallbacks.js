/* Box-sizing - Fallback */
Modernizr.addTest( "boxsizing", function() {
    return Modernizr.testAllProps( "boxSizing" ) && ( document.documentMode === undefined || document.documentMode > 7 );
});
$(function() {
if ( !( $( 'html' ).hasClass( 'boxsizing' )) ) {
    $( '*' ).each(function() {
        var fullW = $( this ).outerWidth(),
            actualW = $( this ).width(),
            wDiff = fullW - actualW,
            newW = actualW - wDiff;

        $( this ).css( 'width', newW );
        console.log( box );
    });
}
});

Modernizr.testProp( 'webkitAppearance' );

Modernizr.addTest( 'webkit-appearance', function() {
    return Modernizr.testProp( 'webkitAppearance' );
});