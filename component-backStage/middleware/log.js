const log4js = require('log4js');
const config = require('../config/log.config.js');
const uuid = require('uuid');

log4js.configure({
  appenders: {
      console: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: '%[[%d]%] %[[%p]%] %[%c%] %m%n'
          }
      },
      all: {
          type: 'dateFile',
          filename: config.file.path + 'all/' + config.file.name,
          pattern: '.' + config.file.pattern + '.all.log',
          alwaysIncludePattern: true
      },
      errorFile: {
        type: 'dateFile',
        filename: config.file.path + 'err/'  + config.file.name,
        pattern: '.' + config.file.pattern + '.error.log',
        alwaysIncludePattern: true
      },
      error: {
        type: 'logLevelFilter',
        level: 'error',
        appender: 'errorFile'
      }
  },
  categories: {
      default: {
          appenders: ['console', 'all', 'error'],
          level: config.log.level
      }
  }
});

const logger = log4js.getLogger(config.log.category);

// 替换 console.log
// console.log = logger.info.bind(logger);

const log = {
    requestId: '',
    // 载入日志（中间件）
    load () {
        return log4js.connectLogger(logger, {
            // 屏蔽默认输出
            nolog: '\\.*'
        })
    },

    // 日志采集
    collect (req, res, next) {
        this.requestId = uuid.v4();
        const isAPI = req.url.indexOf('api') > -1 ? true : false;
        if (isAPI) {
            log.i({
                ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'],
                method: req.method,
                url: req.url,
                params: '[' + this.formart(req.method === 'GET' ? req.query : req.body) + ']',
                cookies: this.formart(req.cookies)
            });
        }
        next();
    },

    formart (object) {
        let string = '';
        let i = 0;
        for (key in object) {
            const sign = i === 0 ? '' : ', ';
            let item = sign + key + '=' + object[key];
            string += item;
            i++;
        }
        return string;
    },

    // 处理输出格式
    layout (log) {
        const prefix = 'requestId=' + this.requestId;
        let string = log;
        if (typeof log === 'object') {
            string = JSON.stringify(log);
        }
        return prefix + ' ' + string;
    },

    // 分级日志输出

    trace (log) {
        logger.trace(this.layout(log));
    },

    debug (log) {
        logger.debug(this.layout(log));
    },

    info (log) {
        logger.info(this.layout(log));
    },

    warn (log) {
        logger.warn(this.layout(log));
    },

    error (log) {
        logger.error('requestId=' + this.requestId);
        logger.error(log);
    },

    fatal (log) {
        logger.fatal('requestId=' + this.requestId);
        logger.fatal(log);
    },

    // 分级日志输出（简写）

    t (log) {
        this.trace(log);
    },

    d (log) {
        this.debug(log);
    },

    i (log) {
        this.info(log);
    },

    w (log) {
        this.warn(log);
    },

    e (log) {
        this.error(log);
    },

    f (log) {
        this.fatal(log);
    }
};

module.exports = log;