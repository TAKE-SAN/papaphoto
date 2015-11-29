// This is a JavaScript file

$(function(){
    //起動時にmobile backend APIキーを設定
        NCMB.initialize(
            "1c7cdef04fce0d6508a5fd099e290c3efda3074a7a6c06296b0a1e57a05cf031",
            "314b7d076da8e2cb5ef060388531550ee227593c12b8b332d479ba7bddb5ede4");
            
    //push通知の設定
    document.addEventListener("deviceready", function(){
       // プッシュ通知受信時のコールバックを登録します
        window.NCMB.monaca.setHandler
        (
            function(jsonData){
                // 送信時に指定したJSONが引数として渡されます 
                alert("callback :::" + JSON.stringify(jsonData));
            }
        );


        // デバイストークンを取得してinstallation登録が行われます
        // ※ aplication_key,client_keyはニフティクラウドmobile backendから発行されたkeyに置き換えてください
        // ※ sender_idは【GCMとの連携に必要な準備】で作成したProjectのProject Numberを入力してください
        window.NCMB.monaca.setDeviceToken(
             "1c7cdef04fce0d6508a5fd099e290c3efda3074a7a6c06296b0a1e57a05cf031",
             "314b7d076da8e2cb5ef060388531550ee227593c12b8b332d479ba7bddb5ede4",
             "74552603115" 
        );

        // 開封通知登録の設定
        // trueを設定すると、開封通知を行う
        window.NCMB.monaca.setReceiptStatus(true);

        alert("DeviceToken is registed"); 
    }, false);
    /*
    function getInstallationId() {
        // 登録されたinstallationのobjectIdを取得します。
        window.NCMB.monaca.getInstallationId(
            function(id) {
                console.log("installationID is: " + id);
            }
        );
    }
    */
});

 //写真を撮るためのメソッド
        function takePicture () {
            navigator.camera.getPicture (onSuccess, onFail,
            { quality: 50, destinationType: Camera.DestinationType.DATA_URL, targetWidth: 400,
            targetHeight: 400,correctOrientation: true,　saveToPhotoAlbum: true});


            //成功した際に呼ばれるコールバック関数
            function onSuccess (imageData) {
                /*
                var image = document.getElementById ('picture');
                image.src = "data:image/jpeg;base64," + imageData;
                */
                Imaging.data = imageData;
                Imaging.saveToNcmb();
            }

            //失敗した場合に呼ばれるコールバック関数
            function onFail (message) {
                //alert ('エラーです: ' + message);
            }
        }

        //写真を扱うクラス
        Imaging = {

            //画像データを保持するプロパティ
            data: null,

            //ファイルストアに画像データをアップロードするメソッド
            saveToNcmb: function() {

                //下側で定義されているtoBlobメソッドでbase64形式のデータをblob形式に変換
                var byteCharacters = toBlob(Imaging.data);
                var name = Date.now();

                //名前、ファイルデータ、MIMEタイプを指定してNCMB.Fileのインスタンスを作成
                var NCMBFile = new NCMB.File(name, byteCharacters, "image/png");
                // alert("convert");

                var photoClass = NCMB.Object.extend("photo");
                var photo = new photoClass();
                var tag = "東京旅行";

                photo.set("name",name);
                photo.set("tag",tag);
                photo.set("accountId", NCMB.User.current().id);

                photo.save(null, {
                    success: function(photo){
                        // alert("保存完了");
                    },

                    error: function(photo, error) {
                        alert("error"+error.message);
                    }
                });


                //saveメソッドでファイルストアへのアップロードを行う
                NCMBFile.save().then(function() {
                  // alert("saved");
                },
                function(error) {
                // The file either could not be read, or could not be saved to NCMB.
                  alert(error);
                });
            }
        }

        //写真をファイルストアに保存するsaveToNcmbを呼び出すメソッド
        function savePicture () {
            Imaging.saveToNcmb();
        }

        //カメラで撮ったbase64形式の画像データをblobに変換します
        //ファイルストアにはblob形式の画像データを保存する必要があるためです
        function toBlob(base64) {
            var bin = atob(base64.replace(/^.*,/, ''));
            var buffer = new Uint8Array(bin.length);
            for (var i = 0; i < bin.length; i++) {
                buffer[i] = bin.charCodeAt(i);
            }
            // Blobを作成
            try{
                var blob = new Blob([buffer.buffer], {
                    type: 'image/png'
                });
            }catch (e){
                return false;
            }
             //alert("convert");
            return blob;
        }