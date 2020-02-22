let apps = getApp();
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
    var userid = wx.getStorageSync('userid');
    console.log(userid)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  //跳转到详情页面
  goToDetail: function (event) {
    console.log(event.currentTarget.dataset.newsid)
    wx.navigateTo({
      url: '/like_toutiao/pages/detail/detail?id=' + event.currentTarget.dataset.newsid,
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    apps.util.request({
      'url': 'entry/wxapp/getcategorys',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {       
        var newtypes = [];
        for (var i = 0; i < res.data.data.fenleidata.length; i++) {

          newtypes[i] = res.data.data.fenleidata[i].id
        }
        that.setData({
          userNewsTypeMap: res.data.data.fenleidata,
          userNewsType: newtypes,
          selectedNewsType: res.data.data.fenleidata[0].id,
        })

        that.getnewsdata();
      }
    })
  },
  /**
     * 获取新闻并执行回调函数
     */
  getnewsdata: function () {
    var that = this;
    apps.util.request({
      'url': 'entry/wxapp/getnews',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        category: that.data.selectedNewsType,
      },
      success(res) {
       // console.log(res);

        var newtypes = [];
        for (var i = 0; i < 3; i++) {

          newtypes[i] = res.data.data.newsdata[i]
        }
        that.setData({
          swiperImgUrlList: newtypes,
          news: res.data.data.newsdata
        })
      
      }
    })

  },



  //点击切换分类
  onTapNewsType: function (event) {
    let selectedNewsType = event.currentTarget.dataset.newsType;
   // console.log(selectedNewsType)
    this.setData({
      selectedNewsType: selectedNewsType
    });

    this.getnewsdata();
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