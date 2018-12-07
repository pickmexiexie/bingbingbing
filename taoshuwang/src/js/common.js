/*
	公共函数：经常会使用到的函数，大家都可以调用
*/

/*
 	randomNum(min, max):
 	说明：返回min到max之间的一个随机数
 	参数一：最小值
 	参数二：最大值
 */

function randomNum(min, max) {
	//返回min到max之间是随机数
	//最新小：Math.random()+min 0-1之间   0-0.99999
	//最大的：Math.random()*max+1
	return parseInt(Math.random() * (max - min + 1)) + min;
}

//-------------------------------------------------------------

/*
 	getid(id):
 	说明：通过id查找元素
 	参数：传id名进来
 	
 */
function getid(id) {
	return document.getElementById(id);
}

//-------------------------------------------------------

/*
 	filterTex(str):
 	说明：过滤敏感词
 	参数：传要过滤的字符串进来，返回一个过滤后的字符串，敏感词变成**
 
 * */

function filterTex(str) {

	//敏感
	var sensitive = ['傻B', '妈蛋', 'bitch', 'fuck', '操', '小学生', '反清复明'];

	for(var i = 0; i < sensitive.length; i++) {
		var reg = new RegExp(sensitive[i], 'gi');
		str = str.replace(reg, '**');
	}

	return str;
}

//--------------------------------------------------

/*
 	randomColor(str):
 	说明：生成随机颜色
 	参数：如果传16进来，生成16进制颜色，如果传rgb进来，传rgb颜色
 
 * */

function randomColor(str) {
	//生成随机颜色
	if(str == 16) {
		//生成16进制的   '0123456789abcdef'  #666677
		var str = '0123456789abcdef';
		var color = '#';
		for(var i = 0; i < 6; i++) {
			color += str.charAt(parseInt(Math.random() * str.length));
		}

		return color;

	} else if(str == 'rgb') {
		//rgb(255,255,0) 生成3个随机数，每个随机数应该在  0-255
		var r = parseInt(Math.random() * 256);
		var g = parseInt(Math.random() * 256);
		var b = parseInt(Math.random() * 256);

		return 'rgb(' + r + ',' + g + ',' + b + ')';

	} else {
		alert('参数传错了');
	}
}

//-----------------------------
//补零操作
function setDb(num) {
	//小于10的，补零
	if(num < 10) {
		return '0' + num;
	} else {
		return '' + num;
	}
}

//---------------------------

//封装时间函数，把毫秒转成xx天xx时xx分xx秒   return {}

function setTime(diffTime) {

	var sec = setDb(diffTime % 60); //秒
	var min = setDb(Math.floor(diffTime / 60) % 60); //分
	var hour = setDb(Math.floor(diffTime / 60 / 60) % 24); //小时
	var day = Math.floor(diffTime / 60 / 60 / 24);

	return { //想返回多个数的时候，做成json数据
		'sec': sec,
		'min': min,
		'hour': hour,
		'day': day
	};
}

//------------------------

//字符串转成对象
//传的参数： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888&color=土豪金
//返回值：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888", …}

function strToObj(str) {
	//	var str = str.slice(1);
	var arr = str.split('&');
	var obj = {};
	for(var i = 0; i < arr.length; i++) {
		var arr2 = arr[i].split('=');
		obj[arr2[0]] = arr2[1];
	}

	return obj;
}

//-----------------------------

//对象转成字符串方法封装

//传的参数：{id: "001", name: "iphone7 plugs", imgurl: "img/ip7.jpg", price: "5899", sale: "5888", …}
//返回值： id=001&name=iphone7 plugs&imgurl=img/ip7.jpg&price=5899&sale=5888&color=土豪金

function objToStr(obj) {
	var html = '';
	for(var key in obj) {
		html += key + '=' + obj[key] + '&';
	}

	html = html.slice(0, -1);
	return html;
}

/*
 	事件监听兼容性处理：
 	参数一：节点名
 	参数二：事件名称
 	参数三：事件处理函数
 
 */

