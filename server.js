// server.js 服务器
// 1  加载模块
var exp = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var multer = require('multer');
var fs = require('fs');
// 2
// var app = exp();
// const 定义常量
const app = exp();
app.use(exp.static('wwwroot'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
// 3 设置、创建上传的文件，并将其上传
var storage = multer.diskStorage({
    // 保存上传文件的文件夹名
    destination:'uploads',
    // 使用函数生成上传文件的名字
    fileName:function(req,file,callback){
        console.log(1111,req);
        console.log(2222,file);
        console.log(3333,callback);
        console.log(4444,req.cookies);
        console.log(5555,req.cookies.petname);
        var petname = req.cookies.petname;
        // 将上传的照片全部改成jpg格式
        callback(null,`${petname}.jpg`);
    }
}),
// 开始上传文件
uploads = multer({storage});
console.log(6666,uploads);
//  4 处理用户注册的POST请求
app.post('/user/register',(req,res)=>{
    // 
    console.log(7777,req.body);
    req.body.ip = req.ip;
    req.body.time = new Date();
    console.log(8888,req.body);
    function send(code,message){
        console.log(9999,code,message);
        res.status(200).json({code,message});
    }
    
    // 创建一个用来保存用户信息的文件夹
    fs.exists('users',(exists)=>{
        // 如果该文件夹存在调用saveFile()来保存用户信息
        if(exists){
            saveFile();
        }
        // 如果该文件夹不存在，则用mkdir()创建一个文件夹
        else{
            fs.mkdir('users',(err)=>{
                if(err){
                    send('file error','抱歉！系统错误...')
                }
                // 该文件夹创建成功，再次mkdir()创建一个文件夹
                else{
                    saveFile();
                }
            })
        }
    })
    
    // 定义一个用于保存用户信息的文件的函数，比如昵称，密码，性别等
    function saveFile(){
        // 以用户注册的昵称来命名文件名
        var fileName = `users/${req.body.petname}.txt`;
        fs.exists(fileName,(exists)=>{
            // 用户名已经注册过的情况
            if(exists){
                send('registered','该用户名已被注册！');
            }
            // 该用户名未被注册
            // 此时则需要给刚注册的用户创建文件来保存用户信息
            else{
                fs.appendFile(fileName,JSON.stringify(req.body),(err)=>{
                    if(err){
                        send('file error','抱歉，系统错误...')
                    }
                    // 用户注册成功的情况
                    else{
                        send('success','恭喜！注册成功！')
                    }
                })
                
            }
        })
    }
});
// 5 处理用户登录的POST请求
app.post('/user/signin',(req,res)=>{
    var fileName = `users/${req.body.petname}.txt`;
    function send(code,message){
        res.status(200).json({code,message});
    }
    // 
    fs.exists(fileName,(exists)=>{
        // 文件存在 表示该昵称已经注册过
        if(exists){
            // 读取文件中的内容
            fs.readFile(fileName,(err,data)=>{
                if(err){
                    send('file error','抱歉，系统错误...');
                }
                // 读取文件成功
                else{
                    // 当读取filleName中的内容data时，data是一个字符串，需要转化成对象
                    console.log(111,data);
                    var user = JSON.parse(data);
                    console.log(222,user);
                    // user.passwrod是读取到的txt里面的密码
                    // req.body.password是用户在浏览器输入的密码
                    if(user.password == req.body.password){
                        // 
                        res.cookie('petname',req.body.petname);
                        send('success','登陆成功！');
                    }else {
                        send('password error','用户名密码错误！请重新输入');
                    }
                }
            })
            
        }
        // 文件不存在 表示该昵称未被注册
        else{
            send('name error','该用户未被注册！');
        }
    })
})
// 处理用户注销的操作
app.get('/user/signout',(req,res)=>{
    // 当用户点击'退出'的时候，清除cookie内容
    res.clearCookie('petname');
    res.status(200).json({code:'success'});
})
// // 处理用户上传文件的操作
// ？？？uploads.single('photo') 与user.html中的name属性值有关吗？
app.post('/user/photo', uploads.single('photo'), (req, res) => {
    res.status(200).send('上传成功')
})
app.listen(8088,()=>{
    console.log('server is running....')
})
