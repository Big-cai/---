$(function () {
    // 1.立即向服务器发送请求
    $.ajax({
        type: 'get',
        url: BigNew.user_info,
        // headers: {
        //     'Authorization': localStorage.getItem('token')
        // },
        success: function (res) {
            // 2.请求成功回来数据后渲染到页面
            if (res.code == 200) {
                // 2.1显示用户名
                $('.user_info span i').text(res.data.nickname)

                // 2.2显示登陆的头像
                $('.user_info img').attr('src', res.data.userPic)

                // 2.3个人中心的图片也设置一样
                $('.user_center_link img').attr('src', res.data.userPic)
            }
        }
    })

    // 退出功能
    // 1.给退出按钮注册事件
    $('.logout').on('click', function () {
        // 2.退出，然后删除本地存储中的token
        localStorage.removeItem('token')
        // 3.跳转到登陆页面
        window.location.href = './login.html'
    })

    // 主页面左侧高亮显示
    $('.menu .level01').on('click', function () {
        // 单击当前的div添加类，其余移除类
        $(this).addClass('active').siblings().removeClass('active')

        // 单击文章管理，展开和合并切换
        if ($(this).index() == 1) {
            $('.menu .level02').slideToggle()//实现切换

            // 3.4右侧的下拉图标进行切换
            $(this).find('b').toggleClass('rotate0')

            // 只要展开文章管理 就让第一个li高亮显示
            $('.menu .level02 li:eq(0)').trigger('click')
        }
    })

    // 点击文章管理里面的li标签时，高亮显示
    $('.menu .level02 li').on('click', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

})