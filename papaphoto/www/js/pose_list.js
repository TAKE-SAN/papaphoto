(function(){

 //    $(document).on("click","#spot-pose-name",function(){
 //    	if($("#spot-pose-img").css("display") == "none" ){
	// 		$("#spot-pose-img").slideDown();
	//     } else {
	// 		$("#spot-pose-img").slideUp();
	// 	}
	// });
    
    $(document).on("click","#spot-pose-name",function(){
        if($(this).next().css("display") == "none" ){
			$(this).next().slideDown();
	    } else {
			$(this).next().slideUp();
		}
	});

    $(document).on("click","#pose1",function(){
		if($("#photo1").css("display") == "none" ){
			$("#photo1").slideDown();
	    } else {
			$("#photo1").slideUp();
		}
	});

	$(document).on("click","#pose2",function(){
		if($("#photo2").css("display") == "none"){
			$("#photo2").slideDown();
		} else {
			$("#photo2").slideUp();
		}
	});

	$(document).on("click","#pose3",function(){
		if($("#photo3").css("display") == "none"){
			$("#photo3").slideDown();
		} else {
			$("#photo3").slideUp();
		}
	});

	$(document).on("click","#pose4",function(){
		if($("#photo4").css("display") == "none"){
			$("#photo4").slideDown();
		} else {
			$("#photo4").slideUp();
		}
	});

	$(document).on("click","#pose5",function(){
		if($("#photo5").css("display") == "none"){
			$("#photo5").slideDown();
		} else {
			$("#photo5").slideUp();
		}
	});

    $(document).on("click","#pose6",function(){
    	if($("#photo6").css("display") == "none"){
			$("#photo6").slideDown();
		} else {
			$("#photo6").slideUp();
		}
	});

    $(document).on("click","#pose7",function(){
        if($("#photo7").css("display") == "none"){
			$("#photo7").slideDown();
		} else {
			$("#photo7").slideUp();
		}
	});

    $(document).on("click","#pose8",function(){
        if($("#photo8").css("display") == "none"){
    		$("#photo8").slideDown();
		} else {
			$("#photo8").slideUp();
		}
	});

    $(document).on("click","#pose9",function(){
        if($("#photo9").css("display") == "none"){
        	$("#photo9").slideDown();
		} else {
			$("#photo9").slideUp();
		}
	});

    $(document).on("click","#pose10",function(){
        if($("#photo10").css("display") == "none"){
            $("#photo10").slideDown();
		} else {
			$("#photo10").slideUp();
		}
	});

    $(document).on("click","#pose11",function(){
        if($("#photo11").css("display") == "none"){
            $("#photo11").slideDown();
    	} else {
			$("#photo11").slideUp();
		}
	});

    $(document).on("click","#pose12",function(){
        if($("#photo12").css("display") == "none"){
            $("#photo12").slideDown();
        } else {
			$("#photo12").slideUp();
		}
	});

    $(document).on("click","#pose13",function(){
        if($("#photo13").css("display") == "none"){
            $("#photo13").slideDown();
        } else {
    		$("#photo13").slideUp();
		}
	});

    $(document).on("click","#pose14",function(){
        if($("#photo14").css("display") == "none"){
            $("#photo14").slideDown();
        } else {
        	$("#photo14").slideUp();
		}
	});

    $(document).on("click","#pose15",function(){
        if($("#photo15").css("display") == "none"){
            $("#photo15").slideDown();
        } else {
            $("#photo15").slideUp();
		}
	});

    $(document).on("click","#pose16",function(){
        if($("#photo16").css("display") == "none"){
            $("#photo16").slideDown();
        } else {
            $("#photo16").slideUp();
    	}
	});

    $(document).on("click","#pose17",function(){
        if($("#photo17").css("display") == "none"){
            $("#photo17").slideDown();
        } else {
            $("#photo17").slideUp();
    	}
	});

    $(document).on("click","#pose18",function(){
        if($("#photo18").css("display") == "none"){
            $("#photo18").slideDown();
        } else {
            $("#photo18").slideUp();
    	}
	});
    
    $(document).on("click","#pose19",function(){
        if($("#photo19").css("display") == "none"){
            $("#photo19").slideDown();
        } else {
            $("#photo19").slideUp();
        }
	});
    
    $(document).on("click","#pose20",function(){
        if($("#photo20").css("display") == "none"){
            $("#photo20").slideDown();
        } else {
            $("#photo20").slideUp();
        }
    });
    $(document).on("click","#pose21",function(){
        if($("#photo21").css("display") == "none"){
            $("#photo21").slideDown();
        } else {
            $("#photo21").slideUp();
        }
    });
    $(document).on("click","#pose22",function(){
        if($("#photo22").css("display") == "none"){
            $("#photo22").slideDown();
        } else {
            $("#photo22").slideUp();
        }
    });
    $(document).on("click","#pose23",function(){
        if($("#photo23").css("display") == "none"){
            $("#photo23").slideDown();
        } else {
            $("#photo23").slideUp();
        }
    });
    $(document).on("click","#pose24",function(){
        if($("#photo24").css("display") == "none"){
            $("#photo24").slideDown();
        } else {
            $("#photo24").slideUp();
        }
    });
    $(document).on("click","#pose25",function(){
        if($("#photo25").css("display") == "none"){
            $("#photo25").slideDown();
        } else {
            $("#photo25").slideUp();
        }
    });
    $(document).on("click","#pose26",function(){
        if($("#photo26").css("display") == "none"){
            $("#photo26").slideDown();
        } else {
            $("#photo26").slideUp();
        }
    });
    $(document).on("click","#pose27",function(){
        if($("#photo27").css("display") == "none"){
            $("#photo27").slideDown();
        } else {
            $("#photo27").slideUp();
        }
    });

})();


