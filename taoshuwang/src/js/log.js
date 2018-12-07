jQuery(function(){

    /*输入框有焦点时，相关提示框显示（tip）,还有框高亮*/
    for(var i=0;i<$('.tip').length;i++){
        $('.feild').eq(i).on('focus','.login_txt',function(){
            $(this).parent().find('.tip').css('display','block');
            $(this).addClass('login_txt_focus');
        });
        $('.feild').eq(i).on('blur','.login_txt',function(){
            $(this).parent().find('.tip').css('display','none');
            $(this).removeClass('login_txt_focus');
        })
    }


    /*点击事件，先判断是否为空，为空跳出错误提示（error）,不为空进行ajax请求，有则登录首页传cookie,没有输出错误提示（error）*/
    $('#submit_btn').click(function(){
        $uore=$.trim($('#uore').val());
        $password=$.trim($('#password').val());
        if($uore=="" && $password==""){
            $('.login_msg').css('display','block');
            $('.error').text('请输入账户名和密码').css('background','url("../img/err.jpg") no-repeat 5px 3px');
        }else if($uore==""){
            $('.login_msg').css('display','block');
            $('.error').text('请输入账户名').css('background','url("../img/err.jpg") no-repeat 5px 3px');
        }else if($password==""){
            $('.login_msg').css('display','block');
            $('.error').text('请输入密码').css('background','url("../img/err.jpg") no-repeat 5px 3px');
        }else{
            $.post("../api/reg.php",{uore:$uore,password:$password,type:"find"},function(success){
                    if(success=='allok'){
                        Cookie.set('name',$uore,{path:"/"});
                        location.href="../index.html";
                    }else if(success=='nouser'){
                        $('.login_msg').css('display','block');
                        $('.error').text('此账户名并不存在，请重新输入账户名').css('background','url("../img/false.jpg") no-repeat 5px 3px');
                    }else if(success=='nopwd'){
                        $('.login_msg').css('display','block');
                        $('.error').text('您输入的用户名和密码不匹配').css('background','url("../img/false.jpg") no-repeat 5px 3px');
                    }
            })
        }
    })
})