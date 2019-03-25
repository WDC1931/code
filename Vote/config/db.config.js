// 数据库配置
const config = {
    // 数据库名
    database: 'vote',
    // 用户名
    username: 'voter',
    // 密码
    password: 'voter123',
    // 数据库主机
    host: 'localhost',
    // 数据库端口号
    port: 3306,
    // 为保持数据表命名规范，故在此统一配置表名前缀
    table: {
      prefix: 't_vote_'
    }
  };
  
  module.exports = config;