document.addEventListener("pageinit", function(e) {
  if (e.target.id == "pose-list-page") {
    //検索してlistに追加
    get_poses();
  }
}, false);


function get_poses(){
    //ニフティの場所
    // var current_position = new NCMB.GeoPoint({latitude: 35.6960429, longitude: 139.6894145});
    var current_position;
    NCMB.GeoPoint.current({
        success: function(geoObject){
            current_position = geoObject;

            //クエリ
            var Spot_object = NCMB.Object.extend("Spot"); // スポットクラスのインスタンスを作る
            var query = new NCMB.Query(Spot_object);      // インスタンスを使ってテーブルを指定する
        
            query.withinKilometers("geo", current_position, 0.5); // カラムを指定して検索
            query.find({
                success: function(results) {
                    // 成功後の処理
                    if(results.length == 0) {
                        var elm = $("#spot-pose-list")
                        elm.append( "<ons-list-item></ons-list-item>" );
                        ons.compile(elm[0]);
                        return 0;
                    }
        
                    console.log("（須藤）検索に成功した！："+ results[0].get("name"));
                    // DOMに検索結果を反映させる
                    var elm = $("#spot-pose-list");
                    elm.append( "<ons-list-item><p id=\"spot-pose-name\">" + results[0].get("name") + "</p><div id=\"spot-pose-img\" style=\"display: none;\"><img src=\"img/nifty.jpeg\" class=\"jpegfile\"><ons-button class=\"papa-button\" onclick=\"takePicture();\">このポーズで写真を撮る！</ons-button></div></ons-list-item>" );
                    // ons.compile(elm[0]);
                    // ons.compile("#pose-list-page");
                },
                error: function(object, error) {
                    // エラー処理
                    console.log("（須藤）検索に失敗した！" + error);
                }
            });
        },
        error: function(error){
            //エラー処理
            alert(error);
        }
    });
    
    //イベントポーズを取得
    var month = (new Date()).getMonth() + 1;
    var day = (new Date()).getDate();
    
    var ev_object = NCMB.Object.extend("Event2");
    var ev_query = new NCMB.Query(ev_object);
    ev_query.find({
       success: function(results){
           for(var i=0;i<results.length;i++){
               //画像取得
                var evname = results[i].get("evname");
                var objFile = new NCMB.File(results[i].get('filename'), null, null, null);
                
                var rmonth = evname.substr(0,2);
                var rday = evname.substr(2,2);
                var count = evname.length;
                var name = evname.substr(4,count);
               
               if(rmonth == month && rday == day){
                       //イベント表示
                        var elm = $("#spot-pose-list");
                        var obj = $( "<ons-list-item><p id=\"spot-pose-name\">" + name + "</p><div id=\"spot-pose-img\" style=\"display: none;\"><img src=\"\" class=\"jpegfile evpose\"><ons-button class=\"papa-button\" onclick=\"takePicture();\">このポーズで写真を撮る！</ons-button></div></ons-list-item>" );
                         console.log($("img", obj).get(0));
                        objFile.fetchImgSource($("img", obj).get(0));
                        elm.append(obj);

                        // ons.compile(elm[0]);
                        // ons.compile("#pose-list-page");
               }
                
           }
       } ,
       error: function(error){
           console.log("eventPose error: " + error);
       }
    });
}
