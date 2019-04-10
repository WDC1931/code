pm2 start apps.json  //启动应用程序
pm2 start apps.json --watch  //当文件变化时自动重启应用
pm2 restart all  //重启所有应用
pm2 stop 0 //停止 id为 0的指定应用程序
pm2 stop all
pm2 delete all  //关闭并删除所有应用
pm2 delete 0