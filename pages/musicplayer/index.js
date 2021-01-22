// pages/musicplayer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    musicDetail: [], //单曲详情
    musicUrl: "", //单曲播放地址
    timer: "", //定时器
    transform: "",
    transition: "",
    isPlay: true, //播放状态
  },

  //获取单曲详情
  getMusicDetail(id) {
    wx.request({
      url: 'http://localhost:3000/song/detail?ids=' + id,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            musicDetail: res.data.songs[0],
          });
          this.rotateImg();
        }
      }
    })
  },

  //获取单曲播放地址
  getMusciUrl(id) {
    wx.request({
      url: 'http://localhost:3000/song/url?id=' + id,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            musicUrl: res.data.data[0].url
          });
        }
      }
    })
  },

  //专辑图片旋转
  rotateImg() {
    let r = 0;
    let that = this;
    that.setData({
      timer: setInterval(() => {
        that.setData({
          transform: "rotate(" + (r += 10) + "deg)",
          transition: "all 1s linear",
        })
      }, 1000)
    })
  },

  //跳转到歌手详情
  goSingerDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/singerdetail/index?id=' + id,
    });
  },

  //播放
  audioPlay() {
    this.audioCtx.play();
    this.setData({
      isPlay: true
    })
  },

  //暂停
  audioPause() {
    this.audioCtx.pause();
    this.setData({
      isPlay: false,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getMusicDetail(id);
    this.getMusciUrl(id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (e) {
    this.audioCtx = wx.createAudioContext('myAudio');
    this.audioPlay();
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
    this.audioCtx.pause();
    this.setData({
      timer: ""
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