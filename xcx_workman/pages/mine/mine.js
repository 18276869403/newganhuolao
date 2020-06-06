// pages/mine/mine.js
//index.js
//获取应用实例
const app = getApp()
var qingqiu = require('../../utils/request.js')
var api = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 0 普通用户，1工人，2商家
    viewUrl:api.viewUrl,
    userType: 1,
    star: 4,
    chushihua: '1',
    wxState: 2,
    openid:'',
    wxUser:[],
    Name:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function(options) {
  //   this.chushishouquan()
  //   this.setData({
  //     wxState: app.globalData.wxState
  //   })
  //   this.getWxUser()
  // },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onShow()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  getWxUser:function(){
    var that = this
    var data = {
      wxId:app.globalData.openid,
      id:app.globalData.wxid
    }
    qingqiu.get("queryWxUser",data,function(re){
      if(re.success){
        if(re.result != null){
          if(re.result.name != ""&&re.result.name != null){
            that.setData({
              Name:re.result.name
            })
          }else if(re.result.shopName != "" && re.result.shopName != null){
            that.setData({
              Name:re.result.shopName
            })
          }else if(re.result.wxNc != "" && re.result.wxNc != null){
            that.setData({
              Name:re.result.wxNc
            })
          }
          if(re.result.backup4 == "0" || re.result.backup4 == "" || re.result.backup4==null){
            re.result.backup4 = "未实名认证"
          }
          if(re.result.starClass == 0 || re.result.starClass == null){
            re.result.starClass = "暂未评定"
          }else if(re.result.starClass == 1){
            re.result.starClass = "一级工匠"
          }else if(re.result.starClass == 2){
            re.result.starClass = "二级工匠"
          }else if(re.result.starClass == 3){
            re.result.starClass = "三级工匠"
          }else if(re.result.starClass == 4){
            re.result.starClass = "四级工匠"
          }if(re.result.starClass == 5){
            re.result.starClass = "五级工匠"
          }
          re.result.picIurl = that.data.viewUrl + re.result.picIurl
          if(re.result.oneClassName!= "" && re.result.oneClassName!=null){
            re.result.oneClassName = re.result.oneClassName.replace(/,/, " | ")
          }
          if(re.result.twoClassName != "" && re.result.twoClassName != null){
            re.result.twoClassName = re.result.twoClassName.replace(/,/, " | ")
          }
          if(re.result.oneClassName == null){
            re.result.oneClassName = ""
          }
          if(re.result.twoClassName == null){
            re.result.twoClassName = ""
          }
          that.setData({
            wxUser:re.result
          })
        }
      }
    })
  },
  onShow() {
    this.chushishouquan()
    this.setData({
      wxState: app.globalData.wxState
    })
    if (app.globalData.wxid == null || app.globalData.wxid == '') {
      this.onUser()
    }else{
      this.getWxUser()
    }
  },

  onUser: function() {
    var that = this
    wx.login({
      success: function(res) {
        qingqiu.get("getKeyInfo", {
          code: res.code
        }, function(re) {
          app.globalData.wxid = re.result.wxUser.id
          if (re.result.wxUser.picUrl != null && re.result.wxUser.picUrl.length > 0) {
            app.globalData.sqgl = 1
          }
          app.globalData.openid = re.result.openId
          app.globalData.wxState = re.result.wxUser.wxState
          that.getWxUser()
          that.setData({
            openid:re.result.openId
          })
        }, "POST")
      }
    })
  },
  chushishouquan() {
    var that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            lang: 'zh_CN',
            success(res) {
              // debugger
              const userInfo = res.userInfo
              var data = {
                id: app.globalData.wxid,
                openId: app.globalData.openid,
                picUrl: userInfo.avatarUrl,
                sex: userInfo.gender,
                wxNc: userInfo.nickName
              }
              qingqiu.get("add", data, function(re) {}, 'post')
              console.log(res.userInfo)
              that.setData({
                chushihua: '0'
              })
            }
          })
        } else {
          that.setData({
            chushihua: '1'
          })
          // that.showModal1()
        }
      }
    })
  },
  //用户授权
  bindGetUserInfo(e) {
    var that = this
    if (e.detail.errMsg == "getUserInfo:fail auth deny") {
      wx.showToast({
        title: '未授权',
        icon: 'none'
      })
    } else {
      wx.getUserInfo({
        lang: 'zh_CN',
        success(res) {
          // debugger
          const userInfo = res.userInfo
          var data = {
            id: app.globalData.wxid,
            openId: app.globalData.openid,
            picUrl: userInfo.avatarUrl,
            sex: userInfo.gender,
            wxNc: userInfo.nickName
          }
          qingqiu.get("add", data, function(re) {
            if (re.data.success == true) {
              app.globalData.sqgl = 1
              that.setData({
                chushihua: '0',
                showModalStatus1: false
              })
            }
          }, 'post')
        }
      })
    }
  },
  //显示弹窗样式 授权
  showModal1: function(e) {
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation

    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus1: true
    })
    setTimeout(function() {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)


  },
  //隐藏分类弹窗样式
  hideModal1: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      hasMask: false
    })

    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus1: false,
        navLeftItems: [],

      })
    }.bind(this), 200)
  },
  // 跳转到我的雇佣页面
  myEmploy: function() {
    wx.navigateTo({
      url: '../myEmploy/myEmploy?id=' + this.data.wxUser.id,
    })
  },
  // 申请成为工人或者商家
  applyBusiness: function() {
    wx.navigateTo({
      url: '../applyBusiness/applyBusiness',
    })
  },
  // 跳转到我的资料页面
  myInfo: function () {
    if (this.data.wxUser.wxState == 2){
      wx.navigateTo({
        url: '../myInfo/myInfo?id=' + app.globalData.wxid,
      })
    }else if(this.data.wxUser.wxState == 1){
      wx.navigateTo({
        url: '../applyBusiness/applyBusiness?typeid=1',
      })
    }else{
      wx.navigateTo({  
        url: '../applyBusiness/applyBusiness?typeid=2',
      })
    }
  },
  // 跳转到我的需求页面
  myNeeds: function() {
    getApp().globalData.xuqiuid = 0
    wx.reLaunch({ 
     url: '../need/need',
    })
  },
  // 跳转到我的晒活页面
  showwork: function() {
    getApp().globalData.showid = 0
    wx.reLaunch({
      url: '../showwork/showwork',
    })
  },
  // 跳转到我留言页面
  myMessage: function (e) {
    var Lyid = JSON.stringify(this.data.wxUser.id)
    wx.navigateTo({
      url: '../myMessage/myMessage?obj='+Lyid,
    })
  },
  // 跳转到我的商品页面
  myGoods: function (e) {
    var spid = JSON.stringify(this.data.wxUser.id)
    wx.navigateTo({
      url: '../myGoods/myGoods?obj='+spid,
    })
  },
  // 跳转到我的推荐页面
  myRecommend: function (e) {
    var myid = JSON.stringify(this.data.wxUser.id)
    wx.navigateTo({
      url: '../myRecommend/myRecommend?obj='+myid,
    })
  },
  phonecall: function (e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone //仅为示例，并非真实的电话号码
    })
  }
})