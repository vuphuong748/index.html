
//Tìm kiếm
function checkKeySearch(e) {
	if (key == 32) {
		doSearch();
	}
}
function doSearch() {
	var frm = document.forms["frm-search"];
	if (frm.words.value.length > 0){
		frm.submit();
}
}

function showSearch() {
	var url = new URL(document.baseURI);
	var ws = url.searchParams.get("words");
	document.getElementById("searchResult").innerHTML = "<b> Kết quả tìm kiếm cho từ khóa: " + ws + "</b>";
}