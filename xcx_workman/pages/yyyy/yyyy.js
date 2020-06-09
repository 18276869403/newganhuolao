// pages/yyyy/yyyy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shendu:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    sgd:function(e){
    this.setData({
      sgd:e.detail.value
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
    wx.navigateTo({
      url: '../jsjg/jsjg',
    })
    console.log(this.data.shendu)
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