// pages/Welfare/Welfare.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    viewUrl: api.viewUrl,
    gongyilist:[{
      id:1,
      title:'七月敬老活动',
      content:'关爱老人，关爱留守儿童',
      time:'2020-7-20'
    },{
      id:2,
      title:'七月敬老活动',
      content:'关爱老人，关爱留守儿童',
      time:'2020-7-20'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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