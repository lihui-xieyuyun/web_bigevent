$(function () {
    getUserInfo();
    //获取用户的基本信息 封装函数
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'GET',


            // headers: {
            //     Authorization: localStorage.getItem('token') || ''
            // },


            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                    // return console.log('获取用户信息失败！');
                }
                //调用renderAvatar 渲染用户的头像
                renderAvatar(res.data);
                // console.log(res.data);
            },


            
            //无论成功还是失败  最终都会调用 complete 这个回调函数
            // complete: function(res) {
            //     // console.log(res);
            //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //         //1.强制清空 token
            //         localStorage.removeItem('token');
            //         //2.强制跳转login页面
            //         location.href = 'login.html'
            //     }
            // }

            
        })
    }

    //渲染用户头像 定义renderAvatar函数
    function renderAvatar(user) {
        //1.获取用户的名称
        var name = user.nickname || user.username;
        //2.设置欢迎的文本
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        //3.按需渲染用户的头像
        if (user.user_pic !== null) {
            //3.1渲染图片头像
            $('.layui-nav-img').attr('src', user.user_pic).show();
            $('.text-avatar').hide();
        } else {
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show();
        }
    }

    //点击退出功能的操作
    var layer = layui.layer;
    $('#btnLogout').on('click', function () {
        //   console.log('ok');
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            //1.删除本地存储
            localStorage.removeItem('token');
            //2.跳回登陆页面
            location.href = 'login.html'
            layer.close(index);
        });
    })

})