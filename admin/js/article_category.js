$(function () {
    // 1.发送请求获取数据，渲染页面
    render()
    function render() {
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
    }
    // 弹出模态框
    $('#xinzengfenlei').on('click', function () {
        $('#myForm')[0].reset()
        $('.addModal').modal('show')

        $('.addModal h4').text('新增文章分类')
    })

    // 编辑按钮
    $('tbody').on('click', '.btn-edit', function () {
        $('.addModal').modal('show')
        $('.addModal h4').text('更新文章分类')

        // 发送请求
        $.ajax({
            type: 'get',
            url: BigNew.category_search,
            data: {
                id: $(this).data('id')
            },
            success: function (res) {
                // console.log(res)
                if (res.code == 200) {
                    // 将查询到的要编辑的数据先显示在模态框上
                    $('#myForm input[name=id]').val(res.data[0].id)
                    $('#myForm input[name=name]').val(res.data[0].name)
                    $('#myForm input[name=slug]').val(res.data[0].slug)
                }
            }
        })
    })

    // 4.新增或更新
    $('.addModal .btn-sure').on('click', function () {

        var id = $('#myForm input[name=id]').val()


        // 发送ajax请求
        $.ajax({
            type: 'post',
            url: id ? BigNew.category_edit : BigNew.category_add,
            data: $('#myForm').serialize(),
            success: function (res) {
                if (res.code == 200 || res.code == 201) {
                    // 隐藏模态框
                    $('.addModal').modal('hide')

                    // 刷新页面
                    render()
                }

            }
        })
    })
    // 删除数据
    $('#delModal').on('show.bs.modal', function (e) {

        window.categoryId = $(e.relatedTarget).data('id')
    })
    $('.delModal .btn-sure').on('click', function () {

        // 向服务端发送请求
        $.ajax({
            type: 'post',
            url: BigNew.category_delete,
            data: {
                id: window.categoryId
            },
            success: function (res) {
                if (res.code == 204) {

                    // 隐藏模态框
                    $('.delModal').modal('hide')

                    //   刷新页面
                    render()
                }
            }
        })
    })

})