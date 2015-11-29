document.addEventListener("pageinit", function(e){
    if(e.target.id == "camera_roll"){
        getPictures();
    }
    }, false);

var a = null;
var b = null;

function getPictures(){
    var Filephoto = NCMB.Object.extend("photo");
    var fileQuery = new NCMB.Query(Filephoto);
    fileQuery.equalTo("accountId", NCMB.User.current().id);
    fileQuery.find({
        success: function(fileresults){
            var cellTemplate = $('#grid-table-cell-template')[0];
            var fragment = document.createDocumentFragment();

            for(var i=0;i<fileresults.length;i++){
                //ファイル名を取得
                /*var fileresult = fileresults[i];
                var fileName = fileresult.get("name");
                //ファイル名からファイルを取得
                var objFile = new NCMB.File(fileName, null, null, null);
                objFile.fetch().then(function(){
                //取得したファイルを表示するimg要素を作成
                            var imgObj = $('<img class="pic" style="width: 280px; margin: 10px; ">');
                            //取得したファイル(バイナリ形式?)を画像としてimgObjに追加
                            objFile.fetchImgSource(imgObj.get(0));
                });*/
                var file = fileresults[i];
                var cell = cellTemplate.cloneNode(true);
                var objFile = new NCMB.File(file.get('name'), null, null, null);
                /*objFile.fetch().then(function(){
                //取得したファイルを表示するimg要素を作成
                            var imgObj = $('<img style="width: 100px; height: 100px; margin: 2px;">');
                            //取得したファイル(バイナリ形式?)を画像としてimgObjに追加
                            objFile.fetchImgSource(imgObj.get(0));
                });*/

                objFile.fetchImgSource($('img', cell).get(0));

                $('img', cell).get(0).onclick = function(event){
                    detail.pushPage("detail.html", {imgdata: this.src});
                    a = this.src;
                    detail.on("postpush", function(e){
                        b = $(event.target).attr("data-filename");
                        Photocontroller.init();
                    });
                }

                $(cell).find("img").attr("data-filename", file.get('name')); // ファイル名を残す
                fragment.appendChild($('img', cell).get(0));

            }
            $('.grid-table-body').empty().append(fragment);
        },
        error: function(err){
            //取得に失敗したときの処理
            console.log(err.message);
        }
    });

    /*
    var query = new NCMB.Query("file");
    query.find({
       success: function(files) {
            var cellTemplate = $('#grid-table-cell-template')[0];
            var fragment = document.createDocumentFragment();
            files.forEach(function(file){
                var cell = cellTemplate.cloneNode(true);
                var objFile = new NCMB.File(file.get('fileName'), null, null, null);
                objFile.fetchImgSource($('img', cell).get(0));

                $('img', cell).get(0).onclick = function(event){
                    detail.pushPage("detail.html", {imgdata: this.src});
                    a = this.src;
                    detail.on("postpush", function(e){
                        b = $(event.target).attr("data-filename");
                        Photocontroller.init();
                    });
                }

                $(cell).find("img").attr("data-filename", file.get('fileName')); // ファイル名を残す
                fragment.appendChild($('img', cell).get(0));
            });

            $('.grid-table-body').empty().append(fragment);
        },
        error: function(err){
            console.log(err.message);
            alert("画像を取得できませんでした");
        }
    });
    */
}

var Photocontroller = {
    init: function() {
        this.Comment = NCMB.Object.extend("Comment");

        var photoClass = NCMB.Object.extend("photo");
        var query2 = new NCMB.Query(photoClass);

        var c = Number(b);
        query2.equalTo("name", c);

        query2.first().then(function (ph){
            var text = ph.get("updateDate");
            var t = text.substr( 0 , 10 );
            var e1 = document.getElementById('bart');
            e1.innerText = t;
        });


        $("#comment").on("click", function (e) {
            e.preventDefault();
            Photocontroller.addComment();
        });

        $("#l").on("click", function (e) {
            detail.popPage();
            detail.on("postpush", function(e){
                getPictures();
            });
        });


        $('#photo').children("img").attr('src', a);
            this.showComments();
        },

        addComment: function() {
            //入力内容の取得
            var message = $("#message").val();

            //Commentオブジェクトを作成
            var comment = new this.Comment();

            //messageとfilesrcを保存
            comment.set("filesrc", b);
            comment.set("message", message);

            comment.save().then(function(comment) {
                $("#message").val("");
                    Photocontroller.renderComments([comment]);
                }, function(e) {
                    console.debug(e)
                })
        },
        renderComments: function(comments){
            $(comments).each(function (i,comment) {
                $("#comments").append("<div class='comment'>"+comment.get("message")+"</div>")
            });
        },
        // コメントの取得
        showComments: function () {
            var query = new NCMB.Query(this.Comment);

            // ファイル名を検索条件に指定
            query.equalTo("filesrc", b);
            // 検索実行
            query.find().then(function (comments) {
           // 検索成功
           // 既存の内容は一旦すべて破棄
           $("#comments").empty();
           Photocontroller.renderComments(comments);
       });
    }
}








