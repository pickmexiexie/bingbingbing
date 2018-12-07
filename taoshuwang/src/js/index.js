jQuery(function(){

    /*轮播图插件 使用*/
    $('#banner2').myscroll({
            effect: 'top',
            arrows: false,
        });
    /*新书栏做一个ajax请求渲染页面*/
    $.ajax({
        url:'api/list.php',
        type:"get",
        async:true,
        data:{
            'kind':'新书上架'
        },
        success:function(str){
            bookindex(str,$('#main_newbook .new'));
        }
    });
    function bookindex(str,parent,start,object){
        var arr=JSON.parse(str).datalist;
        var html="";
        if(object){
            l=object;
        }else{
            l=arr.length;
        }
        if(start){
            s=start;
        }else{
            s=0;
        }
        for(var i=s;i<l;i++){
            html+=`<li>
                    <div class="pr">
                    <span class="discount">${arr[i].discount}</span>折
                    </div>
                    <div class="newimg">
                    <a class="book_lianjie" href="html/detail.html?id=${arr[i].id}"><img src="${arr[i].imgurl}" alt="${arr[i].tip}"></a>
                    </div>
                    <p class="booktitle"><a class="book_lianjie" href="html/detail.html?id="+${arr[i].id}>${arr[i].title}</a></p>
                    <p class="bookprice">
                        ￥<span class="oldprice">${arr[i].oldprice}</span>
                        ￥<span class="newprice">${arr[i].newprice}</span>
                    </p>
                </li>`
            parent.html(html);
        }
    }

    /*获取cookie值渲染头部*/
    var name=document.cookie.split('=')[1];
    if(name){
        $('.h_aishu').eq(0).html(`欢迎${name}来淘书`);
        $('.h_plog').eq(0).css('display','none');
        $('.h_freg').eq(0).css('display','none');
    }



    /*编辑推荐栏手风琴*/
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

    /*select_kind 使用tab切换*/
    //第一高亮
    $('.select_kind .after').eq(0).css('display','block');
    $('.select_kind .before').eq(0).css('display','block');
    $('.main_tejia_list .list_box').eq(0).css('display','block');
    for(var j=0;j<$('.select_kind li').length;j++){
        $('.select_kind li').eq(j).attr('idx',j);
        $('.select_kind li').eq(j).on('mouseover',function(){
            for(var i=0;i<$('.select_kind li').length;i++){
                $('.select_kind .after').eq(i).css('display','none');
                $('.select_kind .before').eq(i).css('display','none');
                $('.main_tejia_list .list_box').eq(i).css('display','none');
            }
            $(this).find('.after').css('display','block');
            $(this).find('.before').css('display','block');
            $('.list_box').eq($(this).attr('idx')).css('display','block');
        })
    }

    /*select_kind 使用ajax渲染页面*/
    $.ajax({
        url:'api/list.php',
        type:"get",
        async:true,
        data:{
            'kind':'特价精选'
        },
        success:function(str){
            bookindex(str,$('.list_box').eq(0),0,10);
            bookindex(str,$('.list_box').eq(1),10,20);
            bookindex(str,$('.list_box').eq(2),20,30);
            bookindex(str,$('.list_box').eq(3),0,10);
            bookindex(str,$('.list_box').eq(4),10,20);
            bookindex(str,$('.list_box').eq(5),20,30);
            bookindex(str,$('.list_box').eq(6),0,10);
            bookindex(str,$('.list_box').eq(7),10,20);
            bookindex(str,$('.list_box').eq(8),20,30);
            bookindex(str,$('.list_box').eq(9),10,20);
        }
    });

    /*.main_new_new 新书速递块，仿照上面渲染*/
    $.ajax({
        url:'api/list.php',
        type:"get",
        async:true,
        data:{
            'kind':'新书速递'
        },
        success:function(str){
            bookindex(str,$('.main_new_list').eq(0),0,10);
        }
    });

    /*select1_kind 使用tab切换*/
    //第一高亮
    $('.select1_kind .after').eq(0).css('display','block');
    $('.select1_kind .before').eq(0).css('display','block');
    $('.main_people_list .list1_box').eq(0).css('display','block');
    $('.select1_kind a').eq(0).css('color','red');
    for(var j=0;j<$('.select1_kind li').length;j++){
        $('.select1_kind li').eq(j).attr('idx',j);
        $('.select1_kind li').eq(j).on('mouseover',function(){
            for(var i=0;i<$('.select1_kind li').length;i++){
                $('.select1_kind .after').eq(i).css('display','none');
                $('.select1_kind .before').eq(i).css('display','none');
                $('.main_people_list .list1_box').eq(i).css('display','none');
                $('.select1_kind a').eq(i).css('color','#546f60');
            }
            $(this).find('.after').css('display','block');
            $(this).find('.before').css('display','block');
            $('.list1_box').eq($(this).attr('idx')).css('display','block');
            $('.select1_kind a').eq($(this).attr('idx')).css('color','red');
        })
    }

    /*select2_kind 使用tab切换*/
    //第一高亮
    $('.select2_kind .after').eq(0).css('display','block');
    $('.select2_kind .before').eq(0).css('display','block');
    $('.main_paihang_list .list2_box').eq(0).css('display','block');
    $('.select2_kind a').eq(0).css('color','red');
    for(var j=0;j<$('.select2_kind li').length;j++){
        $('.select2_kind li').eq(j).attr('idx',j);
        $('.select2_kind li').eq(j).on('mouseover',function(){
            for(var i=0;i<$('.select2_kind li').length;i++){
                $('.select2_kind .after').eq(i).css('display','none');
                $('.select2_kind .before').eq(i).css('display','none');
                $('.main_paihang_list .list2_box').eq(i).css('display','none');
                $('.select2_kind a').eq(i).css('color','#546f60');
            }
            $(this).find('.after').css('display','block');
            $(this).find('.before').css('display','block');
            $('.list2_box').eq($(this).attr('idx')).css('display','block');
            $('.select2_kind a').eq($(this).attr('idx')).css('color','red');
        })
    }

    /*select2_kind 使用ajax渲染页面 图书排行块*/
    $.ajax({
        url:'api/list.php',
        type:"get",
        async:true,
        data:{
            'kind':'图书排行'
        },
        success:function(str){
            bookindex(str,$('.list2_box').eq(0),0,12);
            bookindex(str,$('.list2_box').eq(1),12,24);
            bookindex(str,$('.list2_box').eq(2),24,36);
        }
    });
})
