// index.js
// 该文件是向服务器发送请求，处理已经登录过的用户，重新生成页面
// 读取cookie的内容,找到用户的昵称
var petname = $.cookie('petname');
console.log(petname);
// 判断petname是否存在
if(petname){
    // empty()删除匹配元素集合中的所有子节点
    $('header').empty();
    // 更改header标签的子节点，显示‘用户名’和‘退出’
    $('<h3><span>' + petname + '</span><small>退出</small></h3>').appendTo('header');
    //给small标签添加点击事件，向服务器发送GET请求
    $('header small').click(function(){
        // 用jquery的get方法发送请求,让相对应的请求执行清除cookie内容的动作，即res.clearcookie('petname');
        $.get('/user/signout',null,function(res){
            if(res.code == 'success'){
                // 等于location.href = 'index.html'
                location.href = '/';
            }
        })
    });
    //如果点击的是’petname‘，可以上传头像，此时要跳转页面
    $('header span').click(function(){
        location.href = '/user.html';
    })
}