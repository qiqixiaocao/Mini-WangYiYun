// pages/demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songs: [], //搜索结果
    imgUrls: [], //轮播图图片地址
    SongLimit: 9, //默认请求的歌单数量
    NewMusicList: [], //获取的歌单
    MVLimit: 9, //默认请求的MV数量
    NewMVList: [], //获取的MV
    loading: false, //歌单加载状态
    loading1: false, //MV加载状态
  },

  //清空搜索结果
  clear() {
    this.setData({
      songs: [],
    })
  },

  //获取搜索单项id
  goSearch(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/musicplayer/index?id=' + id,
    });
  },

  //获取歌单单项id
  goMusicList(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/musiclist/index?id=' + id,
    });
  },

  //获取MV单项id
  goMV(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/mvplayer/index?id=' + id,
    })
  },

  //搜索
  search(e) {
    if (e.detail.value) {
      wx.request({
        url: `http://localhost:3000/cloudsearch?keywords=${e.detail.value}`,
        success: res => {
          if (res.data.code === 200) {
            this.setData({
              songs: res.data.result.songs,
            })
          }
        }
      })
    } else {
      this.setData({
        songs: []
      })
    }
  },

  //获取轮播图
  playBanners() {
    wx.request({
      url: "http://localhost:3000/banner",
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            imgUrls: res.data.banners,
          });
        }
      }
    })
  },

  //获取推荐歌单(默认获取9条)
  getNewMusicList(SongLimit) {
    if (SongLimit <= 54) {
      wx.request({
        url: `http://localhost:3000/personalized?limit=${SongLimit}`,
        success: res => {
          if (res.data.code === 200) {
            this.setData({
              NewMusicList: res.data.result,
              loading: false
            });
          }
        }
      })
    } else {
      wx.showToast({
        title: '没有更多数据了!',
        icon: 'error',
        duration: 2000,
      });
    }
  },

  //加载更多歌单
  moreMusic() {
    this.setData({
      SongLimit: this.data.SongLimit += 9,
      loading: true
    })
    this.getNewMusicList(this.data.SongLimit);
  },

  //获取推荐MV(默认获取9条)
  getNewMVList(MVLimit) {
    if (MVLimit <= 54) {
      wx.request({
        url: `http://localhost:3000/mv/first?limit=${MVLimit}`,
        success: res => {
          if (res.data.code === 200) {
            this.setData({
              NewMVList: res.data.data,
              loading1: false
            });
          }
        }
      })
    } else {
      wx.showToast({
        title: '没有更多数据了!',
        icon: 'error',
        duration: 2000,
      });
    }
  },

  //加载更多MV
  moreMV() {
    this.setData({
      MVLimit: this.data.MVLimit += 9,
      loading1: true
    })
    this.getNewMVList(this.data.MVLimit);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      search: this.search.bind(this)
    });
    this.playBanners();
    this.getNewMusicList(this.data.SongLimit);
    this.getNewMVList(this.data.MVLimit);
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
    this.clear();
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