function bind(ele, type, fn) {
	if(ele.addEventListener) {
		//ie9+ 主流
		ele.addEventListener(type, fn, false);
	} else {
		//ie8-
		ele.attachEvent('on' + type, fn);
	}

}

//-----------------------------------------------------------
/*
	获取样式：可以获取行内和非行内样式
	参数一：obj 节点名
	参数二：name 属性名	
 
 * */

function getstyle(obj, name) {
	//获取样式
	if(obj.currentStyle) {
		//ie8-
		return obj.currentStyle[name];
	} else {
		//主流浏览器
		return getComputedStyle(obj, false)[name];
	}
}
/*
	运动框架封装：startMove()过渡    jq animate()
	最终版：多对象，多属性，链式运动框架(运动队列)
	参数一：对象名
	参数二：属性，目标值  键名：属性名，键值：目标值    {'width':200,'heigth':400}  实现：宽度和高度一起改变，宽度变成200，高度变成400
	参数三：回调函数(可选参数)
 */

function startMove(obj, json, fnend) {

	clearInterval(obj.timer);//防止定时器叠加
	obj.timer = setInterval(function() {

		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for(var key in json) {
//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if(key == 'opacity') {//初始值
				cur = getstyle(obj, key) * 100; //透明度
			} else {
				cur = parseInt(getstyle(obj, key)); //width heigth borderwidth px为单位的

			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			if(cur != json[key]) { //width 200 heigth 400
				istrue = false; //如果没有达到目标值，开关false
			} else {
				istrue = true; //true true
			}

			//3、运动
			if(key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = `alpha(opacity:${cur+speed})`;
			} else {
				obj.style[key] = cur + speed + 'px';//针对普通属性 left  top height 
			}

		}
		
		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		if(istrue) { //如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if(fnend) {
				fnend();
			}
		}

	}, 30); //obj.timer 每个对象都有自己定时器
}


//匹配规则(封装好的面向对象)
    var YanZheng={
        usname:function(str){
            // var reg=new RegExp(/^[\u2E80-\u9FFF]+$/);
            // var reg=new RegExp(/.{5,20}/);
            var reg=new RegExp(/^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/);
            var strreg=str.replace(/[\u0391-\uFFE5]/g,"aa");
            var strlength=strreg.length;
            if(strlength>=5 && strlength<=20){
                return reg.test(strreg);
            }
        },
        //10. 密码(以字母开头，长度在6~18之间，只能包含字母、数字和下划线)：^[a-zA-Z]\w{5,17}$
        pwd:function(str){
            // var reg=new RegExp(/^[a-zA-Z]\w{5,17}$/);
            var reg=new RegExp(/.{6,16}/);
            return reg.test(str);
        },
        //8. 短身份证号码(数字、字母x结尾)：^([0-9]){7,18}(x|X)?$ 或 ^\d{8,18}|[0-9x]{8,18}|[0-9X]{8,18}?$   这个有错
        idcard:function(str){
            var reg=new RegExp(/^[1-9]\d{5}(1\d{3}|20[0-1][0-8])([0][1-9]|[1][0-2])(0[0-9]|[1-2][0-9]|30)\d{3}[0-9Xx]$/);
            return reg.test(str);
        },
        //1. Email地址：^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$
        email:function(str){
            var reg=new RegExp(/^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
            return reg.test(str);
        },
        phnum:function(str){
            var reg=new RegExp(/^1[3-9]\d{9}$/);
            return reg.test(str);
        },
        pwdag:function(str){
            var reg=new RegExp(/^[a-zA-Z]\w{5,17}$/);
            return reg.test(str);
        },
        yzm:function(str){
            var reg=new RegExp(/^u2E80-u9FFF$/);
            return reg.test(str);
        },
        stgpwd:function(str){
            var reg=new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$/);
            return reg.test(str);
        }
    }


