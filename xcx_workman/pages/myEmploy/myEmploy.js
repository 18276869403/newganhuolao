// pages/myEmploy/myEmploy.js
const app = getApp()
const qingqiu = require("../../utils/request.js")
const api = require("../../utils/config.js")
const util = require("../../utils/util.js")

Page({
  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    xqlist:{},
    id:'',
    needsTypeid: 1,
    needsTypeList: [{
        id: 1,
        name: '我的雇佣'
      },
      {
        id: 2,
        name: '雇佣我的'
      }
    ],
    price:0,
    istrue:0,
    flag: true,
    index: 0,
    day: 0,
    predict:'',
    array: ['天/元', '月/元', '季/元', '年/元'],
    tian: ['天', '月', '季', '年'],
    messageList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.getmyEmploy()
  },
  changeType: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.setData({
      needsTypeid: id
    })
    this.getmyEmploy()
  },
  phonecall: function(e) {
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone 
    })
  },
  // 删除我的雇佣
  delEmploy:function(e){
    var that = this
    var data = {
      id:e.currentTarget.dataset.id
    }
    qingqiu.get("deleteUserWork",data,function(res){
      console.log(res)
      if(res.success == true){
        wx.showToast({
          title: '删除成功',
          icon:'success',
          duration:2000
        })
      }
    },'delete')
  },
  
  // 获取我的雇佣
  getmyEmploy:function(){
    var that = this
    var data = ""
    if(that.data.needsTypeid == 1){
      data = {
        wxCaseId:app.globalData.wxid
      }
    }else{
      data = {
        wxCaseId2:app.globalData.wxid
      }
    }
    qingqiu.get("userWorkPage",data,function(re){
      if (re.success == true) {
        if (re.result != null) {
          for(let obj of re.result.records){
            obj.picIurl = api.viewUrl + obj.picIurl
            obj.hiringTime = obj.hiringTime.split(' ')[0]
          }
          that.setData({
            messageList:re.result.records
          })
        }else{
          wx.showToast({
            title: '未雇佣工人',
            icon:'none',
            duration:3000
          })
        }
      } 
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
  bintapDetails: function(e) {
    // console.log(1)
    var xqlist = e.currentTarget.dataset.item
    xqlist.estimatedCost = xqlist.estimatedCost.replace('天/元','')
    console.log(xqlist)
    this.setData({
      flag: false,
      xqlist: xqlist
    })
  },
  // 修改雇佣
  bindCon: function() {
    var data = {
      id:this.data.xqlist.id,
      estimatedCost:this.data.price + this.data.array[this.data.index],
      employmentMatters:this.data.workerskill,
      hiringTime:util.formatDate(new Date()),
      predict:this.data.predict,
      backup1:this.data.tian[this.data.day]
    }
    qingqiu.get("userWorkUpdateById",data,function(res){
      console.log(res)
      if(res.success == true){
        wx.showToast({
          title: '修改成功',
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
          title: '修改失败',
          icon:'none',
          duration:3000
        })
      }
    },'put')
    this.setData({
      flag: true
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
})