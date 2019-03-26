export function parseImageUrl( url_string) {
	var str = url_string;
	str = str.replace("70-70", "200-200")
	return str;
}
export function dataFormatada(data){
    var str = data;
    str = data.replace('T00:00:00Z', '');
  	str = str.split( '-' );
  	var dia  = str[2];
  	var mes  = str[1];
  	var ano  = str[0];
  	return dia + '/' + mes + '/' + ano
}