var Cookie={

	set:function(name,value,prop){
		var str=name+"="+value;
		if(prop.expires){
			str+="; expires="+prop.expires;
		}
		if(prop.path){
			str+="; path="+prop.path;
		}
		if(prop.domain){
			str+="; domain="+prop.domain;
		}
		document.cookie=str;
	},
	get:function(key){
		var cookies=document.cookie;
		var arr=cookies.split('; ');
		for(var i=0;i<arr.length;i++){
			var arr2=arr[i].split('=');
			if(key==arr2[0]){
				return arr2[1];
			}
		}
	},
	remove:function(key){
		var now=new Date();
		now.setDate(now.getDate()-1);
		this.set(key,'no',{expires:now.toUTCString()});
	}
}

//下拉菜单概念：传入包裹需要隐藏菜单的最近父元素ul或则div解析参数，函数执行。
function Menue(obj){
    obj.parentNode.onmouseover=function(e){
        var e=window.event||e;
        obj.style.display='block';
    }

    obj.parentNode.onmouseout=function(e){
        var e=window.event||e;
        obj.style.display='none';
    }
}

//选项卡概念：传入tab切换元素参数和conten容器元素参数，执行函数。
function Tabs(tab,content){
    for(var i=0;i<tab.length;i++){
        tab[i].idx=i;
        tab[i].onmouseover=function(e){
            var e=window.event||e;
            for(var j=0;j<content.length;j++){
                content[j].style.display='none';
                tab[j].classList.remove('tcolor');
            }
            content[this.idx].style.display='block';
            this.classList.add('tcolor');
        }
    }
}

//侧栏广告概念：传入侧栏盒子父元素节点为第一个参数，第一个参数是一个数组可以传入多个节点，第二个参数是设置广告栏高度，也是一个可以传多个高度的数组，执行参数,缺点：该滚轮事件只能触发一次，务必把所有侧栏广告一起使用该函数，容易与返回顶部函数相撞。
function SiderBar(sider,top){
    window.onscroll=function(){
        for(var i=0;i<sider.length;i++){
            sider[i].style.top=top[i]+(document.documentElement.scrollTop || document.body.scrollTop)+'px';
        }
        
    }
}



//返回顶部概念：第一个参数返回顶部的按钮节点，第二个参数为出现按钮的距离。为什么这里超过一定距离点击就失去效果了呢？？？？？有可能是因为把他所在的块元素在别人块之上，无法计算出以自己所在块位置一下距离。
 function GoTop(obj,top){
    window.onscroll=function(){
        var _top = document.body.scrollTop || document.documentElement.scrollTop;
        if(_top >= top){
            obj.style.display = "block";
        } else {
            obj.style.display = "none";
        }
    }
     obj.onclick=function(){
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
}

 //百度侧栏广告:参数为移动最大盒子节点，即BaiDuContent,偷懒利用了startMove封装函数的配合；
 function  Bd_ads(obj){
    obj.onmouseenter=function(){
        startMove(obj,{'left':0})
    }
    obj.onmouseleave=function(){
        startMove(obj,{'left':-obj.offsetWidth})
    }
}

//封装ajax()
function ajax(method,url,data,fn){
    var xhr=new XMLHttpRequest();
    if(method=='GET'&&data){
        url+='?'+data;
    }
    xhr.open(method,url,true);
    if(method=='POST'){
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send(data);
    }else if(method=='GET'){
        xhr.send();
    }
    xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
            if(xhr.status==200){
                if(fn){
                    fn(xhr.responseText);
                }
            }else{
                alert('失败状态：'+xhr.status);
            }
        }
    }
}


function waterFull(parent,children){

    //先获得父元素及其底下所有的class = box的元素
    var oParent = document.getElementById(parent);
    var oBoxs =  getByClass(oParent,children);

//我们在前面说过，数据块的列数我们是希望不变的。由于每个数据块都是等宽的，所以可以以第一个数据块的宽度为准，获得数据块的宽度。再计算数据块的列数，向下取整。
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);

