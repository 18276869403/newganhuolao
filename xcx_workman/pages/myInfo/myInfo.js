// pages/myInfo/myInfo.js
var app = getApp()
var qingqiu = require('../../utils/request.js')
var api = require('../../utils/config.js') 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    birth: "2019-01-02",
    sex: '0',
    itemList: ['男', '女'],
    date: '1990-01-01',
    name: '',
    phone: '',
    wxUser:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var obj = JSON.parse(options.obj)
    this.setData({
      wxUser:obj
    })
    console.log(this.data.wxUser)
  },

  // 保存
  UpdateUserInfo:function(){
    var that = this
    var data = {
      id:that.data.wxUser.id,
      name:that.data.wxUser.name,
      dateBirth:that.data.wxUser.dateBirth,
      sex:that.data.wxUser.sex,
      phone:that.data.wxUser.phone
    }
    qingqiu.get("editWxUser",data,function(re){
      if (re.success == true) {
        wx.navigateTo({
          url: '../mine/mine'
        })
      } 
    },'put')
  },

  //性别选择
  sexChoose: function () {
    var that = this;
    wx.showActionSheet({
      itemList: that.data.itemList,
      success(res) {
        console.log(res.tapIndex)
        var sex = "wxUser.sex"
        that.setData({
          [sex]: res.tapIndex
        })
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },
  //日期选择器
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var dateBirth = "wxUser.dateBirth"
    this.setData({
      [dateBirth] : e.detail.value
    })
  },
  //获取输入的名称
  nameinput: function (e) {
    var name = "wxUser.name"
    this.setData({
      [name]: e.detail.value
    })
  },
  //获取输入的手机号
  phoneinput: function (e) {
    var phone = "wxUser.phone"
    this.setData({
      [phone]: e.detail.value
    })
  },
})