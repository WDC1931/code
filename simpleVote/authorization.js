let express = require("express");
const https = require("https");
let app = express();

let appID = `wx71d6759ad2387bc6`;
let appSerect = `5c6505144776cfdcaf189ae8203c33b9`;

app.get("/getUserInfo", function(req, res) {
  wxAuth(req, res);
});

async function wxAuth(req, res) {
  //解析querystring获取URL中的code值
  let code = req.query.code;
  //通过拿到的code和appID、app_serect获取返回信息
  let resObj = await getAccessToken(code);
  //解析得到access_token和open_id
  let access_token = resObj.access_token;
  let open_id = resObj.openid;
  //通过上一步获取的access_token和open_id获取userInfo即用户信息
  let userObj = await getUserInfo(access_token, open_id);
  // console.log(userObj);
  res.send(userObj);
}

//通过拿到的code和appID、app_serect获取access_token和open_id
function getAccessToken(code) {
  return new Promise((resolve, reject) => {
    let getAccessUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appID}&secret=${appSerect}&code=${code}&grant_type=authorization_code`;
    https
      .get(getAccessUrl, res => {
        var resText = "";
        res.on("data", d => {
          resText += d;
        });
        res.on("end", () => {
          var resObj = JSON.parse(resText);
          resolve(resObj);
        });
      })
      .on("error", e => {
        console.error(e);
      });
  });
}

//通过上一步获取的access_token和open_id获取userInfo即用户信息
function getUserInfo(access_token, open_id) {
  return new Promise((resolve, reject) => {
    let getUserUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${open_id}&lang=zh_CN`;
    https
      .get(getUserUrl, res => {
        var resText = "";
        res.on("data", d => {
          resText += d;
        });
        res.on("end", () => {
          var userObj = JSON.parse(resText);
          resolve(userObj);
        });
      })
      .on("error", e => {
        console.error(e);
      });
  });
}

app.listen(8800);
