jQuery(function(){

    /*渲染页面*/
    $id="";//用来获取id作为详情页和购物车的传值
    $data=decodeURI(location.search);
    $str=$data.slice(1);
    $id=strToObj($str).id;
    $.ajax({
        url:"../api/list.php",
        type:"get",
        async:true,
        data:{
            'id':$id
        },
        success:function(str){

            bookdetail(str);

            /*zoom放大镜效果*/
            MagnifierF("MagnifierWrap");

        }
    })
    
    // 渲染页面的函数
    function bookdetail(str){
        var con=(JSON.parse(str).datalist)[0];
        //渲染书名
        $('#title').text(con.title);
        //渲染书图
        var img=`<img src="../${con.imgurl}" class="MagTargetImg">`;
        $('.MagnifierMain').eq(0).html(img);
        //渲染已售书本
        $('.sellnum').eq(0).html(con.sell);
        //文字渲染右边盒子
        var btop=`<div class="btop">
                        <p class="main_new_price">
                            淘书价：<span id="newprice">￥${con.newprice}</span>
                        </p>
                        <p class="main_vip">贵宾价：贵宾会员尊享全场图书折上折，详见<a href="#">积分及会员等级</a></p>
                        <p class="main_old_price">
                            定价：
                            <span id="oldprice">￥${con.oldprice}</span>
                            <span class="dcolor">折扣:</span>
                            <span id="discount">${con.discount}折</span>
                            <span class="scolor">立即节省</span>
                            <span id="save">￥${con.save}</span>
                        </p>
                        <p id="main_ku">
                            库存：
                            <span class="stock">${con.stock}</span>
                        </p>
                        <p class="main_pinglei">
                            品类：
                            <span class="category">${con.category}</span>
                        </p>
                    </div>`
        var bbottom=`<div class="bbottom">
                        <p class="main_authors">
                            作者：<span class="author">${con.author}</span>
                            著<span class="author">
                        </p>
                        <p class="main_chubanshe">
                            出版社：
                            <span class="publishing">${con.publishing}</span>
                        </p>
                        <ul class="main_banshi">
                            <li>ISBN:<span class="isbn">${con.isbn}</span></li>
                            <li>出版时间：<span class="ptime">${con.ptime}</span></li>
                            <li>页数：<span class="bpage">${con.bpage}</span></li>
                            <li>包装：<span class="packing">${con.packing}</span></li>
                            <li>开本：<span class="fomat">${con.fomat}开</span></li>
                            <li>字数：<span class="word">${con.word}</span></li>
                        </ul>
                    </div>`
        $('.btop').eq(0).prepend(btop);
        $('.bbottom').eq(0).prepend(bbottom);
        $('#bprofile').html(`${con.bprofile}`);
        $('#aprofile').html(`${con.aprofile}`);
        $('#catelog').html(`${con.catelog}`);
    }

    /*获取cookie值渲染头部*/
    var name=document.cookie.split('=')[1];
    if(name){
        $('.h_aishu').eq(0).html(`欢迎${name}来淘书`);
        $('.h_plog').eq(0).css('display','none');
        $('.h_freg').eq(0).css('display','none');
    }

    /*左部同类热卖图书手风琴*/
    $('.tuijian_list li').eq(0).find('.first_show').css('display','none');
    $('.tuijian_list li').eq(0).find('.than_show').css('display','block');
    for(var i=0;i<$('.tuijian_list li').length;i++){
        $('.tuijian_list li').eq(i).on('mouseover',function(){
            for(var j=0;j<$('.tuijian_list li').length;j++){
                    $('.tuijian_list li').eq(j).find('.first_show').css('display','block');
                $('.tuijian_list li').eq(j).find('.than_show').css('display','none');
            }
            $(this).find('.first_show').css('display','none');
            $(this).find('.than_show').css('display','block');
        })
    }


    /*立即购买（#pay），通过计算商品个数(#booknum)乘与单价(.newprice),传值给购物车*/
    $('#pay').click(function(){
        var n=Number($('#booknum').val());
        var p=$('#newprice').text().slice(1);
        var pr=Number(p).toFixed(2)*100;
        var count=(n*pr)/100;
        $nums=$('#booknum').val();
        $.ajax({
            url:"../api/car.php",
            type:"get",
            async:true,
            data:{
                'type':'add',
                'id':$id,
                'num':$nums
            },
            success:function(str){
                console.log(str);
                location.href="../html/car.html";
            }
        })
    })


    /*书评块（tab切换，留言板）*/
    $('#tab_d').toggleClass('w15');
    $('.tabbox li').eq(0).toggleClass('g');
    $('.tabs').eq(0).toggleClass('show');
    for(var i=0;i<$('.tabbox li').length;i++){
        $('.tabbox li').eq(i).attr('idx',i);
        $('.tabbox li').eq(i).click(function(){
            for(var j=0;j<$('.tabbox li').length;j++){
                $('.ru').eq(j).removeClass('w15');
                $('.tabbox li').eq(j).removeClass('g');
                $('.tabs').eq(j).removeClass('show');
            }
            $(this).find('a').toggleClass('w15');
            $(this).toggleClass('g');
            $('.tabs').eq($(this).attr('idx')).toggleClass('show');
        })
    }
})