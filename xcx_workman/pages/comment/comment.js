// pages/comment/comment.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    needsname: '',
    needscontent: '',
    wxuserid:'',
    picUrl:'',
    id: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    this.setData({
      wxuserid: app.globalData.wxid
    })
    this.data.id = JSON.parse(options.id)
  },
  // 发布评论
  pinglun(){
    var that=this
    var data={
      wxId:that.data.wxuserid,
      wxCaseId:that.data.id,
      content:that.data.needscontent
    }
    qingqiu.get("insertCaseMessage", data, function(re) {
      if (re.success == true) {
        wx.showToast({
          title: '提交成功！',
          icon: 'none',
          duration: 3000
        })
        wx.redirectTo({
          url: '../showDetails/showDetails',
        })
      }else{
        wx.showToast({
          title: '提交失败！',
          icon: 'none',
          duration: 3000
        })
      }
    },'post')
  },
  //获取输入的评论内容
  commentinput: function (e) {
    this.setData({
      needscontent: e.detail.value
    })
  },

})