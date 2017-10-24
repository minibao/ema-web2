/**
 * Created by Administrator on 2017/10/13.
 */
/**
 * 选择区服的模板
 * @type {{template: string}}
 */
var selectserver = {
    template: '<select id="select-server-role" class="weui-select" name="select1">' +
    '<option value="-1">请选择大区</option>' +
    '</select>'
}

var app = new Vue({
    el: "#app",
    data: {
        uid: '',
        serverlist: '',
        inforole: '',
        yluid: '',
        ylInfo: ''


    },
    components: {
        'select-server': selectserver
    },
    methods: {
        /**
         * 初始化
         */
        init: function () {
            //getcookie
            app.uid = util.getCookie("squid");
            //ussrdata
            if (app.uid) {
                app.userdata();
            }
            //选择英灵的区服
            app.getServerDictionaryData();
            //点击游戏区服事件
            app.changeServer();
            //默认调用一次getUserGameData
            app.getUserGameData();
        },
        /**
         * userdata
         */
        userdata: function () {
            $.ajax({
                type: 'POST',
                url: "/api/userdata",
                data: {
                    uid: app.uid
                },
                success: function (data) {
                    try {
                        //获取用户的头像
                        var headimg = data.data.icon;
                        if (headimg) {
                            $.ajax({
                                type: 'post',
                                url: headimg,
                                success: function (data) {
                                    try {
                                        $('.basic-head-img').attr("src", data);
                                    } catch (err) {

                                    }
                                }
                            });
                        }
                    } catch (err) {

                    }
                }
            })
        },
        /**
         * 获取区服信息.
         */
        getServerDictionaryData: function () {
            $.ajax({
                type: 'POST',
                url: "/api/getServerDictionaryData",
                success: function (data) {
                    app.serverlist = data.data;
                    $('#select-server-role').html("");
                    try {
                        var html_str = '<option value="-1">请选择大区</option>';
                        for (var i = 0; i < data.data.length; i++) {
                            html_str = html_str + '<option value=' + data.data[i].dataCode + '>' + data.data[i].dataName + '</option>';
                        }
                        $('#select-server-role').html(html_str);
                    } catch (err) {

                    }
                }
            });
        },
        /**
         * 区服角色级联操作.
         */
        changeServer: function () {
            $("#select-server-role").change(function () {
                app.infoserver = $("#select-server-role").val();
                console.log(app.infoserver);
                if (app.infoserver != '-1') {
                    var roledata = app.getRole();
                    console.log(roledata);
                    if (roledata) {
                        setTimeout(function () {
                            if (roledata.length > 0) {
                                app.inforoleid = $("#select-role").val();
                            }
                        }, 200)
                    }
                } else {
                    layer.msg('请先选择区服！');
                    $('#select-role').val('1');
                }
            });
        },
        /**
         * 获取角色信息.
         */
        getRole: function (server) {
            if (app.uid) {
                $.ajax({
                    type: 'POST',
                    url: "/api/getUserDataYingling",
                    async: false,
                    data: {
                        uid: app.uid,
                        server: app.infoserver
                    },
                    success: function (data) {
                        app.inforole = data.data;
                        try {
                            setTimeout(function () {
                                // $('#select-role').val(app.ssource);
                                $('#select-role option:eq(1)').prop('selected', true);
                            }, 10)
                        } catch (err) {

                        }
                    }
                });
            }
            return app.inforole;
        },
        /**
         * 查询用户游戏中的基本数据
         */
        getUserGameData: function () {
            app.server = util.getCookie("YLserver");
            app.yluid = util.getCookie("YLuid");
            if (app.server && app.yluid) {
                $.ajax({
                    type: 'POST',
                    url: "/api/getUserGameDataYingling",
                    data: {
                        uid: app.yluid,
                        server: app.server
                    },
                    success: function (data) {
                        try {
                            console.log(data);
                            app.ylInfo = data.data.data;
                        } catch (err) {

                        }
                    }
                });
            } else {
                $('#gainingmask ').removeClass('bounceOutDown');
                $('.sendlottery').show();
            }
        }
    }
})

app.init();

$(document).ready(function () {
    //区服选择完成，开始查看战绩
    $('#gainingmask .gbtn').click(function () {
        util.setCookie("YLserver", $('#select-server-role').val());
        util.setCookie("YLuid", $('#select-role').val());
        app.getUserGameData();
        $('.sendlottery').hide();
    })

    //区服选择完成，取消
    $('#gainingmask .gbtn1').click(function () {
        $('#gainingmask ').removeClass('bounceOutDown');
        $('#gainingmask ').addClass('bounceOutDown');
        setTimeout(function () {
            $('.sendlottery').hide();
        }, 1000)

    })

    //点击详细(动态绑定)
    $(".heros-detail").on("click", ".detail-cl", function () {
        var lasttime = $(this).attr('lasttime');
        console.log(lasttime);
    });

    //点击选择区服按钮
    $('.select-server-btn').click(function () {
        $('#gainingmask ').removeClass('bounceOutDown');
        $('.sendlottery').show();
    })

})
