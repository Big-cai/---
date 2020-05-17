$(function () {
    // 1.给form表单注册事件
    $('.login_form').on('submit', function (e) {
        // 2.阻止默认提交行为
        e.preventDefault()

        // 3.发送ajax请求
        $.ajax({
            type: 'post',
            url: BigNew.user_login,
            data: $(this).serialize(),
            beforeSend: function () {
                // 4.发送请求之前验证用户名和密码是否为空
                var flag = false
                $('.login_form input[name]').each(function (index, ele) {
                    if ($.trim($(ele).val()) == '') {
                        flag = true
                    }
                })
                if (flag) {
                    $('.modal').modal('show')
                    $('.modal-body p').html('输入的用户名或密码不能为空')
                    return false;
                }
            },
            success: function (res) {
                $('.modal').modal('show')
                $('.modal-body p').text(res.msg)
                if (res.code == 200) {
                    $('.modal').on('hidden.bs.modal', function (e) {
                        localStorage.setItem('token', res.token)
                        window.location.href = './index.html'
                    })
                }
            }
        })
    })
})