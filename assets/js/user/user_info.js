$(function() {
    var form = layui.form;
    // 表单验证

    form.verify({
        nickname: function(value) {
            if(value.length > 6) {
                return '昵称长度必须在 1~6个字符之间'
            }
        }
    })


    initUserInfo(); 


    //初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('获取用户失败！')
                }
                console.log(res);
                //调用 form.val()方法 快速给表单赋值
                form.val('formUserInfo',res.data);
            }
        })
    }


    //重置表单事件
    $('#btnReset').on('click',function(e) {
        e.preventDefault();
        //重新初始化一下用户信息
        initUserInfo();
    })


    //发起请求更新新用户的信息
    $('.layui-form').on('submit',function(e) {
        e.preventDefault();
        //发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !== 0) {
                    return layer.msg('修改用户信息失败！')
                }
                lay.msg('更新用户信息成功！');
                //调用父页面中方法，重新渲染用户的头像和用户信息
                window.parent.getUserInfo()
            }
        })
    })

    // 重置密码模块
    
})