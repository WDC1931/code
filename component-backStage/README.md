##2019.04.16【更新说明】
1.重构代码，使用keel框架。</br>
2.将微信授权模块并入后台服务，统一端口。</br>

</br></br></br>
## 2019.04.15【更新说明】
1.加入获取微信小程序码模块（authorization.js）</br>

</br></br></br>
## 2019.04.11【更新说明】
1.加入微信网页授权模块（authorization.js）</br>
2.引入pm2组件,一键启动所有服务</br>
3.修复了Sequelize读取数据时间不对的bug</br>
4.增加了数据库和服务器重置语句（config\DBConfig.js，**默认打开**）
#### pm2常用语法
>pm2 start apps.json  //启动应用程序</br>
pm2 start apps.json --watch  //当文件变化时自动重启应用（推荐使用）</br>
pm2 restart all  //重启所有应用</br>
pm2 stop 0 //停止 id为 0的指定应用程序</br>
pm2 stop all ////关闭所有应用（推荐使用）</br>
pm2 delete all  //关闭并删除所有应用</br>
pm2 delete 0</br>
