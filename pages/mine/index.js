// pages/demo/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userMsg: [], //用户详情
    playList: [], //用户歌单
    dialogShow: false,
    showOneButtonDialog: false,
    buttons: [{
      text: '取消'
    }, {
      text: '确定'
    }],
  },

  //获取用户详情
  getUserMsg(id) {
    wx.request({
      url: 'http://localhost:3000/user/detail?uid=' + id,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            userMsg: res.data,
          });
        }
      }
    })
  },

  //获取用户歌单
  getUserList(id) {
    wx.request({
      url: 'http://localhost:3000/user/playlist?uid=' + id,
      success: res => {
        if (res.data.code === 200) {
          this.setData({
            playList: res.data.playlist
          })
        }
      }
    })
  },

  //跳转至歌单页面
  goMusicList(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/musiclist/index?id=' + id,
    });
  },

  //打开comfirm
  openConfirm: function () {
    this.setData({
      dialogShow: true
    })
  },

  tapDialogButton(e) {
    if (e.detail.index === 1) {
      //点击了(第二个按钮)确定
      this.loginout();
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    } else {
      //点击了(第一个按钮)取消
      this.setData({
        dialogShow: false,
        showOneButtonDialog: false
      })
    }
  },

  //退出登录
  loginout() {
    wx.request({
      url: 'http://localhost:3000/logout',
      success: res => {
        wx.redirectTo({
          url: '/pages/login/index',
        });
        wx.removeStorageSync('userID');
        wx.showToast({
          title: '退出登录成功！',
          icon: 'success',
          duration: 2000,
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = wx.getStorageSync('userID');
    this.getUserMsg(id);
    this.getUserList(id);
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