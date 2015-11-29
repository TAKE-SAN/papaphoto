document.addEventListener("pageinit", function(e) {
  if (e.target.id == "album-list-page") {
    //検索してlistに追加
    get_albums();
  }
}, false);

function get_albums(){
    var Al = NCMB.Object.extend("Albums");
    var al = new NCMB.Query(Al);
    al.equalTo("AccountId", NCMB.User.current().id);
    var ids = new Array(1000);
    var photoname = [];

    al.limit(1000);
    al.find({
    	success: function(results){
            var elm = $("#albumlist");
            for(var i = 0; i < results.length; i++){
                // var divBook = $('<div style="width: 100px; height:150px; verticul-align:middle; background-color:#F8BBD0; margin: 3px ; float:left;"' + 'onClick="albumPage(\''+ results[i].id +'\');"' + '></div>');
                var divBook = $('<div style= "position: relative;" width = 150px; height = 100px; onClick="albumPage(\''+ results[i].id +'\');"' + '><img src = img/albumbook.jpg width =150 height =100 /></div>')
                divBook.append('<div id="album' + i + '" '+ 'style= "position: absolute; left: 20px; top: 15px; color:blue; font-weight:bold;"' + '>' + results[i].get("title") + '</div>');
                // divBook.append('<p id="album' + i + '" '+ 'style=" color:white; margin: 0 auto; font-size:14pt; text-align: center; margin-top:15px;"' + '>' + results[i].get("title") + '</p>');
                $("#albumlist").append(divBook);

            }
		},
		error: function(error){
			console.log("error : + " + error.message);
		}
	});
}