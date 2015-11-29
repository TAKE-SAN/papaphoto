var Al = NCMB.Object.extend("Albums");
var al = new NCMB.Query(Al);
var ans = new Array(1000);
var photoid = new Array(1000);
var photoname = [];

//アルバムページの処理
function albumPage(albumId){
    myNavigator.pushPage('album.html');

    //albumIdからアルバム名を取得し、
    //albmTitlのidを持つ要素のテキストに設定
    var Albm = NCMB.Object.extend("Albums");
    var albmquery = new NCMB.Query(Albm);
    albmquery.equalTo("objectId", albumId);
    albmquery.find({
        success: function(results){
            $("#albmTitl").text(results[0].get("title"));
        },
        error: function(err){
            console.log(err.message);
        }
    });

    var File = NCMB.Object.extend("photo");
    var fileQuery = new NCMB.Query(File);
    var Comment = NCMB.Object.extend("Comment");
    var commentQuery = new NCMB.Query(Comment);

    //AlbumIDからアルバムの各写真を取得し、表示する
    var Data = NCMB.Object.extend("photo_Album");
    var query = new NCMB.Query(Data);
    query.equalTo("AlbumID", albumId);
    query.find({

        success: function(results){
            //アルバム情報の取得に成功した時
            //アルバムの各写真を取得し、それぞれに処理を行う
            for(var i=0;i<results.length;i++){
                //写真のidを取得
                var result = results[i];
                photoId = result.get("PhotoID");
                fileQuery.equalTo("objectId", photoId);
                fileQuery.find({

                    success: function(fileresults){
                        for(var i=0;i<fileresults.length;i++){
                            //ファイル名を取得
                            var fileresult = fileresults[i];
                            var fileName = fileresult.get("name");
                            //ファイル名からファイルを取得
                            var objFile = new NCMB.File(fileName, null, null, null);
                            objFile.fetch().then(function(){

                                //取得したファイルを表示するimg要素を作成
                                var imgObj = $('<img class="pic" style="width: 280px; margin: 10px; ">');
                                //取得したファイル(バイナリ形式?)を画像としてimgObjに追加
                                objFile.fetchImgSource(imgObj.get(0));

                                //取得した画像に対するコメントを取得
                                commentQuery.equalTo("filesrc", String(fileName));
                                commentQuery.find({

                                    success: function(commentresults){
                                        //写真とコメントを表示するdiv要素を作成
                                        var divObj = $("<div class='pictBox' style='background: white; box-shadow:3px 3px rgba(0, 0, 0, 0.4);'></div>");
                                        divObj.css("background-color", "white");
                                        divObj.css("margin", "10px");
                                        //div要素に取得した画像を表示するimg要素を追加
                                        divObj.append(imgObj);
                                        //取得したコメントをdiv要素に追加
                                        for(var j=0;j<commentresults.length;j++){
                                            var commentresult = commentresults[j];
                                            var message = commentresult.get("message");
                                            var msg = $('<p></p>');
                                            msg.text(message);
                                            msg.css("margin", "10px");
                                            msg.css("font-weight", "500");
                                            divObj.append(msg);
                                        }
                                        //作成したdiv要素を右詰め横並びにするためのdiv要素に格納
                                        var divObjInline = $("<div style='float:left; '></div>");
                                        divObjInline.append(divObj);
                                        //作成したdiv要素を表示
                                        $("#imgView").append(divObjInline);
                                    },
                                    error: function(err){
                                        //コメントの取得に失敗したときの処理
                                        console.log(err.message);
                                    }
                                });
                            });
                        }
                    },
                    error: function(err){
                        //写真のidを取得できなかった場合の処理
                        console.log(err.message);
                    }
                });
            }
        },
        error: function(err){
            //アルバム情報の取得に失敗したときの処理
            console.log(err.message);
        }
    });
}
