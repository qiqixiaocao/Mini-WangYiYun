// pages/mvplayer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvDetail: [], //MV详情
    mvUrl: "", //MV播放地址
    timer: "", //定时器
    transform: "",
    transition: "",
  },

  //获取MV详情
  getMVdetail(id) {
    wx.request({
      url: 'http://localhost:3000/mv/detail?mvid=' + id,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            mvDetail: res.data.data
          })
        }
      },
    })
  },

  //获取MV播放地址
  getMVurl(id) {
    wx.request({
      url: 'http://localhost:3000/mv/url?id=' + id,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            mvUrl: res.data.data.url,
          })
        }
      }
    })
  },

  //跳转到歌手详情页
  goSingerDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/singerdetail/index?id=' + id,
    })
  },

  //专辑图片旋转
  rotateImg() {
    var r = 0;
    let that = this;
    that.setData({
      timer: setInterval(() => {
        that.setData({
          transform: "rotate(" + (r += 10) + "deg)",
          transition: "all 1s linear"
        })
      }, 1000)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getMVdetail(id);
    this.getMVurl(id);
    this.rotateImg();
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
    wx.hideHomeButton();
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
    this.setData({
      timer: ""
    })
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