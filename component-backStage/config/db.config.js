// 数据库配置
const config = {
    // 数据库名
    database: 'db_keel_demo',
    // 用户名
    username: 'f2er',
    // 密码
    password: 'f2e@21cn',
    // 数据库主机
    host: '119.29.249.183',
    // 数据库端口号
    port: 3306,
    // 为保持数据表命名规范，故在此统一配置表名前缀
    table: {
        prefix: 't_keel_'
    }
}

module.exports = config;