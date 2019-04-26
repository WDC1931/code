import fonts from './fonts/fonts';
const topic = require('../src/assets/js/topic');
const remark = require('../src/assets/js/remark');
const imgurl = './images/',
  data = {
    fonts: fonts, //动态引入字体
    class:  ``, //动态引入的类，
    title: '育儿冷知识问答首页',//所有页面默认标题
    home: { //首页数据
      title: '', //首页标题
      bg: {
        url: ``, //背景图片路径
        style: '' //背景图样式，是否铺满，背景图位置，是否可以重复
      }, //背景图片
      banner: {
        url: `${imgurl}index.png`, //配图路径
        style: '', //配图样式，是否要拉伸图片
        containerStyle: '' //配图容器的样式，图片大小，
      },  
      btn: {
        text: '开始测试', //按钮文本
        bg: `${imgurl}homeBtn.png`, //按钮背景图
        style: '', //按钮样式，字体颜色，字体行高，按钮背景色，按钮加边框
        point: { //按钮的埋点 
          enforce: true, //只有为true才会有埋点
          set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号
            'xxx_$channel_首页', '进入页面', '首页'
          ]
        },
      },
      point: { //页面埋点
        enforce: true, //只有为false的时候才会去掉埋点，为true或者为空都会有埋点
        set: []//必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号
      },
      share: { //首页分享
        title: `我正在刷育儿吉祥物，敢不敢来挑战？`, //分享标题
        desc: `育儿冷知识挑战！`, //分享语
        imgUrl:'http://skr.21cn.com/static/parenting/images/index.png', //分享缩略图
        url: 'http://skr.21cn.com/static/parenting', //分享目标链接
        imgWidth: 80,
        imgHeight: 80
      }
    },
    behavior: {
      title: `育儿冷知识答题页`, //应用页标题，没有则使用默认标题
      bg: { //背景图片，如果首页已经设置了，应用页不需要修改则不传
        url: ``, //背景图片路径
        style: ``, //背景图片样式
      },
      clock: { //时钟组件
        work: true, //是否需要时钟组件,只要不为false都默认显示时钟组件
        outSet: 0, //计时起点
        endSet: 20, //计时结束，如果是倒计时，这个默认为0
        order: 1, //1代表正序，0或者其他或者不传都代表倒序
        remind: 1, //结束前多少秒开始提醒（抖动）
        style: '',//时钟容器的样式，可以调时钟的位置以及大小
        bgurl: `${imgurl}clock.png`, //时钟组件背景
        timingStyle: '' //时钟数值的样式，可以定义数值的位置、字体
      },
      masker: { //倒计时结束时候的弹框
        style: '', //弹框的样式，可以设置弹框大小以及背景图片
        tips: { //弹框里的提示语
          text: '时间到了！&&重新开始吧！', //弹框里的提示文案&&换行
          style: '', //提示语的样式，可以修改字体大小以及颜色
        },
        btn: { //弹框里的按钮
          text: '重新开始', //弹框里的按钮文案
          bgurl: `${imgurl}homeBtn.png`, //按钮背景图片
          style: '', //弹框里的按钮样式，以及按钮的位置，3可以修改背景图片以及
          point: { //按钮埋点
            enforce: true, //只有为true才会有埋点
            set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号
              'xxx_$channel_首页', '进入页面', '首页'
            ]
          },
        }
      },
      reply: { //题目数据
        topic: topic.default, //题目的文案、选项、答案、配图、解析、坑爹指数、星星都在这
        style: '', //题目的样式，可以微调字体颜色
        banner: {
          style: '',//banner图片的样式，可以修改展示图片的大小以及位置
          containerStyle: '', //banner容器的样式，可以修改图片占比固定宽度
        },
        btn: { //答题选项的按钮
          bg: {
            default: `${imgurl}behaviorBtn.png`, //默认的背景图
            correct: `${imgurl}behaviorBtnCorrect.png`, //正确时候的背景图
            mistake: `${imgurl}behaviorBtnMistake.png`, //错误时候的背景图
          }, //选项按钮的背景图片
          style: '', //选项按钮的样式，可以修改按钮大小，上下边距
          alphabetStyle: 'background: skyblue;font-family: FZZY;', //选项字母的样式，可以修改ABC的字体颜色背景色背景大小
          textStyle: '', //选项文案的样式，可以修改文案的字体颜色
          doneTextColor: 'yellow',  //当选项被点击时，文案的颜色
          point: { //按钮的埋点 
            enforce: true, //只有为true才会有埋点
            set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号 $num为题号， $answer为选项答案
              'xxx_$channel_首页', '进入页面', '首页'
            ]
          },
        }
      },
      point: { //页面埋点
        enforce: true, //只有为false的时候才会去掉埋点，为true或者为空都会有埋点
        set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号
          'xxx_$channel_首页', '进入页面', '首页'
        ]
      },
    },
    finsh: {
      title: `育儿冷知识结束页`, //结束页标题，没有则使用默认标题
      bg: { //背景图片
        url: ``, //如果前面有做设置，这里不需要修改则不传
        style: ``, //如果前面有做设置，这里不需要修改则不传
      },
      container: { //内容框
        bgurl: `${imgurl}frame.png`, //内容框背景图片
        style: `background-position-x: .3rem;`, //可以设置内容框大小以及背景图片样式
        avatar: { //头像
          style: ``, //头像容器的样式，可以设置位置
          img: {
            url: `https://thirdwx.qlogo.cn/mmopen/vi_32/Rc3IRgNmX9AOZculfHaJzvZR9QViaJT9ia2GJS4e5DBIqia96icebPJGKncQicObkm1ICbFd5WBjBv1bILibn1ZOliaBw/132`,//因为是需要微信登陆了请求才有头像链接
            style: ``, //头像的样式，而可以设置头像的大小，边框
            containerStyle: ``, //可以设置头像的背景色
          },
          name: {
            text: `AvaTar`, //昵称
            style: ``, //可以设置昵称的样式，例如颜色、字体大小、还有微调距离
          }, //昵称也需要请求才可以获得
        },
        result: {
          txt: { //设置默认文案
            text: ['', '', 'fen'], //'答题总用时：', '本次挑战获得',这里要默认传两个空的‘’
            style: `color: skyblue;` //默认文案的样式，可以设置字体大小以及字体颜色
          },
          timeStyle: `color: red;`,
          score: {
            bgurl: `${imgurl}fraction.png`, //背景图片地址,样式可以写在下面的那个样式里
            style: `background-size: 100% .15rem;background-position-y: bottom;color: Orange;`, //评分字体样式，可以设置字体大小、颜色、字体类型
            containerStyle: `` //评分字体容器样式，可以设置
          }
        },
        brand: { //称号牌子
          bgurl: ``, //背景图片路径
          style: ``, //称号牌子的样式，可以设置这个牌子的大小、位置、以及边框颜色
          text: ``, //牌子的默认文案
          textStyle: `color: skyblue`, //牌子默认文案的样式可以设置字体大小颜色等
          img: { //称号的配图，写在remark里面了
            style: ``, //图片样式，可以设置图片大小
            containerStyle: ``, //图片容器的样式
          }
        },
        remark: { 
          data: remark.default,//评语、配图、称号、称号配图都在这里
          img: {
            style: ``, //配图的样式，可以调整配图的大小
            containerStyle: ``, //配图容器的样式，可以调整配图占位
          },
          textStyle: ``, //评语的样式
        },
        formula: `$time * 1 + $score * 10`, //计算公式$time代表用时，$score代表答对题目数量，如果不传则默认Timing * 0.4 + scoring * 8
        tip: { //长按截图提示
          style: `color: red;`, //样式，可以设置边框，字体大小，字体颜色
          text: `不截图不截图`, //文案，默认为长按保存截图
        }
      },
      btn: [ //三个功能按钮, 再测一次的方法是again,查看解析是analysis,了解更多是more
        {
          text: '再测一次',
          event: 'again',
          bgurl: `${imgurl}smallBtn.png`,
          style: `color: red;`, //按钮的样式
          point: { //按钮的埋点 
            enforce: true, //只有为true才会有埋点
            set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号 $num为题号， $answer为选项答案
              'xxx_$channel_首页', '进入页面', '首页'
            ]
          },
        },
        {
          text: '查看解析',
          bgurl: `${imgurl}smallBtn.png`,
          event: 'analysis',
          point: { //按钮的埋点 
            enforce: true, //只有为true才会有埋点
            set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号 $num为题号， $answer为选项答案
              'xxx_$channel_首页', '进入页面', '首页'
            ]
          },
        },
        {
          text: '了解更多',
          bgurl: `${imgurl}smallBtn.png`,
          event: 'more',
          point: { //按钮的埋点 
            enforce: true, //只有为true才会有埋点
            set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号 $num为题号， $answer为选项答案
              'xxx_$channel_首页', '进入页面', '首页'
            ]
          },
        }
      ],
      qrcode: {
        enforce: false, //为false的时候隐藏
        img: {
          url: `${imgurl}qrcode.png`,//二维码图片
          style: `border: 1px solid red;`, //二维码的样式可以设置二维码大小以及位置
        },
        txt: {
          text: ``, //文案
          style: ``, //文案的样式
        }
      },
      point: { //页面埋点
        enforce: true, //只有为false的时候才会去掉埋点，为true或者为空都会有埋点
        set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号
          'xxx_$channel_首页', '进入页面', '首页'
        ]
      },
      share: { //结束页分享
        title: `我正在刷育儿吉祥物，敢不敢来挑战？`, //分享标题 
        desc: `育儿冷知识挑战！`, //分享语 $time用时、$score得分、$title称号
        imgUrl:'http://skr.21cn.com/static/parenting/images/index.png', //分享缩略图
        url: 'http://skr.21cn.com/static/parenting', //分享目标链接
        imgWidth: 80,
        imgHeight: 80
      }
    },
    analysis: {
      title: `育儿冷知识解析页`, //页面标题，不传则使用默认标题
      bg: { //是否需要修改背景图片
        url: ``, //背景图片路径
        style: ``, //背景图片样式
      },
      container: {
        bg: { //解析模块的背景图片
          url: `${imgurl}blackboard.png`, //背景图片路径
          style: ``, //背景图片的样式
        },
        optionStyle: ``, //答案选项字母以及选项文案的样式
        textStyle: `color: red;`, //解析文案的样式
      },
      tipStyle: `color: yellow;`,
      btn: [ //按钮事件有两个screenShot考考好友nextTopic下一题
        {
          bgurl: `${imgurl}smallBtn.png`, //,
          text: '考考好友',
          style: '',
          event: 'screenShot',
          point: { //按钮的埋点 
            enforce: true, //只有为true才会有埋点
            set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号 $num为题号， $answer为选项答案
              'xxx_$channel_首页', '进入页面', '首页'
            ]
          },
        },
        {
          bgurl: `${imgurl}smallBtn.png`, //,
          text: '下一题解析',
          style: 'color: red;',
          event: 'nextTopic',
          point: { //按钮的埋点 
            enforce: true, //只有为true才会有埋点
            set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号 $num为题号， $answer为选项答案
              'xxx_$channel_首页', '进入页面', '首页'
            ]
          },
        },
      ],
      qrcode: {
        enforce: true, //默认为ture，只有设置为false的时候才会隐藏
        img: {
          url: `${imgurl}qrcode.png`,//二维码图片
          style: `border: 1px solid red;`, //二维码的样式可以设置二维码大小以及位置
        },
        txt: {
          text: `woshenmedoubuzhidaoa`, //文案
          style: `color: yellow;`, //文案的样式
        }
      },
      point: { //页面埋点
        enforce: true, //只有为false的时候才会去掉埋点，为true或者为空都会有埋点
        set: [ //必须满3个，没有就用默认的埋点方案，会将其中$channel替换为渠道号 $num为题号， $answer为选项答案
          'xxx_$channel_首页', '进入页面', '首页'
        ]
      },
    }
  }

export default data;