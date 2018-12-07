jQuery(function(){
    /*购物车页面渲染*/
    $id="";
    $.ajax({
        url:"../api/car.php",
        type:"get",
        async:true,
        data:{
            "type":"show"
        },
        success:function(data){
            bookcar(data);
            update();
            onedelete();
            bnum();
            bcount();
            alonecount();
        }
    });
    function bookcar(data){
        var arr=JSON.parse(data).datalist
        var html="";
        for(var i=0;i<arr.length;i++){
            html+=`<div class="car_con">
                    <ul>
                        <li><input type="checkbox" class="alone_btn" checked=true/></li>
                        <li>
                        <div class="car_img_box">
                            <a class="car_img" href="detail.html?id=${arr[i].id}"><img src="../${arr[i].imgurl}" alt="" /></a>
                        </div>
                        <div class="car_title_box">
                            <p class="car_title">${arr[i].title}</p>
                            <p class="car_category">品类：${arr[i].category}</p>
                        </div>
                        </li>
                        <li><span class="newprice">${arr[i].newprice}</span></li>
                        <li><span class="discount">${arr[i].discount}折</span></li>
                        <li>
                            <i class="jian"></i>
                            <input type="text" class="car_book_num" value="${arr[i].num}"/>
                            <i class="jia"></i>
                            <span class="car_stock">库存紧张</span>
                        </li>
                        <li><span class="save">${arr[i].save}</span></li>
                        <li><span class="xiaoji"></span></li>
                        <li>
                            <a class="shoucang">收藏</a>
                            <a href="car.html" class="shanchu">删除</a>
                        </li>
                    </ul>
                </div>`;
        }
        $('.car_con_box').eq(0).html(html);
    }
    /*获取cookie值渲染头部*/
    var name=document.cookie.split('=')[1];
    if(name){
        $('.h_aishu').eq(0).html(`欢迎${name}来淘书`);
        $('.h_plog').eq(0).css('display','none');
        $('.h_freg').eq(0).css('display','none');
    }
    /*点击数量加减，更新数据表*/
    function update(){
        for(var i=0;i<$('.jian').length;i++){
            $('.jian').eq(i).click(function(){
                $str=$(this).parent().parent().find('.car_img').attr('href').slice(12);
                $obj=strToObj($str);
                $id=$obj.id;
                $num=Number($(this).parent().find('.car_book_num').val())-1;
                if($num<1){
                    $num=1;
                }
                $(this).parent().find('.car_book_num').attr('value',$num);
                $.ajax({
                    url:"../api/car.php",
                    type:"get",
                    async:true,
                    data:{
                        "type":"update",
                        "num":$num,
                        "id":$id
                    },
                    success:function(){
                        console.log("jian");
                        bcount();
                    }
                });
            })
        }
        for(var i=0;i<$('.jian').length;i++){
            $('.jia').eq(i).click(function(){
                $str=$(this).parent().parent().find('.car_img').attr('href').slice(12);
                $obj=strToObj($str);
                $id=$obj.id;
                $num=Number($(this).parent().find('.car_book_num').val())+1;
                $(this).parent().find('.car_book_num').attr('value',$num);
                $.ajax({
                    url:"../api/car.php",
                    type:"get",
                    async:true,
                    data:{
                        "type":"update",
                        "num":$num,
                        "id":$id
                    },
                    success:function(){
                        console.log("jia");
                        bcount();
                    }
                });
            })
        }
    }
    /*点击单一商品删除*/
    function onedelete(){
        for(var i=0;i<$('.shanchu').length;i++){
            $('.shanchu').eq(i).click(function(){
                $str=$(this).parent().parent().find('.car_img').attr('href').slice(12);
                $obj=strToObj($str);
                $id=$obj.id;
                $.ajax({
                    url:"../api/car.php",
                    type:"get",
                    async:true,
                    data:{
                        "type":"one_delete",
                        "id":$id
                    },
                    success:function(){
                        console.log("删除");
                        bcount();
                    }
                });
            })
        }
    }
    /*批量删除*/
    // function 
    /*点击清空购物车*/
    $('#car_all_delete').click(function(){
        $.ajax({
            url:"../api/car.php",
            type:"get",
            async:true,
            data:{
                "type":"all_delete"
            },
            success:function(){
                console.log("全删");
            }
        })
    })
    /*单一商品数量*/
    function bnum(){
        $('#car_select_num').text($('.car_con').length);
    }
    /*最开始渲染的小计,总价*/
    var alone_btn=document.getElementsByClassName('alone_btn');
    var car_all_select=document.getElementById('car_all_select');
    function bcount(){
        $acount=0;
        for(var i=0;i<$('.xiaoji').length;i++){
            if(alone_btn[i].checked==true){
                $cprice=$('.alone_btn').eq(i).parent().parent().find('.newprice').text();
                $cnum=$('.alone_btn').eq(i).parent().parent().find('.car_book_num').val();
                $acount+=Number($cprice*100*$cnum/100);
            }
            $oprice=$('.newprice').eq(i).text();
            $onum=$('.car_book_num').eq(i).val();
            $ocount=($oprice*100*$onum/100).toFixed(2);
            $('.xiaoji').eq(i).text($ocount);
        }
        $('#count_num').text($acount.toFixed(2));
        $('#car_count_price').text($acount.toFixed(2));
    }
/*alone_btn被选中与取消时，总价的变化,点击单一按钮时控制全选按钮*/
function alonecount(){
    for(var i=0;i<$('.alone_btn').length;i++){
        $('.alone_btn').eq(i).click(function(){
            car_all_select.checked=aselect();
            bcount();
        })
    }
}
function aselect(){
    var res=true;
    for(var i=0;i<$('.alone_btn').length;i++){
        if(!alone_btn[i].checked){
           res=false;
        }
    }
    return res;
}
/*点全选时*/
$('#car_all_select').click(function(){
    for(var i=0;i<$('.alone_btn').length;i++){
        alone_btn[i].checked=car_all_select.checked;
    }
    bcount();
})
})