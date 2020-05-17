$(function () {
    // 1.发送请求获取数据，渲染页面
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            if (res.code == 200) {
                var htmlStr = template('categoryList', res)
                $('tbody').html(htmlStr)
            }
        }
    })

    // 弹出模态框
    $('#xinzengfenlei').on('click', function () {
        $('.modal').modal('show')
    })
})