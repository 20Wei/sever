var express = require('express');
var router = express.Router();



//获取所有电影细腻
router.get('/getMovie', function(req, res) {
  res.send('金刚狼3');
});



router.get('/addMovie', function(req, res) {
  res.send('增加电影');
});


router.get('/delMovie', function(req, res) {
  res.redirect('../login.html');
});

router.get('/changeMovie', function(req, res) {
  res.send('金刚狼3');
});


module.exports = router;
