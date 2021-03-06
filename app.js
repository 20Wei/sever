var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 引用session
var session = require('express-session');

var indexRouter = require('./routes/index').router;
var usersRouter = require('./routes/users');

var app = express();

//也可以这样，允许部分IP地址的端口来访问(白名单模式/多个名单)
var allowCrossDomain = function (req, res, next) {

  if (req.headers.origin == 'http://192.168.31.45:8080' ||
    req.headers.origin == 'http://192.168.31.45:4444' || req.headers.origin == 'http://192.168.31.45:3333'||
    req.headers.origin == 'http://192.168.31.45:3000' || req.headers.origin == 'http://192.168.43.13:3000'
  ) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
};
app.use(allowCrossDomain);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.js增加session配置
app.use(session({
  secret: 'fff', //一个String类型的字符串，作为服务器端生成session的签名
  resave: true,   //是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
  cookie: { maxAge: 60 * 1000 }, //设置maxAge是Nms，即Nms后session和相应的cookie失效过期
  saveUninitialized: true //初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
