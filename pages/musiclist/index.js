// pages/about/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ListDetail: [], //歌单详情
    creator: "", //歌单创作者
    allSongs: [], //歌单歌曲
  },

  //获取歌单详情(歌曲，创作者等)
  getMusicListDetail(id) {
    let newArr = [];
    let that = this;
    wx.request({
      url: 'http://localhost:3000/playlist/detail?id=' + id,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            ListDetail: res.data.playlist,
            creator: res.data.playlist.creator,
          });
          for (let i in that.data.ListDetail.trackIds) {
            wx.request({
              url: 'http://localhost:3000/song/detail?ids=' + that.data.ListDetail.trackIds[i].id,
              success: res => {
                if (res.data.code === 200) {
                  newArr.push(res.data.songs[0]);
                }
                this.setData({
                  allSongs: newArr
                })
              }
            })
          }
        }
      }
    })
  },

  //跳转至音乐播放器页面
  goMusicPlayer(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/musicplayer/index?id=' + id,
    });
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id;
    this.getMusicListDetail(id);
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