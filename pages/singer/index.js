// pages/singer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    singers: [], //存储请求数据
    type: 7, //当前歌手类型
    limit: 9, //当前请求歌手条数
    default: "primary",
    loading: false,
  },

  //获取歌手列表
  getSingers(type, limit) {
    wx.request({
      url: `http://localhost:3000/artist/list?area=${type}&limit=${limit}`,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            singers: res.data.artists,
            loading: false
          });
        }
      }
    })
  },

  //跳转到歌手详情页面
  goSingerDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/singerdetail/index?id=' + id,
    });
  },

  //切换类型
  onTabClick(e) {
    let value = e.currentTarget.dataset.value;
    switch (value) {
      case "0":
        this.setData({
          type: 7,
          limit: 9,
        });
        this.getSingers(7, 9);
        break;
      case "1":
        this.setData({
          type: 96,
          limit: 9,
        });
        this.getSingers(96, 9);
        break;
      case "2":
        this.setData({
          type: 8,
          limit: 9,
        });
        this.getSingers(8, 9);
        break;
      case "3":
        this.setData({
          type: 16,
          limit: 9,
        });
        this.getSingers(16, 9);
        break;
      default:
        this.setData({
          type: 0,
          limit: 9,
        });
        this.getSingers(0, 9);
    }
  },

  //加载更多
  getMore() {
    this.setData({
      limit: this.data.limit += 9,
      loading: true
    });
    this.getSingers(this.data.type, this.data.limit);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSingers(7, 9);
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