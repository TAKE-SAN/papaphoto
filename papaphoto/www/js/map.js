$(function(){
    // apiに渡す位置情報を格納する変数
    var lat,
        lon;
    var apiurl;
    var mk = [];//apiから検索した緯度経度
    var mapOptions;
    var map;
    var placename = [];
    var placepositionlat = [];
    var placepositionlon = [];
    var geodate = [];
    //起動時にmobile backend APIキーを設定
    $.getJSON("setting.json", function(data) {
        NCMB.initialize(
            data.application_key,
            data.client_key
        );
    });

    //位置情報取得に成功した場合のコールバック
    var onSuccess = function(position){
        var current = new CurrentPoint();
        current.distance = CurrentPoint.distance;   //検索範囲の半径を保持する
        current.geopoint = position.coords;         //位置情報を保存する
        // apiへの位置情報を格納
        lat = current.geopoint.latitude;
        lon = current.geopoint.longitude;
        // パラメータのgnrをM04にすると公園が検索される

        apiurl = "http://searchapi-stg.mapion.co.jp/search/ver1/localsearch/spot/?key=MA11&lat=" + lat + "&lon=" + lon + "&gnr=M04";
        console.log("lat :" + lat + " lon: " + lon);
        search(current);
    };

    //位置情報取得に失敗した場合のコールバック
    var onError = function(error){
        console.log("現在位置を取得できませんでした");
    };

    //位置情報取得時に設定するオプション
    var option = {
        timeout: 60000   //タイムアウト値(ミリ秒)
    };

    //現在地を取得する
    function find(){
        CurrentPoint.distance = 5; //検索距離を5kmに設定
        navigator.geolocation.getCurrentPosition(onSuccess, onError, option);
    }

    //現在地を保持するクラスを作成
    function CurrentPoint(){
        geopoint=null;  //端末の位置情報を保持する
        distance=0;     //位置情報検索に利用するための検索距離を指定する
    }

    //mobile backendから位置情報を検索するメソッド
    function search(current){
        //位置情報を検索するクラスのNCMB.Objectを作成する
        var SpotClass = NCMB.Object.extend("Spot");

        //NCMB.Queryを作成
        var query = new NCMB.Query(SpotClass);

        //位置情報をもとに検索する条件を設定
        var geoPoint = new NCMB.GeoPoint(current.geopoint.latitude,current.geopoint.longitude);
        query.withinKilometers("geo", geoPoint, current.distance);

        //mobile backend上のデータ検索を実行する
        query.find({
            success: function(points) {

                // 検索が成功した場合の処理
                //Google mapの設定
                mapOptions = {
                      //中心地設定
                      center: new google.maps.LatLng(current.geopoint.latitude,current.geopoint.longitude),
                      //ズーム設定
                      zoom: 18,
                      //地図のタイプを指定
                      mapTypeId: google.maps.MapTypeId.ROADMAP
                };

                //idがmap_canvasのところにGoogle mapを表示
                map = new google.maps.Map(document.getElementById("map_canvas"),
                    mapOptions);

                // mk[i]をmapで使えるように初期化
                //////////////////////////////////////////////////////////

                for (var i = 0; i < points.length; i++){
                    var point = points[i];

                    //位置情報オブジェクトを作成
                    var location = point.get("geo");
                    var myLatlng = new google.maps.LatLng(location.latitude,location.longitude);

                    //店舗名、位置情報、Google mapオブジェクトを指定してマーカー作成メソッドを呼び出し
                    markToMap(point.get("name"), myLatlng, map);
                }
            },
            error: function(error) {
                // 検索に失敗した場合の処理
                console.log(error.message);
            }
        });
    }

    // 追加した関数
    function markToMap(name, position, map){

        // マーカーを表示する
        var marker = new google.maps.Marker({
            position: position,
            title: name,
        });
        marker.setMap(map);//実際にマップにマーカーを表示する

        google.maps.event.addListener(marker, 'click', function() {
            var infowindow = new google.maps.InfoWindow({
                content:marker.title
            });
            infowindow.open(map,marker);
        });
    }

    document.addEventListener("pageinit", function(e) {


        if (e.target.id == "map-page") {
            find();//現在地の取得
            setAPI();//mapionAPIを呼び出し、検索をかける

        }
    }, false);

    //////////////////////////api/////////////////////////////////
    // apiにリクエストを送るurlの作成

    // マピオンAPIを使う
    function setAPI(){
        setTimeout(function(){
            $.ajax({

                url: apiurl,
                async: false,
                cache: false,
                dataType:'xml',
                type: 'POST',
                // エラーを表示
                error: function(xhr, textStatus, errorThrown) {
                    console.log(xhr.status);
                    console.log(textStatus);
                    console.log(errorThrown.message);
                    console.log("API失敗");
                },
                success: function(xml){
                    strSet(xml);
                }
            });
        },5000);
    }
    // xmlデータの取得が成功した場合のxmlを整理するコールバック関数
    function strSet(xmlfile){
        console.log(apiurl);
        // 緯度経度、名称を格納
        $(xmlfile).find("Item").each(function(i){
            placename[i] = $(this).find("poi_name").text();
            placepositionlat[i] = $(this).find("lat").text();
            placepositionlon[i] = $(this).find("lon").text();
            if(i % 10 == 0){
                console.log(placename[i] + " : " + i);
                console.log("lat : " + placepositionlat[i] + ": " + i);
                console.log("lon : " + placepositionlon[i] + ": " + i);
                geodate.push({position: new google.maps.LatLng(placepositionlat[i],placepositionlon[i]),content: placename[i]});
            }
        });
        showMarker();
    }

    function showMarker(){
        // マーカーを表示する
            for(var i = 0; i < 10; i++){
                var m = new google.maps.Marker({
                    position:geodate[i].position,
                    map:map
                });
                attachMessage(m,geodate[i].content);
        }
    }

    ////////////////////////////
    function attachMessage(marker,msg){
        google.maps.event.addListener(marker,'click',function(event){
            new google.maps.InfoWindow({
                content: msg
            }).open(marker.getMap(),marker);
        });
    }
});

