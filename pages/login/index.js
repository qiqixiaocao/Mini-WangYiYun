// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    formData: {},
    success: "",
    error: "",
    userID: "",
    defaultType: true,
    passwordType: true
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  eyeStatus: function () {
    this.data.defaultType = !this.data.defaultType
    this.data.passwordType = !this.data.passwordType
    this.setData({
      defaultType: this.data.defaultType,
      passwordType: this.data.passwordType
    })
  },
  //登录
  login() {
    wx.request({
      url: `http://localhost:3000/login/cellphone?phone=${this.data.formData.phone}&password=${this.data.formData.password}`,
      success: res => {
        if (res.data.code === 200) {
          //路由跳转
          wx.switchTab({
            url: '/pages/index/index',
          });

          //存储登录标志
          wx.setStorage({
            data: res.data.account.id,
            key: 'userID',
          });

          //清空表单
          this.setData({
            formData: {}
          });
          wx.showToast({
            title: '登录成功！',
            icon: 'success',
            duration: 2000,
          });
        } else {
          this.setData({
            formData: {}
          });
          wx.showToast({
            title: '手机号密码错误',
            icon: 'error',
            duration: 2000
          })
        }
      },
    })
  },

  //userinfo
  userinfo() {
    wx.showToast({
      title: '努力开发中...',
      icon: 'success',
      duration: 2000
    })
  },


  // 事件处理函数
  onLoad() {

  }

})