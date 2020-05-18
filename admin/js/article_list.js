$(function () {
    // 发送请求获取文章分类
    $.ajax({
        type: 'get',
        url: BigNew.category_list,
        success: function (res) {
            var htmlStr = template('categoryList', res)
            $('#selCategory').html(htmlStr)
        }
    })
    // 2.显示页面中的所有文章数据
    getDataByParams({
        key: $('#key').val(),
        type: $('#selCategory').val(),
        state: $('#selStatus').val(),
        page: 1,
        perpage: 7
    })

    // 封装一个根据不同参数获取数据的函数
    function getDataByParams(obj) {
        $.ajax({
            type: 'get',
            url: BigNew.article_query,
            data: obj,
            success: function (res) {
                console.log(res);
                if (res.code == 200) {
                    var htmlStr = template('articleList', res.data)
                    $('tbody').html(htmlStr)

                    // 数据响应回来 启用分页功能
                    pagination(res.data.totalPage)
                }

            }
        })
    }

    // 给筛选按钮注册事件
    $('#btnSearch').on('click', function (e) {
        // 阻止默认行为
        e.preventDefault()

        // 调用函数来获取数据
        getDataByParams({
            key: $('#key').val(),
            type: $('#selCategory').val(),
            state: $('#selStatus').val(),
            page: 1,
            perpage: 10
        })
    })
    // 4.实现分页功能
    function pagination(totalPages, visiblePages) {
        $('#pagination-demo').twbsPagination({
            totalPages: totalPages,//总页数
            visiblePages: visiblePages || 7, //可见最大页数
            first: '首页',
            last: '尾页',
            next: '下一页',
            prev: '上一页',
            initiateStartPageClick: false,//不要默认点击
            onPageClick: function (event, page) {
                getDataByParams({
                    key: $('#key').val(),
                    type: $('#selCategory').val(),
                    state: $('#selStatus').val(),
                    page: page,
                    perpage: 7
                })
            }
        })
    }
})