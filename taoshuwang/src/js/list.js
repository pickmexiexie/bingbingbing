jQuery(function(){
    
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

    /*获取cookie值渲染头部*/
    var name=document.cookie.split('=')[1];
    if(name){
        $('.h_aishu').eq(0).html(`欢迎${name}来淘书`);
        $('.h_plog').eq(0).css('display','none');
        $('.h_freg').eq(0).css('display','none');
    }

    /*渲染列表*/
    $page=1;$qty=10;$total="";$sort="";
    $.ajax({
        url:"../api/list.php",
        type:"get",
        async:true,
        data:{
            'page':$page,
            'qty':$qty,
            'sort':$sort
        },
        success:function(data){
            /*渲染函数*/
            booklist(data);


            /*设置分页*/
            $total=JSON.parse(data).total;
            $pagenum=Math.ceil($total/$qty);
            $span="";
            for(var j=0;j<$pagenum;j++){
                $span+=`<span>${j+1}</span>`;
            }
            $('.list_book_page').eq(0).html($span);

            /*id排序，按数据库id顺序排序*/
    $('#sort_def').click(function(){
        $sort="id";
        $.ajax({
            url:"../api/list.php",
            type:"get",
            async:true,
            data:{
                'sort':$sort,
                'page':$page,
                'qty':$qty
            },
            success:function(data){
                booklist(data);
            }
        })
    })

    /*销量排序，按销量从高到低排序*/
    $('#sort_sales').click(function(){
        $sort="sell";
        $.ajax({
            url:"../api/list.php",
            type:"get",
            async:true,
            data:{
                'sort':$sort,
                'page':$page,
                'qty':$qty
            },
            success:function(data){
                booklist(data);
            }
        });
    })
    /*价格排序,按价格从低到高排序*/
    $('#sort_price').click(function(){
        $sort="newprice";
        $.ajax({
            url:"../api/list.php",
            type:"get",
            async:true,
            data:{
                'sort':$sort,
                'page':$page,
                'qty':$qty
            },
            success:function(data){
                booklist(data);
            }
        });
    })
    /*折扣排序,按折扣从高到低排序*/
    $('#sort_discount').click(function(){
        $sort="discount";
        $.ajax({
            url:"../api/list.php",
            type:"get",
            async:true,
            data:{
                'sort':$sort,
                'page':$page,
                'qty':$qty
            },
            success:function(data){
                booklist(data);
            }
        })
    })
    /*出版时间排序,按出版时间从近到远排序*/
    $('#sort_ptime').click(function(){
        $sort="ptime";
        $.ajax({
            url:"../api/list.php",
            type:"get",
            async:true,
            data:{
                'sort':$sort,
                'page':$page,
                'qty':$qty
            },
            success:function(data){
                booklist(data);
            }
        })
    })
            

    /*页码点击事件*/
    $('.list_book_page span').eq(0).toggleClass('active');
    for(var l=0;l<$('.list_book_page span').length;l++){
        $('.list_book_page span').eq(l).click(function(){
            for(var c=0;c<$('.list_book_page span').length;c++){
                $('.list_book_page span').eq(c).removeClass('active');
                }
                $page=$(this).text();
                $.ajax({
                    url:"../api/list.php",
                    type:"get",
                    async:true,
                    data:{
                        'page':$page,
                        'qty':$qty,
                        'sort':$sort
                    },
                    success:function(data){
                        booklist(data);
                    }
                })
            $(this).toggleClass('active');
            })
        }
    }
})

    /*渲染页面的函数*/
    function booklist(data){
        var arr=JSON.parse(data).datalist;
        $blist="";
        $total="";
        for(var i=0;i<arr.length;i++){
            $blist+=`<li>
                    <div class="list_img_box">
                        <a href="../html/detail.html?id=${arr[i].id}"><img src="../${arr[i].imgurl}" title="${arr[i].title}" /></a>
                    </div>
                    <div class="list_book_inf">
                        <h1><a class="btitle" href="#">${arr[i].title}</a></h1>
                        <p class="au_box"><a class="author" href="#">${arr[i].author}</a>著/<a class="publishing">${arr[i].publishing}</a>/<span class="ptime">${arr[i].ptime}</span></p>
                        <p class="bprofile">${arr[i].bprofile}</p>
                    </div>
                    <div class="buy_and_col">
                        <span class="oldprice">${arr[i].oldprice}</span>
                        <span class="newprice">${arr[i].newprice}</span>
                        <span class="discount">${arr[i].discount}折</span>
                        <a class="buy_btn">购买</a>
                        <a class="col_btn">收藏</a>
                    </div>
                </li>`;
            $('.input_list').eq(0).html($blist);
        }
    }
})