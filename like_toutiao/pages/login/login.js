// like_toutiao/pages/login/login.js
let apps = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

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
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  updateUserInfo: function (result) {
    console.log(result)
    apps.util.request({
      'url': 'entry/wxapp/reguser',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data: {
        headimg: result.detail.userInfo.avatarUrl,
        nickname: result.detail.userInfo.nickName
      },
      success(res) {
        console.log(res)
        if (res.data.data.status == 0) {
          wx.setStorageSync('userid', res.data.data.userid)
          wx.reLaunch({
            url: '/like_toutiao/pages/index/index',
          })
        }
      }
    })


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