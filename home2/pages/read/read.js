route.controller('ReadCtrl', ['$scope', "$routeParams", "$http", function ($scope, $routeParams, $http) {
    //通过判断背景色来改变刷新时默认的背景色
    if (localStorage.bgcolor) {
        $('.w-38').css('background-color', localStorage.bgcolor);
    }
    else {
        $('.w-38').css('background-color', '#FFA757');
    }

    //设置阅读提醒dd
    if (localStorage.tixing == 1) {
        setInterval(function () {
            $('.tixing').text('您已经阅读15分钟喽，请注意休息');
            $('.tixing').css('opacity', '1').delay(2000).queue(function () {
                $(this).css('opacity', '0').dequeue();
            })
        }, 150000)
    }
    if (localStorage.tixing == 2) {
        setInterval(function () {
            $('.tixing').text('您已经阅读30分钟喽，请注意休息');
            $('.tixing').css('opacity', '1').delay(2000).queue(function () {
                $(this).css('opacity', '0').dequeue();
            })
        }, 300000)
    }
    if (localStorage.tixing == 3) {
        setInterval(function () {
            $('.tixing').text('您已经阅读60分钟喽，请注意休息');
            $('.tixing').css('opacity', '1').delay(2000).queue(function () {
                $(this).css('opacity', '0').dequeue();
            })
        }, 600000)
    }
    $scope.id = $routeParams.id;
    $scope.search = $routeParams.search;
    $scope.examp = $routeParams.id;
    $scope.ids = parseInt($routeParams.ids) + 1;
    var index1 = 1;
    //计算每一页需要的页数
    var wh = $(document).width() - 11.5 - 11.5;
    var hg = $(document).height() - 21;
    var lg = 24;
    var font = 16;
    var row = Math.floor(hg / lg);
    var cols = Math.floor(wh / (font + 1));
    var zishu = row * cols;
    $scope.zishu = zishu;
    //定义下方所需的一些变量
    var page1, pageM, bili1;
    // $scope.allpages;
    $scope.localpage;
    $scope.idpage = [];
    $scope.bookid = [];
    $scope.bookpage = [];
    $scope.updatepage = [];
    $scope.content;
    //解析localStorage.page 返回bookid bookpage两个数组
    function checkHistory() {
        $scope.localpage = localStorage.page.split(';');
        for (var i = 0; i < $scope.localpage.length - 1; i++) {
            $scope.idpage[i] = $scope.localpage[i].split(':');
        }
        for (var j = 0; j < $scope.idpage.length; j++) {
            $scope.bookid[j] = $scope.idpage[j][0];
            $scope.bookpage[j] = $scope.idpage[j][1];
        }
    }

    localStorage.word = localStorage.word ? localStorage.word : '16';
    //读取本地阅读历史记录
    function readHistory() {
        if (localStorage.page) {
            checkHistory();
            if ($scope.bookid.indexOf('' + $scope.examp + '') > -1) {
                page = $scope.bookpage[$scope.bookid.indexOf($scope.examp)];
            } else {
                page = 0;
            }
        } else {
            page = 0;
        }
        return page;
    }

    //修改本地阅读历史记录
    function updateHistory(page) {
        checkHistory();
        $scope.updatepage = '';
        $scope.bookpage[$scope.bookid.indexOf($scope.examp)] = page;
        for (var i = 0; i < $scope.bookpage.length; i++) {
            $scope.updatepage += $scope.bookid[i] + ':' + $scope.bookpage[i] + ';'
        }
        localStorage.page = $scope.updatepage;
    }

    //添加本地阅读历史记录
    function addHistory() {
        if (localStorage.page) {
            checkHistory();
            if ($scope.bookid.indexOf('' + $scope.examp + '') > -1) {

            } else {
                localStorage.page += $scope.examp + ':' + '0;';
            }
        } else {
            localStorage.page = $scope.examp + ':' + '0;';
        }
    }

    addHistory();
    //章节名和对应行文字变量声明
    $scope.str0;
    $scope.str1;

    /*localStorage.bian代表是否是从目录页跳转过来
     若是传书id
     若不是 则需要传递书的id和计算后的每一页的字体个数
     */
    if (localStorage.bian == 1) {
        var read = $http({
            url: hosturl + "books/bookpaging?id=" + $scope.id + "&vid=" + $scope.ids,
            method: "get"
        }).success(function (res) {
            localStorage.bian = 0;
            index1 = $scope.ids;
        }).error(function (data) {

        });
    } else {
        var read = $http({
            url: hosturl + "books/bookpaging?id=" + $scope.examp,
            method: "get"
        }).success(function (res) {

        }).error(function (data) {

        });
    }
    read.then(function (res1) {
        //将获取得到的数据赋值给$scope.my
        $scope.my = res1.data;
        //点击 -> 头部和底部的显示和隐藏
        $(".zhengwen").on('click', function () {
            $('#header').toggle();
        });
        $(".zhengwen").on('click', function () {
            $('#end').toggle();
        });
        $(".zhengwen").on('click', function () {
            $('.biji_icon').toggleClass('active');
        });
        $(".circles2").on('click', function () {
            $('#s-43').show();
        });
        $(".zhengwen").on('touchstart', function () {
            $('#s-43').hide();
        });
        $(".circles3").on('touchstart', function () {
            $('#s-44').show();
        });
        $(".zhengwen").on('touchend', function () {
            $('#s-44').hide();
        });
        //点击加入书签  再次点击取消书签
        var shuqian = 0;
        $('#header').on('click', '.biaoqian', function () {
            shuqianAdd();
        })
        //发送请求获取下4页的内容
        var shuju, cc;

        function reNext(page) {
            var next = $http({
                url: hosturl + "books/bookpaging?id=" + $scope.examp,
                method: "get"
            }).success(function (data) {

            }).error(function (data) {

            })
            next.then(function (data) {
                cc = data.data;
            })
        }

        //发送请求获取上4页的内容
        function rePrev(page) {
            var prev = $http({
                url: hosturl + "books/bookpagingprev?id=" + $scope.examp + "&page=" + page + "&num=" + $scope.zishu,
                method: "get"
            }).success(function (data) {

            }).error(function (data) {

            })
            prev.then(function (data) {
                cc = data.data;
            })
        }

        //图书翻页的函数
        function fanye() {
            // 手指滑动事件
            var start, end;
            var ind = 0;
            //滑动开始的时候
            $('.lunbo').on('touchstart', '.item', function (e) {
                start = parseInt(e.originalEvent.changedTouches[0].pageX);
            })
            //滑动结束的时候
            $('.lunbo').on('touchend', '.item', function (e) {
                end = parseInt(e.originalEvent.changedTouches[0].pageX);
                var move = end - start;
                var length = $('.lunbo').find('.item').length;
                var page = parseInt($(this).attr('page'));
                page1 = page;
                //翻到下一页
                if (move < 0 && (Math.abs(move) > 100)) {
                    ind++;
                    $('.lunbo .item').removeClass('r-o').removeClass('r-i').removeClass('l-o').removeClass('l-i');
                    updateHistory(page);
                    //翻页改变进度条位置
                    var width = $('#end .jindutiao').width();
                    $("#end .jindutiao .btn").css({left: widPro + "px"});
                    $("#end .jindutiao .jd ").css({width: widPro + 'px'});

                    if (ind == length) {
                        ind = 0;
                        reNext(page);
                        setTimeout(function () {
                            $scope.lunbo = cc;
                            $('.lunbo .item').removeClass('hide');
                            $('.lunbo .item').eq(0).addClass('r-i');
                            $scope.$apply();
                            if (localStorage.bgcolor) {
                                $('.lunbo .item').css('background-color', localStorage.bgcolor);
                                $('.lunbo .item .shuming-name').css('background-color', localStorage.bgcolor);
                                $('.lunbo .item').css('color', localStorage.forcolor);
                                $('.lunbo .item .shuming-name').css('color', localStorage.forcolor);
                                $('.lunbo .item .changxian').css('background-color', localStorage.forcolor);
                                $('.bj ul li .top').removeClass('active');
                                $('.bj ul li .top').eq(localStorage.index).addClass('active');
                            }
                            else {
                                $('.item').css('background-color', '#FFA757');
                            }
                        }, 1000);
                        //手动刷新页面
                    }
                    if (ind == length - 3) {
                        reNext(page + 3);
                    }
                    $(this).addClass('r-o').delay(800).queue(function () {
                        $(this).addClass('hide').dequeue();
                    });
                    $(this).next().addClass('r-i');
                }
                if (move > 100) {
                    ind--;
                    updateHistory(page - 2);
                    //翻页改变进度条位置
                    var width = $('#end .jindutiao').width();
                    $("#end .jindutiao .btn").css({left: widPro + "px"});
                    $("#end .jindutiao .jd ").css({width: widPro + 'px'});
                    $('.lunbo .item').removeClass('l-o').removeClass('l-i').removeClass('r-o').removeClass('r-i');
                    if (page == 0) {
                        location.reload();
                    }
                    if (ind < 0) {
                        rePrev(page);
                        ind = length - 1;
                        setTimeout(function () {
                            $scope.lunbo = cc;
                            //手动刷新页面
                            $scope.$apply();
                            $('.lunbo .item').addClass('hide');
                            $('.lunbo .item').eq(length - 1).removeClass('hide').addClass('l-i');
                            if (localStorage.bgcolor) {
                                $('.lunbo .item').css('background-color', localStorage.bgcolor);
                                $('.lunbo .item .shuming-name').css('background-color', localStorage.bgcolor);
                                $('.lunbo .item').css('color', localStorage.forcolor);
                                $('.lunbo .item .shuming-name').css('color', localStorage.forcolor);
                                $('.lunbo .item .changxian').css('background-color', localStorage.forcolor);
                                $('.bj ul li .top').removeClass('active');
                                $('.bj ul li .top').eq(localStorage.index).addClass('active');
                            }
                            else {
                                $('.item').css('background-color', '#FFA757');
                                $('.lunbo .item .shuming .shuming-name').css('background-color', '#FFA757');
                            }
                        }, 1000);
                    }
                    if (ind == length - 2) {

                    }
                    if (ind == 0) {

                    }
                    $(this).addClass('l-o');
                    $(this).prev().removeClass('hide').addClass('l-i');
                }
            })
        }

        fanye();

        $('.book .content .novels .title p').css('font-size', '' + (localStorage.word) + 'px');
        $('.book .content .novels .wenzhang-inner p').css('font-size', '' + (localStorage.word) + 'px');
        $("#word-size").css({left: localStorage.progress + "px"});
        $("#word-jd").css({width: localStorage.progress + 'px'});
        //改变字体大小和行间距的函数
        var start, s;

        function zihao() {
            //改变字号
            var zihao, line;
            $("#word-size").on("touchstart", function (e) {
                start = parseInt(e.originalEvent.changedTouches[0].pageX);
                //获取left的值
                s = parseInt($(this).css("left"));
                $(this).on("touchmove", function (e) {
                    var end = parseInt(e.originalEvent.changedTouches[0].pageX);
                    var width = $(this).parent().width();
                    var move = end - start;
                    localStorage.progress = s + move;
                    if (localStorage.progress > 0 && localStorage.progress < width) {
                        $(this).css({left: localStorage.progress + "px"});
                        $("#word-jd").css({width: localStorage.progress + 'px'});
                        zihao = parseInt(22 * ((s + move) / width) + 16);
                        localStorage.word = zihao;
                        $('.book .content .novels .title p').css('font-size', '' + (localStorage.word) + 'px');
                        $('.book .content .novels .wenzhang-inner p').css('font-size', '' + (localStorage.word) + 'px');
                    } else {
                        localStorage.progress = 0;
                        $(this).css({left: localStorage.progress + "px"});
                        $("#word-jd").css({width: localStorage.progress + 'px'});
                    }
                });
                /*$(document).on("touchend", function (e) {
                 $("#word-size").off("touchmove");
                 });*/
                $(this).on("touchend", function (e) {
                    $("#word-size").off("touchmove");
                });
            })
        }

        zihao()

        //获取当前进度下的阅读页
        function getRead(page) {
            var getRead = $http({
                url: hosturl + "books/bookpagingnext?id=" + $scope.examp + "&page=" + page + "&num=" + $scope.zishu,
                method: "get"
            }).success(function (data) {

            }).error(function (data) {

            })
            getRead.then(function (data) {
                cc = data.data;
            })
        }

        var start, end, s;
        //改变阅读进度
        $('#end .btn').on('touchstart', function (e) {
            var start = parseInt(e.originalEvent.changedTouches[0].pageX);
            //获取left的值
            s = parseInt($(this).css("left"));
            $(this).on("touchmove", function (e) {
                end = parseInt(e.originalEvent.changedTouches[0].pageX);
                var width = $(this).parent().width();
                var move = end - start;
                localStorage.progress = s + move;
                if (localStorage.progress > 0 && localStorage.progress < width) {
                    $(this).css({left: localStorage.progress + "px"});
                    $("#end .jindutiao .jd ").css({width: localStorage.progress + 'px'});
                    var bili = localStorage.progress / width;
                    bili1 = bili.toFixed(2) * 1;
                } else {
                    localStorage.progress = 0;
                    $(this).css({left: localStorage.progress + "px"});
                    $("#end .jindutiao .jd ").css({width: localStorage.progress + 'px'});
                }
            })
        })

        $("#end .btn").on("touchend", function (e) {
            $(this).off("touchmove");
            pageM = Math.floor($scope.allpages * bili1);
            updateHistory(pageM);
            getRead(pageM);
            setTimeout(function () {
                $scope.lunbo = cc;
                //手动刷新页面
                $scope.$apply();
                if (localStorage.bgcolor) {
                    $('.lunbo .item').css('background-color', localStorage.bgcolor);
                    $('.lunbo .item .shuming-name').css('background-color', localStorage.bgcolor);
                    $('.lunbo .item').css('color', localStorage.forcolor);
                    $('.lunbo .item .shuming-name').css('color', localStorage.forcolor);
                    $('.lunbo .item .changxian').css('background-color', localStorage.forcolor);
                    $('.bj ul li .top').removeClass('active');
                    $('.bj ul li .top').eq(localStorage.index).addClass('active');
                }
                else {
                    $('.item').css('background-color', '#FFA757');
                }
            }, 300);
        });


        //改变屏幕亮度
        $('#yuedu').on('touchstart', function (e) {
            var start = parseInt(e.originalEvent.changedTouches[0].pageX);
            //获取left的值
            var s = parseInt($(this).css("left"));
            $(this).on("touchmove", function (e) {
                var end = parseInt(e.originalEvent.changedTouches[0].pageX);
                var width = $(this).parent().width();
                var move = end - start;
                if ((s + move) > 0 && (s + move) < width) {
                    $(this).css({left: s + move + "px"});
                    $(this).prev().css({width: s + move + 'px'});
                }
            })
            $(document).on("touchend", function (e) {
                $("#yuedu").off("touchmove");
            })
        })

        //点击改变背景颜色
        //设置定时器目的是选中渲染之后的元素
        setTimeout(function () {
            //存储记录背景色
            if (localStorage.bgcolor) {
                $('.w-38').css('background-color', localStorage.bgcolor);
                $('.book .content .shuming .shuming-name').css('background-color', localStorage.bgcolor);
                $('.w-38').css('color', localStorage.forcolor);
                $('.book .content .shuming .shuming-name').css('color', localStorage.forcolor);
                $('.book .content .shuming .changxian').css('background-color', localStorage.forcolor);
                $('.bj ul li .top').removeClass('active');
                $('.bj ul li .top').eq(localStorage.index).addClass('active');
                $('.book .content .load a').css('color', localStorage.forcolor);
            }else {
                $('.item').css('background-color', '#FFA757');
                $('.lunbo .item .shuming .shuming-name').css('background-color', '#FFA757');
            }
        }, 1);
        $('.bj ul li:eq(1)').find('.top').addClass('active');
        $('.bj ul li .top').on('click', function (e) {
            for (var i = 0; i < $('.bj ul li').length; i++) {
                $('.bj ul li .top').removeClass('active');
            }
            $(this).addClass('active');
            var color = $(this).css('background-color');
            localStorage.bgcolor = color;
            $('.w-38').css('background', '' + localStorage.bgcolor + '');
            $('.book .content .shuming .shuming-name').css('background', '' + localStorage.bgcolor + '');
            $('.book .content .shuming .changxian').css('background', '' + localStorage.bgcolor + '');
            var index = $(this).parent().index();
            localStorage.index = index;

            var color = ['#ffffff', '#1A0000', '#000000', '#5B4A2E', '#773400', '#9E7B58'];
            var bgImg=['/book/home2/images/reader/02.jpg','/book/home2/images/reader/03.png','/book/home2/images/reader/05.jpg','/book/home2/images/reader/06.png','/book/home2/images/reader/07.png','/book/home2/images/reader/08.png'];
            console.log(index);
            if(index>5){
                $('.w-38').css({'background':'url('+bgImg[index-6]+') 0 0 repeat'});
            }
            localStorage.forcolor = color[index];
            $('.book .content .shuming .shuming-name').css('color', '' + color[index] + '');
            $('.book .content .novels').css('color', '' + color[index] + '');
            $('.book .content .shuming .changxian').css('background-color', '' + color[index] + '');
            $('.book .content .load a').css('color', '' + color[index] + '');
        })

        //上拉刷新 获取下一章的内容
        $('.book').on('touchstart', function () {
            $(this).on('touchmove', function () {

            })
        })
        $('.book').on('touchend', function () {
            var offsetTop = parseInt(Math.abs($('.book .wenzhang-inner').offset().top));
            var hei = $(document).height();
            var height = parseInt($('.book .novels').css('height'));

            if (offsetTop > (height - hei - (localStorage.word) - 16 * 3)) {
                index1++;
                $('.tixing').text('疯狂刷新中！！！');
                $('.tixing').addClass('active');
                var load = $http({
                    url: hosturl + "books/bookpaging?id=" + $scope.examp + "&vid=" + index1,
                    method: "get"
                }).success(function (res) {

                }).error(function (data) {

                });
                load.then(function (data) {
                    if (data.data) {
                        $("<div class='title'><p style='font-size:" + localStorage.word + "px;'>" + data.data.title + "</p></div><div class='wenzhang-inner'><p style='font-size:" + localStorage.word + "px;'>" + data.data.content + "</p></div>").appendTo('.novels');
                        $('.tixing').removeClass('active');
                    } else {
                        $('.load a').text('已到达文章末尾！');
                        $('.tixing').text('已经没有更多内容！');
                        $('.tixing').removeClass('active');
                    }
                })
            }
        })

        //下拉刷新 获取下一章的内容
        $('.book').on('touchstart', function () {
            $(this).on('touchmove', function () {

            })
        })
        $('.book').on('touchend', function () {
            /*var offsetTop = parseInt(Math.abs($('.book .wenzhang-inner').offset().top));
            var hei = $(document).height();
            var height = parseInt($('.book .novels').css('height'));
            if (offsetTop > (height - hei - (localStorage.word) - 16 * 3)) {
                index1++;
                $('.tixing').text('疯狂刷新中！！！');
                $('.tixing').addClass('active');
                var load = $http({
                    url: hosturl + "books/bookpaging?id=" + $scope.examp + "&vid=" + index1,
                    method: "get"
                }).success(function (res) {

                }).error(function (data) {

                });
                load.then(function (data) {
                    if (data.data) {
                        $("<div class='title'><p style='font-size:" + localStorage.word + "px;'>" + data.data.title + "</p></div><div class='wenzhang-inner'><p style='font-size:" + localStorage.word + "px;'>" + data.data.content + "</p></div>").appendTo('.novels');
                        $('.tixing').removeClass('active');
                    } else {
                        $('.load a').text('已到达文章末尾！');
                        $('.tixing').text('已经没有更多内容！');
                        $('.tixing').removeClass('active');
                    }
                })
            }*/
            var scroll=$(this).scrollTop();
            if(scroll<20){
                // console.log($('this').find('.novels .title:first'));
            }
        })

        //点击上一章下一章跳转页面
        var syz = $('.syz');
        var xyz = $('.xyz');
        //上一章
        syz.on('click', function () {

        })
        //点击下一章跳转到文章的下一章
        xyz.on('click', function () {

        })


        // 加入书签请求
        function shuqianAdd() {
            console.log($scope.examp,title1,con1);
            var promise = $http({
                url: hosturl + "user/appmymark",
                method: "POST",
                headers: "Content-Type': 'application/x-www-form-urlencoded",
                data: {id: "" + $scope.examp + "", vidname: "" + title1 + "", content: "" + con1 + ""}
            }).success(function (data) {
                $('.tixing').text('' + data.data + '');
                $('.tixing').addClass('active');
                setTimeout(function () {
                    $('.tixing').removeClass('active');
                }, 1000)
            }).error(function (data) {

            })
            promise.then(function () {

            })
        }

        //取消书签请求
        function shuqianRemove() {
            var promise = $http({
                url: hosturl + "login/applogin",
                method: "POST",
                headers: "Content-Type': 'application/x-www-form-urlencoded",
                data: {name: "" + $scope.str0 + "", content: "" + $scope.str1 + ""}
            }).success(function (data) {

            }).error(function (data) {

            })
            promise.then(function () {

            })
        }
        //夜间模式
        $('.book').on('click','.moon_icon',function () {
            $(this).toggleClass('selected');
            $('.w-38').toggleClass('dark');
            if ($('.w-38').hasClass('dark')){
                $('.w-38').css({'background-color':'rgba(0,0,0,.8)','color':'#fff'});
                $('.w-38 .book .shuming-name').css({'background-color':'rgba(0,0,0,.8)'});
                $('.w-38 .book .shuming-name').css({'color':'#fff'});
                $('.w-38 .book .changxian').css({'background-color':'#fff'});
            }else{
                $('.w-38').css({'background-color':''+localStorage.bgcolor+'','color':''+localStorage.forcolor+''});
                $('.w-38 .book .shuming-name').css({'background-color':''+localStorage.bgcolor+''});
                $('.w-38 .book .shuming-name').css({'color':''+localStorage.forcolor+''});
                $('.w-38 .book .changxian').css({'background-color':''+localStorage.forcolor+''});
            }
        })


        var title, context, con1, title1;
        // 获取鼠标滚轮距离顶部的距离
        $('.book').on('touchstart', 'p', function () {

        })
        $('.book').on('touchend', 'p', function () {
            context = $(this);
            title = $(this).parent().prev();
        })
        $('.book').scroll(function (e) {
            // 鼠标滚轮距离顶部的距离
            var st = $(this).scrollTop();
            //内容盒子高度
            if (context) {
                var conH = context.height();
            } else {
                context = $('.content .novels .wenzhang-inner').find('p');
                var conH = context.height();
                title = context.parent().prev();
            }
            title1 = title.text();
            //总体盒子高度
            var nH = $('.novels').height() + $('.shuming').height() + parseInt($('.content').css('padding-top'));
            //内容盒子距离顶部高度(差值)
            var cH = nH - conH;
            //鼠标滚轮距离内容盒子的距离
            var sH = st - cH;
            if (sH < 0) {
                sH = 0;
            }
            // sH=sH>0?sH:0;
            var font = parseInt(context.css('font-size'));
            var width = parseInt(context.css('width'));
            var zishu = parseInt(width / font);
            var line = parseInt(context.css('line-height'));
            var hangshu = parseInt(sH / line);
            //对应文本内容
            var con = context.text();
            //截取到对应高度的文字
            con1 = context.text().slice((zishu * hangshu), (zishu * hangshu + zishu));
            // console.log(hangshu);
            //对应章节标题
        })

        //添加笔记
        $('.book').on('touchstart', '.biji_icon', function () {
            $('.biji').fadeIn("slow");
        })
        //笔记添加完成
        $('.biji .confirm').on('touchstart', function () {
            var val = $('.biji textarea').val();
            console.log(val);
            var request = $http({
                url: hosturl + "user/addmynote",
                method: "POST",
                headers: "Content-Type': 'application/x-www-form-urlencoded",
                data: {
                    content: "" + val + "",
                    vname: "" + title1 + "",
                    books_id: "" + $scope.examp + "",
                    text: "" + con1 + ""
                }
            }).success(function (data) {
                
            }).error(function (data) {

            })
            request.then(function (data) {
                if (data.data.state > 0) {
                    $('.biji').delay(500).fadeOut('slow');
                }
            })
        })
        //取消添加笔记
        $('.biji .cancel').on('touchstart', function () {
            $('.biji').find('textarea').val('');
            $('.biji').fadeOut('slow');
        })
    });
}])

route.directive('readC', function ($timeout) {
    return {
        restrict: "A",
        template: '<div><div ng-transclude></div></div>',
        replace: true,
        transclude: true,
        link: function ($scope, el) {

        }
    }
})