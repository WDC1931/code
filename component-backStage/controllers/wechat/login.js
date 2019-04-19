const axios = require('axios');

module.exports = function(req, res, next) {
  // 翼企动小程序
  // let appID = `wx1dd3324da7aa888e`;
  // let appSerect = `4a69e014573c4e64f516c464643cde4e`;

  let appID = req.body.appid;
  let appSerect = req.body.appserect;
  let code = req.body.code;

  axios
    .get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${appID}&secret=${appSerect}&js_code=${code}&grant_type=authorization_code`
    )
    .then(response => {
      const data = response.data;
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};

