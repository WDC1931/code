const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./apis/index');
const apis = require('./apis/apis');

const log = require('./middleware/log');

const app = express();

app.disable('x-powered-by');

// 日志中间件
app.use(log.load());
app.use((req, res, next) => {
  log.collect(req, res, next);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use('/', index);
app.use('/api', apis);

app.use('/h5', express.static(path.join(__dirname, 'webapp/dist')));

app.use(function (req, res, next) {

  const err = new Error('Not Found');
  err.status = 404;
  log.warn(err);
  next(err);
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};


  err.status = err.status || 500;
  res.status(err.status || 500);
  log.error(err)
  res.render('error');
});

// 全局捕获 Rejection
process.on('unhandledRejection', (reason, p) => {
  log.fatal(reason)
})

module.exports = app;
