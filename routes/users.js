var express = require('express');
var router = express.Router();
var users = require('./index.js').users;

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



// 注册判断用户是否重复
// router.get('/repeat', function (req, res) {
//   for (let user of users) {
//     if (user.uname == req.query.uname) {
//       res.send('false');
//       return;
//     }
//   }
//   res.send('true');
// });

//验证码
router.get('/vfCode', function (req, res) {
  let random = Math.ceil(Math.random() * 899999)+100000;
  res.send(random + '');
});




// //测试
// router.get('/f49', function (req, res, next) {
//   res.send('这里是user的二级路由');
// });


// router.get('/f49/test/a', function (req, res, next) {
//   res.send('这里是user的二级路由');
// });



module.exports = router;