//接下来设置父元素的样式，我们需要获得它的宽度，并且使其居中
   oParent.style.cssText = 'width:'+ cols * oBoxW + 'px; margin: 0 auto';

//在定义好了所有的样式之后，就是排列数据块。首先第一行是直接排列的。定义一个数组存放每一列的高度，从第二行开始，使得每一个数据块都排在高度最低的那一列。首先得遍历所有的box，即oBoxs

var arrH = []; //定义数组存放每一列的高度
for(var i = 0; i< oBoxs.length; i++){
    //当是第一行时，直接将数据块依次排列，并在数组中记录每一列的高度
    if(i < cols){
        arrH[i] = oBoxs[i].offsetHeight;
    }
    //当i>cols时，即要对前面的所有列的高度进行遍历，将下一个图片放在合适的位置。
    else{
    //首先在数组中找到高度最低的列数。我们都知道有Math.min可以找到最小的数字，但是它接受的参数必须是一组数字，所以在这里我们要用Math.min.apply()方法

    var minH = Math.min.apply(null, arrH);  //定义一个变量，存放数组中最小的高度

    //在找出了最小高度之后，我们需要知道它的索引，才能够为接下来的数据块找到合适的位置，所以在下面又定义了一个找出最小值下标的函数。

    //定义一个变量去接受getMinhIndex函数的返回值
    var minIndex = getMinhIndex(arrH,minH);

    //在获得了高度最小的列数的索引后，就可以将下一个元素放到合适的位置
    oBoxs[i].style.position = 'absolute';
    oBoxs[i].style.top = minH + 'px';
    oBoxs[i].style.left = minIndex * oBoxW + 'px';

    //将当前的数据块终于都放到了合适的位置，但不要忘了更新arrH数组
    arrH[minIndex] += oBoxs[i].offsetHeight; 
    }

}

}


//获取当前最小值得下标
function getMinhIndex(array,min){

    for(var i in array){

        if(array[i] == min)

            return i;
    }
}





//获取子元素下所有父元素;
function getByClass(parent,className){

    var boxArr = new Array();//用来获取所有class为box的元素

    var oElement = parent.getElementsByTagName('*');

    for (var i = 0; i <oElement.length; i++) {

        if(oElement[i].className == className){

            boxArr.push(oElement[i]);

        }
    };
    return boxArr;
}


//封装瀑布流
function WaterFlow(parentobj,childclass){
    var obj=document.getElementById(parentobj);
    var box=obj.getElementsByClassName(childclass);
    var cols=Math.floor(document.body.clientWidth/box[0].offsetWidth);
    obj.style.cssText='width'+cols*box[0].offsetWidth+'px';
    var arrHeight=[];
    for(var i=0;i<box.length;i++){
        if(i<cols){
            arrHeight[i]=box[i].offsetHeight;
        }else{
            var boxminheight=Math.min.apply(null,arrHeight);
            var minidx=getMinhIndex(arrHeight,boxminheight);
            box[i].style.position='absolute';
            box[i].style.top=arrHeight[minidx]+'px';
            box[i].style.left=minidx*box[0].offsetWidth+'px';
            arrHeight[minidx]+=box[i].offsetHeight;
        }
    }
}

