## 2019.04.11【更新说明】
1.加入微信授权模块（authorization.js）</br>
2.引入pm2组件,一键启动所有服务</br>
#### pm2语法

>pm2 start apps.json  //启动应用程序</br>
pm2 start apps.json --watch  //当文件变化时自动重启应用（推荐使用）</br>
pm2 restart all  //重启所有应用</br>
pm2 stop 0 //停止 id为 0的指定应用程序</br>
pm2 stop all</br>
pm2 delete all  //关闭并删除所有应用（推荐使用）</br>
pm2 delete 0</br>