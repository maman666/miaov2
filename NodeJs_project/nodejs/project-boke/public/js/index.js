
$(function(){
    //获取登陆节点
    var $loginBox = $('#loginBox');
    //获取注册节点
    var $registerBox = $('#registerBox');
    //获取用户信息节点
    var $userInfo = $('#userInfo');

    //切换到注册面板
    $loginBox.find('a.colMint').on('click', function() {
        $registerBox.show();
        $loginBox.hide();
    });
    //切换到登录面板
    $registerBox.find('a.colMint').on('click',function(){
        $loginBox.show();
        $registerBox.hide();
    });

    //注册
    $registerBox.find('button').on('click',function(){
         //通过ajax提交请求
         $.ajax({
             type:'post',
             url:'/api/user/register',
             data:{
                 username:$registerBox.find('[name="username"]').val(),
                 password:$registerBox.find('[name="password"]').val(),
                 repassword:$registerBox.find('[name="repassword"]').val(),
             },
             dataType:'json',
             success:function(result){
                $registerBox.find('.colWarning').html(result.message);
                if(!result.code){
                    //注册成功
                    setTimeout(function() {
                        $loginBox.show();
                        $registerBox.hide();
                    }, 1000);
                }
             }
         });
    });
    //登陆
    $loginBox.find('button').on('click',()=>{
        //通过ajax提交请求
        $.ajax({
            type:'post',
            url:'/api/user/login',
            data:{
                username:$loginBox.find('[name="username"]').val(),
                password:$loginBox.find('[name="password"]').val()
            },
            dataType:'json',
            success:result=>{
                $loginBox.find('.colWarning').html(result.message);
                if(!result.code){
                    //登陆成功 就不需要去隐藏面板（利用cookies保存登陆状态就可以）
                    // setTimeout(function() {
                    //     $loginBox.hide();
                    //     $userInfo.show();
                    //     //显示登陆信息
                    //     $userInfo.find('.username').html(result.userInfo.username);
                    //     $userInfo.find('.info').html('你好，欢迎光临我的博客!');
                    // }, 1000);
                    
                    //重载页面 重新发请求 自然就是登陆的状态
                    window.location.reload();
                }
            }
        })
    })

    //退出
    $('#logout').on('click',()=>{
        $.ajax({
            url:'/api/user/logout',
            success:result=>{
                //退出成功
                if(!result.code){
                    window.location.reload();
                }
            }
        })
    })

})