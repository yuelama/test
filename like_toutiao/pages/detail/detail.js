let apps = getApp();
var WxParse = require('../../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    news: null
  },
  /**
   * 生命周期函数--监听页面加载
   * 根据路由跳转传递的newId获取新闻详情并渲染
   */
  onLoad: function (options) {
    let newsId = options.id;
    console.log(newsId)
    var that = this;
    apps.util.request({
      'url': 'entry/wxapp/getarticle',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        id: newsId
      },
      success(res) {
        that.setData({
          news: res.data.data.newsdata
        })
        WxParse.wxParse('article', 'html', res.data.data.newsdata.content, that, 5);

      }
    })



  },
  //收藏的方法
  shoucang:function(shuju){
    console.log(shuju)
    var newid = shuju.currentTarget.dataset.newid;
    var userid = wx.getStorageSync('userid');
    if (userid){
      apps.util.request({
        'url': 'entry/wxapp/shoucang',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          id: newid,
          userid: userid
        },
        success(res) {
          console.log(res)
          if(res.data.data.status==0){
              wx.showToast({
                title: '收藏成功',
              })
          }else{
            wx.showToast({
              title: '收藏失败',
            })
          }
        }
      })



    }else{
      wx.reLaunch({
        url: 'like_toutiao/pages/index/index',
      })
    }
  },

})