jQuery(function(){
    /*四位随机验证码,含小写字母，数字，样式是随机颜色，随机倾斜*/
    for(var i=0;i<4;i++){
        $('#four b').eq(i).html(Rnum(1)).css({
            "color":randomColor('rgb'),
            /*先设置行列块，再设置倾斜度*/
            "display":"inline-block",
            "transform":"rotate("+Math.round(Math.random()*30)+"deg)"
            });
    }
    $('#picknew').click(function(){
        for(var i=0;i<4;i++){
            $('#four b').eq(i).html(Rnum(1)).css({
                "color":randomColor('rgb'),
                "display":"inline-block",
                "transform":"rotate("+Math.round(Math.random()*30)+"deg)"
            });
        }
    })

    /*输入框的焦点事件函数，效果：得到焦点，feild块会现象边框和背景色，f_show块会显现等等*/
    /*第一行初始化*/
    $('.feild').eq(0).css({
        "border":"1px solid #cfc8ab",
        "background-color":"#fef5cc"
    });
    $('#usname').focus();
    $('.f_show').eq(0).css("display","inline-block");
    /*循环，一个失去焦点事件，一个获取焦点事件*/
    for(var i=0;i<$('.soh').length;i++){
        $('.soh').eq(i).blur(function(){
            for(var j=0;j<$('.soh').length;j++){
                $('.feild').eq(j).css({
                    "border":"none",
                    "background-color":""
                })
                $('.f_show').eq(j).css("display","none");
            }
        })
        $('.soh').eq(i).focus(function(){
            $(this).parent().parent().css({
                "border":"1px solid #cfc8ab",
                "background-color":"#fef5cc"
            });
            $(this).parent().find('.f_show').css("display","inline-block");
        })
    }

    /*一共做五个开关，用户名，邮箱，密码，确认密码，验证码*/
    var ok1=false,ok2=false,ok3=false,ok4=false,ok5=false;

    /*注册框每失去焦点就先做一次正则判断，符合正则再用ajax做一次判断是否存在数据库*/
    $('#usname').blur(function(){
        $str=$.trim($('#usname').val());
        $strlength=$str.replace(/[\u0391-\uFFE5]/g,"aa").length;
        if(YanZheng.usname($str)){
            $.post("../api/reg.php",{usname:$str,type:"find"},function(data){
                if(data==1){
                    $('.b_show').eq(0).css("display","inline-block");
                    $('.b_txt').eq(0).text("该会员已被使用，请重新输入用户名");
                    ok1=false;
                }else if(data==0){
                    $('.b_show').eq(0).css({
                        "display":"inline-block",
                        "border-color":"#4dbf00",
                        "background-color":"#f0ffe5"
                    }).find('i').css("background","url(../img/true.jpg)");
                    $('.b_txt').eq(0).text("ok!");
                    ok1=true;
                }
            })
        }else if($str==""){
            $(this).parent().find('.b_show').css({"display":"inline-block"});
            ok1=false;
        }else if($strlength<5 || $strlength>20){
            $(this).parent().find('.b_show').css({"display":"inline-block"});
            $(this).parent().find('.b_show span').text("用户名在5-20字符内，一个中文算两个字符");
            ok1=false;
        }else{
            $(this).parent().find('.b_show').css({"display":"inline-block"});
            $(this).parent().find('.b_show span').text("用户名必须为字母、数字、汉字或下划线，且不能以下划线开头");
            ok1=false;
        }
    })

    /*同上，邮箱验证*/
    $('#e-mail').blur(function(){
        $str=$.trim($('#e-mail').val());
        if(YanZheng.email($str)){
            $.post("../api/reg.php",{email:$str,type:"find"},function(data){
                if(data==1){
                    $('.b_show').eq(1).css("display","inline-block");
                    $('.b_txt').eq(1).text("该电子邮箱地址已经存在");
                    ok2=false;
                }else{
                    $('.b_show').eq(1).css({
                        "display":"inline-block",
                        "border-color":"#4dbf00",
                        "background-color":"#f0ffe5"
                    }).find('i').css("background","url(../img/true.jpg)");
                    $('.b_txt').eq(1).text("ok!");
                    ok2=true;
                }
            })
        }else if($str==""){
            $(this).parent().find('.b_show').css("display","inline-block");
            ok2=false;
        }else{
            $(this).parent().find('.b_show').css("display","inline-block");
            $(this).parent().find('.b_show span').text("请输入您有效的电子邮箱地址");
            ok2=false;
        }
    })


    /*密码验证*/
    $('#password').blur(function(){
        $str=$.trim($('#password').val());
        if(YanZheng.pwd($str)){
            $('.b_show').eq(2).css({
                        "display":"inline-block",
                        "border-color":"#4dbf00",
                        "background-color":"#f0ffe5"
            }).find('i').css("background","url(../img/true.jpg)");
            $('.b_txt').eq(2).text("ok!");
            ok3=true;
        }else if($str==""){
            $(this).parent().find('.b_show').css("display","inline-block");
            ok3=false;
        }else{
            $(this).parent().find('.b_show').css("display","inline-block");
            $(this).parent().find('.b_show span').text("密码长度6-16个字符之间");
            ok3=false;
        }
    })

    /*重复输入密码验证*/
     $('#repsw').blur(function(){
        $str=$.trim($('#repsw').val());
        $str1=$.trim($('#password').val());
        if($str==$str1 && $str1.length!=0){
            $('.b_show').eq(3).css({
                        "display":"inline-block",
                        "border-color":"#4dbf00",
                        "background-color":"#f0ffe5"
            }).find('i').css("background","url(../img/true.jpg)");
            $('.b_txt').eq(3).text("ok!");
            ok4=true;
        }else if($str==""){
            $(this).parent().find('.b_show').css("display","inline-block");
            ok4=false;
        }else{
            $(this).parent().find('.b_show').css("display","inline-block");
            $(this).parent().find('.b_show span').text("两次输入的密码不一致");
            ok4=false;
        }
    })


     /*验证码验证，不可错误提示可以先不显示，如果提交注册就显示*/
     $('#renumber').blur(function(){
        $str=$.trim($('#renumber').val());
        $len=$('#four b').length;
        $code='';
        for(var l=0;l<$len;l++){
            $code+=$('#four b').eq(l).text();
        }
        if($str==$code){
            $('.b_show').eq(4).css({
                        "display":"inline-block",
                        "border-color":"#4dbf00",
                        "background-color":"#f0ffe5"
            }).find('i').css("background","url(../img/true.jpg)");
            $('.b_txt').eq(4).text("ok!");
            ok5=true;
        }else if($str==""){
            $(this).parent().find('.b_show').css("display","inline-block");
            ok5=false;
        }else{
            ok5=false;
        }
    })


    /*得到焦点就隐藏各个输入框的错误提示,并改变文字,图片，背景色，以下代码相同可复制，可以复制，这个逻辑我真想吐，没有简便的吗*/
    $('#usname').focus(function(){
        $(this).parent().find('.b_show').css({"display":"none","background-color":"#fff2f2"});
        $(this).parent().find('.b_show i').css("background","url('../img/false.jpg')");
        $(this).parent().find('.b_show span').text("请输入用户名");
    })

    $('#e-mail').focus(function(){
        $(this).parent().find('.b_show').css("display","none");
        $(this).parent().find('.b_show i').css("background","url('../img/false.jpg')");
        $(this).parent().find('.b_show span').text("请输入电子邮箱地址");
    })

    $('#password').focus(function(){
        $(this).parent().find('.b_show').css({"display":"none","background-color":"#fff2f2"});
        $(this).parent().find('.b_show i').css("background","url('../img/false.jpg')");
        $(this).parent().find('.b_show span').text("请输入密码");
    })

    $('#repsw').focus(function(){
        $(this).parent().find('.b_show').css({"display":"none","background-color":"#fff2f2"});
        $(this).parent().find('.b_show i').css("background","url('../img/false.jpg')");
        $(this).parent().find('.b_show span').text("请再次输入密码");
    })

    $('#renumber').focus(function(){
        $(this).parent().find('.b_show').css({"display":"none","background-color":"#fff2f2"});
        $(this).parent().find('.b_show i').css("background","url('../img/false.jpg')");
        $(this).parent().find('.b_show span').text("请输入验证码");
    })



    /*给“提交注册”，ajax传参回后端，获取接口，参数不重复，可注册*/
    $('#submit_btn').click(function(){
        if(ok1 && ok2 && ok3 && ok4 && ok5){
            $usname=$.trim($('#usname').val());
            $email=$.trim($('#e-mail').val());
            $password=$.trim($('#password').val());
            $.post("../api/reg.php",{usname:$usname,email:$email,password:$password,type:"set"},function(success){
                    if(success=="yes"){
                        // $.cookie('usname',$usname);不能用？也知道为什么？
                        Cookie.set('name',$usname,{path:"/"});
                        location.href="../index.html";
                         ok1=!ok1;ok2=!ok2;ok3=!ok3;ok4=!ok4;ok5=!ok5;
                         //防止多次点击提交，重复注册同一账号。
                    }if(success=="no"){
                        alert('插入失败');
                    }
            });
        }
        if(!ok2){
            $('.b_show').eq(1).css("display","inline-block");
        }
        if(!ok3){
            $('.b_show').eq(2).css("display","inline-block");
        }
        if(!ok4){
            $('.b_show').eq(3).css("display","inline-block");
        }
        if(!ok5){
            $('.b_show').eq(4).css("display","inline-block");
            $('.b_txt').eq(4).text("验证码输入错误");
        }
    })
})