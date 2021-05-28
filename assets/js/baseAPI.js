//注意：每次调用$.get() $.post()或$.ajax()的时候
//会先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // console.log(options.url);


    //统一为有权限的接口，设置 headers 请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // //统一全局挂载 complete 回调函数（发起请求时除了调用 succss函数 还会调用这个函数）
    // options.complete = function(res) {
    //     //在compelte回调函数中  可以使用 res.responseJSON 拿到服务器响应回来的数据
    //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //         //1.强制清空 token
    //         localStorage.removeItem('token');
    //         //2.强制跳转到登陆页面
    //         location.href = 'login.html'
    //     }
    // }
});


