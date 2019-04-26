const axios = require('axios');
const config = require('../../config/app.config');

module.exports = function(req, res, next) {

  let appID = req.body.appid;
  let code = req.body.code;

  axios
    .get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${config[appID].appid}&secret=${config[appID].secret}&js_code=${code}&grant_type=authorization_code`
    )
    .then(response => {
      const data = response.data;
      res.send(data);
    })
    .catch(err => {
      res.send(err);
    });
};

