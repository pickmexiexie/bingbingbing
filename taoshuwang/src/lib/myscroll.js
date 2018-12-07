$.fn.myscroll = function(opations) {
    var defaults = {
        picEl: this.find('div').first(),
        ctrlEl: this.find('div').last(),
        libs: true,
        arrows: true,
        autoPlay: true,
        time: 2000,
        effect: 'left',
        speed: 400
    }
    var settings = $.extend(defaults, opations);
    return function() {
        var $timer = null;
        var $index = 0;
        var $over = true;
        var $moveWrap = settings.picEl.find('ul');
        var $moveWrapChild = $moveWrap.children('li');
        var $moveVal = 0;
        var $maxNum = $moveWrap.children('li').length;
        var $oCtrl = settings.ctrlEl;
        var $libsHtml = '';
        var $arrowsHtml = '';
        var $oLibs = {};
        var $effect = settings.effect;
        var $moveArgs1 = {};
        var $moveArgs2 = {};
        var $moveArgs3 = {};
        var $autoPlay = settings.autoPlay;
        var $playTime = settings.time;
        var $playSpeed = settings.speed;
        var $isLibs = settings.libs;
        var $isArrows = settings.arrows;
        if ($isLibs) {
            creatLibs()
        }

        function creatLibs() {
            for (var i = 0; i < $maxNum; i++) {
                $libsHtml += '<span class="libs lib' + (i + 1) + '" data-value="' + i + '">'+(i+1)+'</span>'
            }
            $oCtrl.append($libsHtml);
            $oLibs = $oCtrl.children('.libs');
            $oLibs.first().addClass('active')
        }
        if ($isArrows) {
            creatArrows()
        }

        function creatArrows() {
            var $arrowsHtml = '<span class="arrow prev"><</span><span class="arrow next">></span>';
            $oCtrl.append($arrowsHtml)
        }
        if ($effect == 'left') {
            $moveVal = $moveWrap.children('li').find('img').width();
            $moveArgs1 = {
                left: $moveVal
            }
            $moveArgs2 = {
                left: -$moveVal
            }
            $moveArgs3 = {
                left: 0
            }
            initAllLi();
            picMoveChange()
        } else if ($effect == 'top') {
            $moveVal = $moveWrap.children('li').find('img').height();
            $moveArgs1 = {
                top: $moveVal
            }
            $moveArgs2 = {
                top: -$moveVal
            }
            $moveArgs3 = {
                top: 0
            }
            initAllLi();
            picMoveChange()
        } else {
            $moveArgs1 = {
                'opacity': 0
            }
            $moveArgs2 = {
                'opacity': 1
            }
            initAllLi();
            picFadeChange()
        }

        function initAllLi() {
            $moveWrapChild.each(function(index, el) {
                if (index > 0) {
                    $(el).css($moveArgs1)
                }
            })
        }

        function picMoveChange() {
            $oCtrl.on('mouseover', 'span', function() {
                if ($(this).attr('class') == "arrow prev") {
                    if ($over) {
                        $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                        --$index;
                        $index < 0 ? $index = $maxNum - 1 : $index;
                        $moveWrapChild.eq($index).css($moveArgs2).stop().animate($moveArgs3, $playSpeed, function() {
                            overFunc(true)
                        });
                        if ($isLibs) {
                            libsChange($index)
                        }
                    }
                    overFunc(false)
                } else if ($(this).attr('class') == 'arrow next') {
                    if ($over) {
                        moveNext()
                    }
                    overFunc(false)
                } else {
                    if ($over) {
                        var $that = $(this).attr('data-value');
                        if ($that > $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed);
                            $moveWrapChild.eq($that).css($moveArgs1)
                        } else if ($that < $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                            $moveWrapChild.eq($that).css($moveArgs2)
                        }
                        $index = $that;
                        $moveWrapChild.eq($index).stop().animate($moveArgs3, $playSpeed, function() {
                            overFunc(true)
                        });
                        if ($isLibs) {
                            libsChange($index)
                        }
                    }
                    overFunc(false)
                }
            })
        }

        function picFadeChange() {
            $oCtrl.on('click', 'span', function(event) {
                if ($(this).attr('class') == "arrow prev") {
                    if ($over) {
                        $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
                        --$index;
                        $index < 0 ? $index = $maxNum - 1 : $index;
                        $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed, function() {
                            overFunc(true)
                        });
                        if ($isLibs) {
                            libsChange($index)
                        }
                    }
                    overFunc(false)
                } else if ($(this).attr('class') == 'arrow next') {
                    if ($over) {
                        fadeNext()
                    }
                    overFunc(false)
                } else {
                    if ($over) {
                        var $that = $(this).attr('data-value');
                        if ($that > $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed)
                        } else if ($that < $index) {
                            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed)
                        }
                        $index = $that;
                        $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed, function() {
                            overFunc(true)
                        });
                        if ($isLibs) {
                            libsChange($index)
                        }
                    }
                    overFunc(false)
                }
            })
        }
        if ($autoPlay) {
            autoPlay()
        }

        function autoPlay() {
            clearInterval($timer);
            $timer = setInterval(function() {
                if ($effect == 'fade') {
                    fadeNext()
                } else {
                    moveNext()
                }
            }, $playTime)
        }
        $oCtrl.hover(function() {
            clearInterval($timer)
        }, function() {
            clearInterval($timer);
            if ($autoPlay) {
                autoPlay()
            }
        });

        function moveNext() {
            $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed);
            ++$index;
            $index %= $maxNum;
            $moveWrapChild.eq($index).css($moveArgs1).stop().animate($moveArgs3, $playSpeed, function() {
                overFunc(true)
            });
            if ($isLibs) {
                libsChange($index)
            }
        }

        function fadeNext() {
            $moveWrapChild.eq($index).stop().animate($moveArgs1, $playSpeed);
            ++$index;
            $index %= $maxNum;
            $moveWrapChild.eq($index).stop().animate($moveArgs2, $playSpeed, function() {
                overFunc(true)
            });
            if ($isLibs) {
                libsChange($index)
            }
        }

        function libsChange(val) {
            $oLibs.removeClass('active').eq(val).addClass('active')
        }

        function overFunc(val) {
            $over = val
        }
    }(jQuery)
}