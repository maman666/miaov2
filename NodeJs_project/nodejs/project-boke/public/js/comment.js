


$(function () {
    //分页限制条数为2
    var limit = 2;
    //默认情况 当前的也是为1
    var page = 1;
    //总页数初始化为0
    var pages = 0;

    var comments = [];


    // 提交评论
    $('#messageBtn').on('click', function () {
        $.ajax({
            type: 'POST',
            url: '/api/comment/post',
            data: {
                contentid: $('#contentId').val(),
                content: $('#messageContent').val()
            },
            success: function (responseData) {
                //console.log(responseData);
                $('#messageContent').val('');
                comments = responseData.data.comments.reverse();
                renderComment();
            }
        })
    });

    //每次页面重载的时候，获取文章的所有的评论
    $.ajax({
        url: '/api/comment',
        data: {
            contentid: $('#contentId').val()
        },
        success: function (responseData) {
            comments = responseData.data.reverse();
            renderComment();
        }
    });

    //delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序 时间委托
    //上一页 下一页处理
    //parent() 方法返回被选元素的直接父元素。
    // hasClass() 方法检查被选元素是否包含指定的 class。
    $('.pager').delegate('a', 'click', function () {
        if ($(this).parent().hasClass('previous')) {
            //上一页
            page--;
        } else {
            //下一页
            page++;
        }
        renderComment();
    });

    function renderComment() {
        //评论总条数
        $('#messageCount').html(comments.length);

        //分页
        //总页数最小的取值>=1
        pages = Math.max(Math.ceil(comments.length / limit), 1);
        //不是全部渲染出来，而是从第几条 渲染到第几条
        //刚开始最大的取值<=(page-1) * limit
        var start = Math.max(0, (page - 1) * limit);
        //结束最小的取值>=comments.length
        var end = Math.min(start + limit, comments.length);


        var $lis = $('.pager li');
        $lis.eq(1).html(page + ' / ' + pages);

        //上一页和下一页的判断
        if (page <= 1) {
            page = 1;
            $lis.eq(0).html('<span>没有上一页了</span>');
        } else {
            $lis.eq(0).html('<a href="javascript:;">上一页</a>');
        }

        if (page >= pages) {
            page = pages;
            $lis.eq(2).html('<span>没有下一页了</span>');
        } else {
            $lis.eq(2).html('<a href="javascript:;">下一页</a>');
        }

        //还没有评论的判断
        if (comments.length == 0) {
            $('.messageList').html('<div class="messageBox"><p style="color:red;">还没有评论</p></div>');
        } else {
            var html = '';
            for (var i = start; i < end; i++) {
                html += `<div class="messageBox">
                            <p class="name clear">
                                <span class="fl">${comments[i].username}</span>
                                <span class="fr">${formatDate(comments[i].postTime)}</span>
                            </p>
                            <p>${comments[i].content}</p>
                         </div>`
            }
            $('.messageList').html(html);
        }

    }

    //格式化一下时间
    function formatDate(d) {
        // console.log(typeof d)
        var date1 = new Date(d);
        return date1.getFullYear() + '年' + (date1.getMonth() + 1) + '月' + date1.getDate() + '日 '
            + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
    }
})