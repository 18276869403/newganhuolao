// import { match } from "assert"

// pages/yyyy/yyyy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shendu:'',
    fjkd:'',
    fjcd:'',
    mgd:'',
    mkd:'',
    msl:'',
    cgd:'',
    ckd:'',
    csl:'',

    dbfjcd:'',
    dbfjkd:'',
    dbdcd:'',
    dbdkd:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.obj)
    if(options.obj==1){
      this.setData({
        type:1
      })
    }
    if(options.obj==2){
      this.setData({
        type:2
      })
    }
  },
  // 获取深度
  shendu:function(e){
    this.setData({
      shendu:e.detail.value
    })
  },
  //房间宽度
  fjkd:function(e){
    this.setData({
      fjkd:e.detail.value
    })
  },
  //房间长度
  fjcd:function(e){
    this.setData({
      fjcd:e.detail.value
    })
  },
    //门高度
  mgd:function(e){
    this.setData({
      mgd:e.detail.value
    })

  },
    //门宽度
  mkd:function(e){
    this.setData({
      mkd:e.detail.value
    })
  },
//门数量
  msl:function(e){
    this.setData({
      msl:e.detail.value
    })
  },
    //窗高度
    cgd:function(e){
    this.setData({
      cgd:e.detail.value
    })
  },
    //窗宽度
  ckd:function(e){
    this.setData({
      ckd:e.detail.value
    })
  },
    //窗数量
  csl:function(e){
    this.setData({
      csl:e.detail.value
    })
  },

  shendu:function(e){
    this.setData({
      shendu:e.detail.value
    })
  },
  // 计算
  jisuan:function(){
    var that=this
    if(that.data.shendu==''){
      wx.showToast({
        title: '请输入房间深度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.fjkd==''){
      wx.showToast({
        title: '请输入房间宽度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.fjcd==''){
      wx.showToast({
        title: '请输入房间长度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.mgd==''){
      wx.showToast({
        title: '请输入门高度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.mkd==''){
      wx.showToast({
        title: '请输入门宽度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.msl==''){
      wx.showToast({
        title: '请输入门数量',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.cgd==''){
      wx.showToast({
        title: '请输入窗高度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.ckd==''){
      wx.showToast({
        title: '请输入窗宽度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.csl==''){
      wx.showToast({
        title: '请输入窗数量',
        icon:'none',
        duration:2000
      })
      return
    }
    console.log(that.data.fjcd)
    console.log(that.data.fjkd)
    console.log(that.data.shendu)
    var fc=that.data.fjcd
    var fk=that.data.fjkd
    var fs=that.data.shendu
    var mainji=(Number(fc)+Number(fk))*2*Number(fs)+Number(fc)*Number(fk)
    var menmainji=Number(that.data.mgd)*Number(that.data.mkd)*Number(that.data.msl)
    var chuangmainji=Number(that.data.cgd)*Number(that.data.ckd)*Number(that.data.csl)
    var sjmj=Number(mainji)-Number(menmainji)-Number(chuangmainji)
    var jieguo=(Number(sjmj)/8.6*100)/100
    if(Number(jieguo)>Number(jieguo).toFixed(0))
    {
      var jieguo=(Number(jieguo)+1).toFixed(0)
    }
    console.log(jieguo)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguo,
    })
  },
   // 地板用量计算
   
  //房间长度
  dbfjcd:function(e){
    this.setData({
      dbfjcd:e.detail.value
    })
  },
  //房间宽度
  dbfjkd:function(e){
    this.setData({
      dbfjkd:e.detail.value
    })
  },
  //地板长度
  dbdcd:function(e){
    this.setData({
      dbdcd:e.detail.value
    })
  },
  //地板宽度
  dbdkd:function(e){
    this.setData({
      dbdkd:e.detail.value
    })
  },
  //计算
  jisuandb(){
    var that=this
    var jieguodb=Math.round((Number(that.data.dbfjcd)/Number(that.data.dbdcd))*(Number(that.data.dbfjkd)/Number(that.data.dbdkd)))
    console.log(jieguodb)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguodb,
    })
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