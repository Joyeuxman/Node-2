// signin.js
// 此文件用于向服务器提交登录的请求
$('form').submit(function(event){
    event.preventDefault();
    // 把表单的内容序列化，并为下一次发送请求做准备
    // this指signin.html中的表单
    var data = $(this).serialize();
    // 
    $.post('user/signin',data,function(res){
        // 如果登录成功的话跳转到首页
        if(res.code == 'success'){
            location.href = '/';
        }else  alert(res.message);
    })
})