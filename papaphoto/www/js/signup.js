(function(){
    var apikey = '1c7cdef04fce0d6508a5fd099e290c3efda3074a7a6c06296b0a1e57a05cf031';
    var clientkey = '314b7d076da8e2cb5ef060388531550ee227593c12b8b332d479ba7bddb5ede4';

    var user = new NCMB.User();
//SDKは1.2.6で行う
//ログイン機能を作成
    $(document).on("click","#signupbtn",function(){
        user.set("mailAddress",$("#email").val());
        user.set("password",$("#pw").val());
        user.set("userName",$("#usrname").val());

        user.signUp(null, {
            success: function(user) {
                console.log("新規登録に成功");
                mySignup.pushPage('mainView.html');
            },
            error: function(user, error) {
                console.log("新規登録に失敗: " + error.message);
            }
        });

    });

    $(document).on("click","#debug",function(){
        console.log($("#email").val());
    });

    $(document).on("click","#loginbtn",function(){
        mySignup.pushPage("login.html");
//window.location = "map.html";
    });

    //function loginbtn(){
    //    monaca.pushPage('login.html');
    //    console.log("入った");
    //}
    //


})();