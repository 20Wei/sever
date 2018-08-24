var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');
// session对象
var multiparty = require('multiparty');
var util = require("util");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});


// 连接登陆数据库
router.post('/login', function (req, res) {
    req.body.findType = "exact"
    http.post('http://127.0.0.1:3333/User/find', req.body).then(function (data) {
        console.log(data);
        if (data.length == 1) {
            res.send("true")
        } else {
            res.send("error")
        };
    });
});
// 注册
router.post('/reg', function (req, res) {
    http.post('http://127.0.0.1:3333/User/add', req.body).then(function (data) {
        res.redirect("http://127.0.0.1:3000/#/AAA")
        // if (req.body.uname != refs.uname.value) {
        //     res.redirect("http://127.0.0.1:3000/#/login")
        // } else {
        //     res.redirect("http://127.0.0.1:3000/#/reg")
        // }
    });
});
// 注册时检测账号是否重复
router.post('/checkUser', function (req, res) {
    http.post('http://127.0.0.1:3333/User/find', req.body).then(function (data) {
        if (data.length > 0) {
            res.send("unpass")
        } else {
            res.send("pass")
        }
    });
});

// 获取数据库信息
router.post('/FindPeope', function (req, res) {
    http.post('http://127.0.0.1:3333/renshu/find', req.body).then(function (data) {
        res.send(data)
    });
});

// 删除
router.post('/delPeope', function (req, res) {
    http.post('http://127.0.0.1:3333/renshu/del', req.body).then(function (data) {
        res.send(data)
    });
});
// 增加
router.post('/AddPeope', function (req, res) {
    http.post('http://127.0.0.1:3333/renshu/add', req.body).then(function (data) {
        res.send(data)
    });
});

// =============================================微信登陆配置session
router.post('/micorlogin', function (req, res) {
    req.body.findType = "exact"
    // console.log(req.body)
    http.post('http://127.0.0.1:3333/weixin/find', req.body).then(function (data) {
        console.log(data);
        if (data.length == 1) {
            req.session.user = req.body.user
            res.send("true")
        } else {
            res.send("error")
        };
    });
});
//检测用户是否登陆
router.post('/Loginsession', function (req, res) {
    if (req.session.user)
        res.send(req.session.user);
    else
        res.send('');

});
//================================================微信注册
// 注册
router.post('/micorreg', function (req, res) {
    http.post('http://127.0.0.1:3333/weixin/add', req.body).then(function (data) {
        res.redirect("http://127.0.0.1:3000/#/AAA")
    });
});
// 注册时检测账号是否重复
router.post('/micorcheckUser', function (req, res) {
    http.post('http://127.0.0.1:3333/weixin/find', req.body).then(function (data) {
        if (data.length > 0) {
            res.send("unpass")
        } else {
            res.send("pass")
        }
    });
});
//好友列表
router.post('/listFriends', function (req, res) {
    http.post('http://127.0.0.1:3333/weixin/find', req.body).then(function (data) {
        res.send(data)
    });
});

// =====================================VUE=====================================
// 登陆
router.post('/alluser', function (req, res) {
    req.body.findType = "exact"
    http.post('http://127.0.0.1:3333/renshu/find', req.body).then(function (data) {
        res.send(data)
    });
});

// 注册
router.post('/regVue', function (req, res) {
    http.post('http://127.0.0.1:3333/vue/add', req.body).then(function (data) {
        res.redirect("http://127.0.0.1:8080/#/111/333")
    });
});

// 注册时检测账号是否重复
router.post('/RegChongfu', function (req, res) {
    http.post('http://127.0.0.1:3333/vue/find', req.body).then(function (data) {
        if (data.length > 0) {
            res.send("unpass")
        } else {
            res.send("pass")
        }
    });
});

// ====================================================上传图片
router.post('/upFile', function (req, res) {
    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({ uploadDir: './public/userupload/' });  //文件路径可以修改，如果修改记得和下面的路径保持一致
    //上传完成后处理
    form.parse(req, function (err, fields, files) {
        var filesTmp = JSON.stringify(files, null, 2);
        if (err) {
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var files = files.inputFile;
        }
        //发送第一张图片的信息
        let str = files[0].path;
        let newPath = str.replace(/public/, '');
        res.send(newPath);    //发送消息回去
    });
});

// =================================京东-=======================
//所有信息
router.post('/listJingdong', function (req, res) {
    http.post('http://127.0.0.1:3333/jingdongText/find', req.body).then(function (data) {
        res.send(data)
    });
});


//======================================  网易云服务器  ==========================
// 登陆ajax
router.post('/musicUser', function (req, res) {
    req.body.findType = "exact"
    http.post('http://127.0.0.1:3333/mosicUser/find', req.body).then(function (data) {
        if (data.length == 1) {
            res.send("true")
        } else {
            res.send("error")
        };
    });
});
// 注册ajax表单注册
router.post('/musicReg', function (req, res) {
    http.post('http://127.0.0.1:3333/mosicUser/add', req.body).then(function (data) {
        res.redirect("http://127.0.0.1:3000/#/Login")
    });
});
// 注册时检测账号是否重复
router.post('/musicFind', function (req, res) {
    req.body.findType = "exact"
    http.post('http://127.0.0.1:3333/mosicUser/find', req.body).then(function (data) {
        if (data.length > 0) {
            res.send("unpass")
        } else {
            res.send("pass")
        }
    });
});
// 渲染歌单
router.post('/musicList', function (req, res) {
    http.post('http://127.0.0.1:3333/neteaseMusic/find', req.body).then(function (data) {
        res.send(data)
    });
});

// 歌曲
router.post('/listMusics', function (req, res) {
    http.post('http://127.0.0.1:3333/listMusic/find', req.body).then(function (data) {
        res.send(data)
    });
});
//视频
router.post('/listmusicMovie', function (req, res) {
    http.post('http://127.0.0.1:3333/musicMovie/find', req.body).then(function (data) {
        res.send(data)
    });
});
// 搜索音乐
router.post('/findMusiclist', function (req, res) {
    let sdata = [];
    http.post('127.0.0.1:3333/listMusic/find', sdata).then(function (data) {
        res.send(data)
    })
})


// =============================================  微信小程序  ===========================
//所有热映信息
router.post('/findmoviehit', function (req, res) {
    http.post('http://127.0.0.1:3333/reying/find', req.body).then(function (data) {
        res.send(data)
    });
});
// 所有待映
router.post('/findmoviedaiying', function (req, res) {
    http.post('http://127.0.0.1:3333/daiying/find', req.body).then(function (data) {
        res.send(data)
    });
});

//===============================================  考试  ==================================
router.post('/findContent', function (req, res) {
    http.post('http://127.0.0.1:3333/message/find', req.body).then(function (data) {
        res.send(data)
    });
});

router.post('/getContent', function (req, res) {
    http.post('http://127.0.0.1:3333/message/add', req.body).then(function (data) {
        res.redirect("http://192.168.43.13:3000/#/One")        
    });
});

module.exports.router = router;
