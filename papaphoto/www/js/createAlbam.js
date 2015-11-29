document.addEventListener("pageinit", function(e) {
  if (e.target.id == "createAlbumPage") {
    //検索してlistに追加
    albamPictures();
  }
}, false);

function albamPictures(){
    /*var query = new NCMB.Query("file");
    query.find({
       success: function(files) {
            var cellTemplate = $('#grid-table-cell-template')[0];   //createAlbam.htmlのid="grid-table-cell-template"の要素を取得
            var fragment = document.createDocumentFragment();
            files.forEach(function(file){
            */
            var Filephoto = NCMB.Object.extend("photo");
    var fileQuery = new NCMB.Query(Filephoto);
    fileQuery.equalTo("accountId", NCMB.User.current().id);
    fileQuery.find({
        success: function(fileresults){
            var cellTemplate = $('#grid-table-cell-template')[0];
            var fragment = document.createDocumentFragment();

            for(var i=0;i<fileresults.length;i++){
                var file = fileresults[i];
                //

                var cell = cellTemplate.cloneNode(true);    //cellTemplateの要素をcellに複製
                var objFile = new NCMB.File(file.get('name'), null, null, null);
                console.log(file.get('name'));
                objFile.fetchImgSource($('img', cell).get(0));

                $('img', cell).get(0).onclick = function(event){
                    var obj = $(event.target);
                    if(obj.css("border-color") == "rgb(255, 255, 255)"){
                        obj.css("border-color", "blue");
                    }else{
                        obj.css("border-color", "rgb(255, 255, 255)");
                    }
                }
                $(cell).find("img").attr("data-filename", file.get('name')); // ファイル名を残す
                fragment.appendChild($('img', cell).get(0));
            //});
            }//
           $('.grid-table-body').empty().append(fragment);
        },
        error: function(err){
            console.log(err.message);
            alert("画像を取得できませんでした");
        }
    });

    $('.grid-table-body').on('click', '.tappable', function(e) {
        alert("aaaa");
        $(e.target).css("margin", "20px");
        location.href = 'detail.html#' + $(e.target).attr("data-filename");
    });
}


function create(){
    var albumName = $("#inputAlbmName").val();//"sample";
    var albamClass = NCMB.Object.extend("Albums");
    var data = new albamClass();
    data.set("title", albumName);    //todo名まえ入力
    data.set("AccountId", NCMB.User.current().id);
    //登録
    //設定したデータをmobile backendに保存
    data.save(null, {
        //保存に成功した場合
        success: function (obj){
            var albamId = $(obj)[0].id;  //albamIdの取得
            // var albamId = makeAlbam("sample");    //todo アルバムを作成
            //アルバムIDと画像IDの組を登録
            //todo この処理が非同期がウンタラカンタラで入っていない?
            $('.grid-table-body').find("img").each(function(i, elem){
                if($(elem).css("border-color")!="rgb(255, 255, 255)"){
                    var filename = $(elem).data('filename');

                    //ファイル名からidを取得
                    var fileClass = NCMB.Object.extend("photo");
                    var query = new NCMB.Query(fileClass);
                    query.equalTo("name", filename);
                    query.find({
                        success: function(results){
                            var fileId = results[0].id;
                            console.log("fileId: " + fileId);

                            console.log("fileId(return): " + fileId);
                            console.log("albmId(return): " + albamId);

                            var albamClass = NCMB.Object.extend("photo_Album");
                            var albmCls = new albamClass();
                            albmCls.set("PhotoID", fileId);
                            albmCls.set("AlbumID", albamId);
                            //登録
                            //設定したデータをmobile backendに保存
                            albmCls.save(null, {
                                //保存に成功した場合
                                success: function (obj){
                                    //albamPictures();
                                },
                                //保存に失敗した場合
                                error: function (obj, error){
                                    alert("and");
                                    console.log(error.message);
                                }
                            });
                        },
                        error: function(error){
                            console.log(error.message);
                        }
                    })
                }
            });
        },
        //保存に失敗した場合
        error: function (obj, error){
            alert("albm");
            console.log(error.message);
        }
    });
}
