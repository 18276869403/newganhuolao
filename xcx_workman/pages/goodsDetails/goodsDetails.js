// pages/goodsDetails/goodsDetails.js
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    spxqlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.spxiangqinglist()
    var splist = JSON.parse(options.obj)
    this.setData({
      splist: splist
    })
  },
  tupian:function(e){
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current,//当前显示图片的http链接，我这边是把图片转成了base64
      urls: [current] //需要预览的图片http链接列表
    })
  },
  // 进他的店
  goShopping:function(){
    var that = this
    var data = {
      id:that.data.splist.userId,
    }
    qingqiu.get("queryWxUser",data,function(res){
      if(res.success==true){
        res.result.picIurl = that.data.viewUrl + res.result.picIurl
        var obj = JSON.stringify(res.result)
        wx.navigateTo({
          url: '../businessDetails/businessDetails?obj=' + obj,
        })
      }else{
        wx.showToast({
          title: '操作出错了',
          icon:'none',
          duration:'2000'
        })
      }
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