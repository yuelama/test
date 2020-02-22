let apps=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userNewsTypeMap: [],
    userNewsType: [],
    selectedNewsType: '',
    swiperImgUrlList: [],
    news: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
    /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    that.getnewsdata();
  },
  /**
     * 获取新闻并执行回调函数
     */
  getnewsdata: function () {
    var that = this;
    var useropenid = wx.getStorageSync('userid');
    apps.util.request({
      'url': 'entry/wxapp/getmyshoucang',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        userid: useropenid,
      },
      success(res) {
        console.log(res);
        that.setData({
          swiperImgUrlList: newtypes,
          news: res.data.data.newsdata
        })

      }
    })

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})