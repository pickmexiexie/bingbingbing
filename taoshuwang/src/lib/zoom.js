(function(){ 
    var EventUtil,Get; 
    EventUtil = {
        addHandler: function(ele, type, handler) {
            if (ele.addEventListener) {
                ele.addEventListener(type, handler, false)
            } else if (ele.attachEvent) {
                ele.attachEvent("on" + type, handler)
            } else {
                ele["on" + type] = handler;
            }
        },
        removeHandler: function(element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent("on" + type, handler);
            } else {
                element["on" + type] = null;
            }
        },
        getEvent: function(event) {
            return event ? event : window.event;
        },
        getTarget: function(event) {
            return event.target || event.srcElement;
        },
        preventDefault: function(event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagation: function(event){
            if (event.stopPropagation){
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        } 
    };

    Get = {
        byId: function(id) {
            return typeof id === "string" ? document.getElementById(id) : id
        },
        byClass: function(sClass, oParent) {
            var aClass = [];
            var reClass = new RegExp("(^| )" + sClass + "( |$)");
            var aElem = this.byTagName("*", oParent);
            for (var i = 0; i < aElem.length; i++) reClass.test(aElem[i].className) && aClass.push(aElem[i]);
            return aClass
        },
        byTagName: function(elem, obj) {
            return (obj || document).getElementsByTagName(elem)
        }
    }; 
 

    function MagnifierF(){ 
        this.init.apply(this,arguments);  
    }

    MagnifierF.prototype = {
        init: function(id){
            var _is = this; 
            this.magWrap = Get.byId(id);
            this.magMain = this.magWrap.children[0];
            this.mW = this.magMain.offsetWidth;
            this.mH = this.magMain.offsetHeight;
            this.magImg = this.magMain.getElementsByTagName('img')[0];
            this.mImgSrc = this.magImg.getAttribute('src').slice(0,-4);

            _is.setEventFn().dragEvent();
        },
        setEleFn: function(){   
            var _is = this,
                _html1 = "",
                oFrag = document.createDocumentFragment(),
                oFrag2 = document.createDocumentFragment(); 

            _is.oMD = document.createElement('div');
            _is.oMD.className = "MagnifierDrag"; 
            _is.oMD.style.cssText = 'width:' + _is.mW/2 +'px;height:' + _is.mH/2 + 'px;';
            _is.oMD.innerHTML = "&nbsp;";

            _is.oMP =  document.createElement('div');
            _is.oMP.className = 'MagnifierPop';
            _is.oMP.style.cssText =  'width:' + _is.mW +'px;height:' + _is.mH + 'px;right:' + (-_is.mW-10) + 'px;';  
            
            _is.oMI = document.createElement('div');
            _is.oMI.className ='MagnifierImg';
            _is.oMI.style.cssText = 'width:' + _is.mW*2 + 'px;height:' + _is.mH*2 + 'px;';
            _html1 = '<img style="width:100%;height:100%;" src="' + _is.mImgSrc + '-big.jpg">'
            _is.oMI.innerHTML = _html1; 

            _is.oMP.appendChild(_is.oMI)

            oFrag.appendChild(_is.oMD);
            oFrag2.appendChild(_is.oMP);   

            _is.magMain.appendChild(oFrag);
            _is.magWrap.appendChild(oFrag2);  

        },
        removeFn :function(){
            var _is = this;
                _is.magMain.removeChild(_is.oMD);
                _is.magWrap.removeChild(_is.oMP);  
        },
        setMousemoveFn :function(event){
            var _is = this,
                 
                _WinScrLeft = document.documentElement.scrollLeft || document.body.scrollLeft,
                _WinScrTop = document.documentElement.scrollTop || document.body.scrollTop;

                _x = event.clientX + _WinScrLeft -  
                (_is.magWrap.getBoundingClientRect().left  + _WinScrLeft) - _is.oMD.offsetWidth/2; 
                
                _y = event.clientY  + _WinScrTop - 
                (_is.magMain.getBoundingClientRect().top  + _WinScrTop) - _is.oMD.offsetHeight/2;
                
                _l = _is.magMain.offsetWidth - _is.oMD.offsetWidth;
                _t = _is.magMain.offsetHeight - _is.oMD.offsetHeight;
                
                _l2 = - (_is.oMI.offsetWidth - _is.magMain.offsetWidth);
                _t2 = - (_is.oMI.offsetHeight - _is.magMain.offsetHeight);

                if( _x < 0 )
                {
                    _x = 0;  
                }
                else if( _x > _l )
                {
                    _x = _l;
                }
                 
                if( _y < 0 )
                {
                    _y = 0;  
                }
                else if( _y > _t )
                {
                    _y = _t;
                }
                
                 
                _is.oMD.style.left = _x + "px";
                _is.oMD.style.top  = _y + "px";
                 
                
                _bigx = _x / _l;
                _bigy = _y / _t;
                    

                _is.oMI.style.left = _bigx * _l2 + "px";
                _is.oMI.style.top = _bigy * _t2 + "px";  
        },
        setEventFn: function(){
            var _is = this,
                _x = 0,
                _y = 0,
                _l = 0,
                _t = 0,
                _bigx = 0,
                _bigy = 0,
                _l2 = 0, 
                _t2 = 0;

            function handleEvent(event){
                event = EventUtil.getEvent(event);   

                switch(event.type){
                    case "mouseenter":  
                        _is.setEleFn(); 
                    break;
                    case "mousemove": 
                        if (_is.oMD) {
                            _is.setMousemoveFn(event);
                        }
                    break;
                    case "mouseleave":   
                        _is.removeFn(); 
                    break;
                } 
                
            }   
            return {
                dragEvent: function() { 

                    EventUtil.addHandler(_is.magMain, "mouseenter", handleEvent);
                    EventUtil.addHandler(_is.magMain, "mousemove", handleEvent);
                    EventUtil.addHandler(_is.magMain, "mouseleave", handleEvent);  
                } 
            }
            
        } 

    }

    window['MagnifierF'] = function(id){
        return new MagnifierF(id);
    }

})()