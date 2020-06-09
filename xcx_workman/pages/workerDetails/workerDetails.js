//获取应用实例
const app = getApp()

const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({
  data: {
    viewUrl:api.viewUrl,
    workerDetail:[],
    showList:[],
    id:'',
    wxUserId:'',
    workerskill:'',
    price:'',
    istrue:0,
    flag: true,
    index: 0,
    day: 0,
    predict:'',
    array: ['天/元', '月/元', '季/元', '年/元'],
    tian: ['天', '月', '季', '年']
  },

  onLoad: function (options) {
    var workerDetail = JSON.parse(options.obj)
    var id = workerDetail.id
    var phone = workerDetail.phone
    phone = util.formatPhone(phone)
    this.setData({
      id:id,
      workerDetail :workerDetail,
      phone:phone
    })
    this.grshowList()
  },
  // 图片放大，放大预览
  preview:function(e){
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: [current] // 需要预览的图片http链接列表
    })
  },

  // 电话号显示隐藏
  phoneshow:function(){
    if(this.data.istrue == 0){
      this.setData({ 
        istrue:1
      })
    }else{
      this.setData({
        istrue:0
      })
    }
  },
  // 获取工人晒晒
  grshowList() {
    var that = this
    var data={
      wxUserId:this.data.id,
      pages: 1,
      size: 10
    }
    qingqiu.get("CasePage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          that.showList=re.result.records
          for(var i= 0 ; i < that.showList.length; i++){
            that.showList[i].picOne = api.viewUrl+re.result.records[i].picOne.split(',')[0]
          } 
          that.setData({
            showList:re.result.records
          })
        } 
      } 
    })
  },
  // 晒晒点击事件
  goshowshai:function(e){
    var obj = e.currentTarget.dataset.id
    console.log(obj)
    wx.navigateTo({
      url: '../showDetails/showDetails?obj='+ obj,
    })
  },
  bindPickerChange: function(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  bindPickerDay: function(e) {
    this.setData({
      day: e.detail.value
    })
  },
  bindPrice:function(e){
    this.setData({
      price:e.detail.value
    })
  },
  bindDate:function(e){
    this.setData({
      predict: e.detail.value
    })
  },
  bintapDetails: function() {
    // console.log(1)
    this.setData({
      flag: false
    })
  },
  bindClose: function() {
    this.setData({
      flag: true
    })
  },
  //获取雇佣事项
  guyongshiinput: function(e) {
    this.setData({
      workerskill: e.detail.value
    })
  },

  // 确认雇佣
  bindCon: function() {
    if(app.globalData.wxid == ""||app.globalData.wxid == null){
      this.onUser()
    }
    var data = {
      wxCaseId:app.globalData.wxid,
      wxCaseId2:this.data.workerDetail.id,
      estimatedCost:this.data.price + this.data.array[this.data.index],
      employmentMatters:this.data.workerskill,
      hiringTime:util.formatDate(new Date()),
      predict:this.data.predict,
      backup1:this.data.tian[this.data.day]
    }
    qingqiu.get("userWorkAdd",data,function(res){
      if(res.success == true){
        wx.showToast({
          title: '雇佣成功',
          icon:'success',
          duration:2000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../myEmploy/myEmploy',
          })
        },1000)
      }else{
        wx.showToast({
          title: res.message,
          icon:'none', 
          duration:3000
        })
        setTimeout(function(){
          wx.navigateTo({
            url: '../myInfo/myInfo?id=' + app.globalData.wxid,
          })
        })
      }
    },'post')
    this.setData({
      flag: true
    })
  },
  // onUser: function() {
  //   wx.login({
  //     success: function(res) {
  //       qingqiu.get("getKeyInfo", {
  //         code: res.code
  //       }, function(re) {
  //         app.globalData.wxid = re.result.wxUser.id
  //         if (re.result.wxUser.picUrl != null && re.result.wxUser.picUrl.length > 0) {
  //           app.globalData.sqgl = 1
  //         }
  //         app.globalData.openid = re.result.openId
  //         app.globalData.wxState = re.result.wxUser.wxState
  //       }, "POST")
  //     }
  //   })
  // },
  phonecall:function(e){
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  }
})