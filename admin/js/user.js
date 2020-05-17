$(function () {
    // 1. 发请求获取数据，渲染到页面上
    // 1.1  向服务器端发送请求
    $.ajax({
        type: 'get',
        url: BigNew.user_detail,
        // headers: {
        //     'Authorization': localStorage.getItem('token')
        // },
        success: function (res) {
            console.log(res)
            //将数据渲染到页面上
            if (res.code == 200) {

                for (var key in res.data) {
                    $('#form .' + key).val(res.data[key])
                }
                $('#form .user_pic').attr('src', res.data.userPic)

            }
        }
    })


    // 2. 个人中心页面实现图片预览
    $('#exampleInputFile').on('change', function () {
        // console.dir(this.files[0])
        var file = this.files[0] // 获取待上传的文件
        // URL.createObjectURL会将待上传的文件生成一个可浏览的地址
        var url = URL.createObjectURL(file)

        // 在图片上渲染出来 预览待上传的图片
        $('#form .user_pic').attr('src', url)
    })
    $('#form').on('submit', function (e) {
        e.preventDefault()
        var data = new FormData(this)


        $.ajax({
            type: 'post',
            url: BigNew.user_edit,
            // headers: {
            //     'Authorization': localStorage.getItem('token')
            // },
            data: data,
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.code == 200) {

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
                                parent.$('.user_info span i').text(res.data.nickname)

                                // 2.2显示登陆的头像
                                parent.$('.user_info img').attr('src', res.data.userPic)

                                // 2.3个人中心的图片也设置一样
                                parent.$('.user_center_link img').attr('src', res.data.userPic)
                            }
                        }
                    })
                }
            }
        })
    })
})
