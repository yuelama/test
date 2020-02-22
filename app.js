//app.js
import util from 'we7/resource/js/util.js';
var WxParse = require('wxParse/wxParse.js');
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    //1 先从缓存里面找一下是否有我们标识的内容
    var useropenid = wx.getStorageSync('userid');
    if (useropenid) { } else {
      //2 如果没有就到服务器去请求一下最新的然后缓存
      util.getUserInfo(function (userInfo) {
        util.request({
          'url': 'entry/wxapp/getuserid',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success(res) {
            console.log(res)
            //3 如果服务器显示用户没有注册,就跳转到授权注册页面
            if (res.data.data.status == 0) {
              wx.setStorageSync('userid', res.data.data.userid)
					
            } else {
              wx.reLaunch({
                url: '/like_toutiao/pages/login/login',
              })
            }
          }

        })
      })



    }
  },
  onShow: function () {
  },
  onHide: function () {
  },
  onError: function (msg) {
    console.log(msg)
  },
  util: util,
  globalData: {
    userInfo: null,
  },
  siteInfo: require('siteinfo.js')
});