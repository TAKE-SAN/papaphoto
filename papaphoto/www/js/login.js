(function(){

//SDKは1.2.6で行う
//ログイン機能を作成
    $(document).on("click","#lobbtn",function(){
        // NCMB.User.loginWithMailAddress($("#logemail").val(), $("#logpw").val())
        NCMB.User.logIn($("#logemail").val(), $("#logpw").val())
        .then(function(data){
            if(NCMB.User.current()){
                console.log("ログインに成功");
                myLogin.pushPage('mainView.html');
            }
            else{
                console.log("ログインに失敗");
            }
            // console.log(NCMB.User.current().id);
        })/*
        .catch(function(err){
            console.log("ログインに失敗: " + err.message");
        });*/



    });

})();