function waterFall(element, space, children) {
                if (!element) return;
                space = space || 10; //各个元素上下之间的空隙高度
                children = children || "div"; //前三行默认设置
                
                var wrap = document.getElementById(element);
                
                var water = wrap.getElementsByClassName(children);
                
                var spaceWidth = water[0].offsetWidth; //获取子元素宽度(offsetWidth会获取块级元素的padding和border)
                
                var wrapWidth = wrap.offsetWidth; //获取外框元素宽度
                
                var colNum = Math.floor(wrapWidth / spaceWidth); //计算获取外框元素所能承受列数
                
                var padding = Math.floor((wrapWidth - colNum * spaceWidth) / (colNum + 1)); //计算外框元素剩余宽度并计算左右留白
                
                var column = new Array();
                
                var maxHeight = 0;
                for (var i = 0; i < colNum; i++) { //初始化数组来计算各列初始top值和left值
                    column[i] = new Object();
                    column[i].top = space;
                    column[i].left = (spaceWidth * i) + padding * (i + 1); //计算各列距离左侧距离
                }
                for (var i = 0; i < water.length; i++) { //遍历所有子元素及瀑布流布局
                    
                    //计算该子元素属于第几列
                    if ((i+1) % colNum == 0) {
                        sub = colNum;
                    } else {
                        sub = (i+1) % colNum;
                    }
                    _this = water;
                    _this[i].style.position = "absolute";
                    _this[i].style.top = column[sub - 1].top + "px";
                    _this[i].style.left = column[sub - 1].left + "px";
                    column[sub - 1].top += _this[i].offsetHeight + space; //计算各列最新高度以便赋值
                }
                for (var i = 0; i < colNum; i++) { //获取瀑布流整体布局高度
                    if (column[i].top > maxHeight) maxHeight = column[i].top;
                }
                wrap.style.height = maxHeight + "px"; //给外框元素赋值以防止出现子元素溢出外框元素
            }

/*四位随机验证码,含小写字母，数字*/
function Rnum(num){
    var arr=[0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
    var code='';
    for(var i=0;i<num;i++){
        var idx=Math.floor(Math.random()*arr.length);
        code+=arr[idx];
    }
    return code;
}


jQuery(function(){
    /*输入框获得焦点时，lable标签隐藏,失去焦点出现,输入框有文字时也隐藏*/
    $('#search_inf').focus(function(){
        $have=$.trim($('#search_inf').val());
        $('.search_tip').css('display','none');
        if($have){
            $('#search_list').css('display','block');
        }
    })
    $('#search_inf').blur(function(){
        $have=$.trim($('#search_inf').val());
        $('.search_tip').css('display','block');
        if($have){
            $('.search_tip').css('display','none');
        }
        $('#search_list').css('display','none');
    })

    /*划过“搜索全部”（search_all），显示选项(search_kind)，并且箭头向下（up->down）,点击选项(li)可以替换搜索类别(pl)*/
        /*划过显示*/
    $('.search_all').on('mouseover',function(){
        $('.search_kind').css('display','block');
        $('.search_all .wh').css('transform','rotate(180deg)');
    })
    $('.search_all').on('mouseout',function(){
        $('.search_kind').css('display','none');
        $('.search_all .wh').css('transform','rotate(0deg)');
    })

    /*替换搜索类别*/
    for(var i=0;i<$('.search_option li').length;i++){
        $('.search_option li').eq(i).click(function(){
            $('.search_all .pl').text($(this).find('span').text());

            /*点击样式*/
            for(var j=0;j<$('.search_option li').length;j++){
                $('.search_option li').eq(j).find('b').css('opacity','0');
                $('.search_option li').eq(j).css('color','black').addClass('cs');
            }
            $(this).find('b').css('opacity','1');
            $(this).css('color','red').removeClass('cs');
        })
    }

    /*套用百度模糊查询（29ajax11-15）,为了美观，需要等ul有内容时才给边框*/
    $('#search_inf').on('keyup',function(){
        $.ajax({
            url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
            dataType: 'jsonp',
            jsonp: 'cb',
            data: {
                wd: $('#search_inf').val()
            },
            success: function(result) {
                var data=result.s;
                var html='';
                for(var i=0;i<data.length;i++){
                    html+='<li>'+data[i]+'</li>';
                }
                $('#search_list').html(html);
                $('#search_list').css('display','block');
            },
            error: function(err) {
                alert(err);
            }
        });
    });
})

/*小数乘法*/
function accMul(arg1,arg2){ 
var m=0,s1=arg1.toString(),
s2=arg2.toString(); 
try{
m+=s1.split(".")[1].length}catch(e){} 
try{
m+=s2.split(".")[1].length}catch(e){} 
return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m
)}
