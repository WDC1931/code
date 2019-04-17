// 日志配置
const config = {
    log: {
        // 日志分组名
        category: 'keel-api',
        // 日志级别：trace, debug, info, warn, error, warn（详情可参考 log4js 文档）
        level: 'trace'
    },
    file: {
        // 日志文件存储路径
        path: 'logs/',
        // 日志文件名称
        name: 'keel-api',
        // 日志文件分割格式（默认按天分割）
        pattern: 'yyyy-MM-dd'
    }
}

module.exports =  config;