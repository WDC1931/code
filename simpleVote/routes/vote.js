const express = require('express');

var router = express.Router();
const connection = require('../config/DBConfig');

// 连接测试
connection.connect(function (err) {
    if (err) {
        console.log('[query] - :' + err);
        return;
    }
    console.log('connection connect succeed!');
});

// 保存投票数据
router.post('/save', function (req, res, next) {
    var type = req.body.type;
    var deadline = req.body.deadline;
    var anonymity = req.body.anonymity;
    var title = req.body.title;
    var detail = req.body.detail;
    var options = req.body.options;

    connection.query(
        "insert into vote_list(type,deadline,anonymity,title,detail,options) values('" + type + "','" + deadline + "','" + anonymity + "','" + title + "','" + detail + "','" + options + "')", 

        function (err, result) {
        if (err) {
            res.send("保存失败" + err);
        } else {
            res.send({
            'msg' : "保存成功",
            'voteId' : result.insertId,
        });
        }
    });
});

// 查询投票
// router.get('/serach', function (req, res, next) {
//     var name = req.param.name;
//     var age = req.param.age;
//     var sql = "select * from user where age=22";

//     connection.query(sql,function(err,rows){
//         if(err){
//             res.send("查询失败: "+err);
//         }else{
//             return res.jsonp(rows);
//         }
//     });
// });

module.exports = router;
