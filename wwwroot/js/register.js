// register.js
// 此文件主要用来提交注册请求
$('form').submit(function(event){
    // 先阻止表单的提交
    event.preventDefault();
    // // $(':password')得到表单上所有的密码框
   var pass= $(':password').map(function(){
       // this指type=password的input标签
       console.log(this);
       // val()获取匹配元素当前的值
       return $(this).val();
   });
   // pass[0]和pass[1]指两次输入的密码值
   console.log(pass[0],pass[1]);
   console.log(this);
   var data = $(this).serialize();
   console.log(data);
//    
    if(pass[0] == pass[1]){
       console.log('两次输入的密码一致，准备提交数据');
        $.post('/user/register',data,function(res){
            // res是一个对象 code:'success',message:'恭喜！注册成功！请登录！...'
            // res中的数据 等于 server.js中与其相对应的POST请求中res.status(200).json({code, message})中的数据
            // 两者都是对象
            console.log(res);
            if(res.code == 'success'){
                console.log(res.message);
                alert(res.message);
                // 提交成功转到登录页面
                location.href = 'signin.html';
            }
        })
    }
    // 
    else {
        alert('两次输入的密码不一致！')
    }
})