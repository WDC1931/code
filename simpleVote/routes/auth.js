let express = require("express");
const https = require("https");
let request = require("request");
let url = require("url");

var router = express.Router();

let appID = `wx71d6759ad2387bc6`;
let appSerect = `5c6505144776cfdcaf189ae8203c33b9`;

// 获取小程序码
router.get("/getUnlimited", async function(req, res) {
  let params = url.parse(req.url, true).query;
  let id = params.id;
  let QRCode = await getUnlimited(id);
  res.write(QRCode);
});

function getUnlimited(id) {
  return new Promise((resolve, reject) => {
    let token = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appSerect}`;
    https
      .get(token, res => {
        var resText = "";
        res.on("data", d => {
          resText += d;
        });
        res.on("end", () => {
          var resObj = JSON.parse(resText);
          let access_token = resObj.access_token;
          let getQRCode = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${access_token}`;

          var postData = JSON.stringify({
            scene: id
            // page: "pages/vote-ing/vote-ing"
          });
          request(
            {
              url: getQRCode,
              encoding: null,
              method: "POST",
              headers: {
                "content-type": "application/json"
              },
              body: postData
            },
            function(error, response, body) {
              if (!error && response.statusCode == 200) {
                resolve(body);
              }
            }
          );
        });
      })
      .on("error", e => {
        console.error(e);
      });
  });
}

module.exports = router;
