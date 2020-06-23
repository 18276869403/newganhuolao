// pages/needsDetails/needsDetails.js
const app = getApp()
//调用接口js
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const utils = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    // tupianlist: [{
    //   id: 1,
    //   tupian: '../image/top.png'
    // },
    // {
    //   id: 2,
    //   tupian: '../image/top.png'
    // },
    // {
    //   id: 3,
    //   tupian: '../image/top.png'
    // }
    // ],
    // jiedanList:[{
    //   id:1,
    //   name:'东鹏瓷砖万载总代',
    //   date:'05:00',
    //   details:'我可以做的，找我吧，我在哪哪哪哪',
    //   avator:'../image/top.png'
    // },
    //   {
    //     id: 2,
    //     name: '东鹏瓷砖万载总代',
    //     date: '05:00',
    //     details: '我可以做的，找我吧，我在哪哪哪哪',
    //     avator: '../image/top.png'
    //   },
    //   {
    //     id: 3,
    //     name: '东鹏瓷砖万载总代',
    //     date: '05:00',
    //     details: '我可以做的，找我吧，我在哪哪哪哪',
    //     avator: '../image/top.png'
    //   }],
    xqxqlist:[],
    jiedanList:[],
    tupianlist:[],
    id:'',
    wxUserid:''
  },

  onLoad: function (options) {
    var xqxqlist = JSON.parse(options.obj1)
    xqxqlist.publishMan = utils.formatName(xqxqlist.publishMan)
    this.setData({
      xqxqlist: xqxqlist,
      id:xqxqlist.id,
      wxUserid: app.globalData.wxid
    })
    console.log(this.data.wxUserid)
    console.log(xqxqlist)
    this.SelectjiedanList()
    // this.SelecttupianList()
  }, 
  // 接单人员
  SelectjiedanList() {
    var that = this
    var data={
      needId: that.data.id,
      pages: 1,
      size: 10
    }
    console.log(data)
    qingqiu.get("needSignPage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          console.log(re)
          var list  = re.result.records
          for(let obj of list){
            if(obj.name != null && obj.name != "" && obj.name != "null"){
              obj.name = obj.name
            }else if(obj.shopName != null && obj.shopName != "" && obj.shopName != "null"){
              obj.name = obj.shopName
            }else{
              obj.name = obj.wxNc
            }
            if(obj.picIurl != null && obj.picIurl!=""&& obj.picIurl!= "null"){
              obj.picIurl = api.viewUrl + obj.picIurl
            }else{
              obj.picIurl = obj.picUrl
            }
            if(obj.signTime != null && obj.signTime != undefined && obj.signTime != ""){
              obj.signTime = obj.signTime.slice(0,16)
            }
          } 
          that.setData ({
            jiedanList : list
          })
        } else {
          qingqiu.tk('未查询到任何数据')
        }
      } 
    })
  },
  // 图片
  // SelecttupianList() {
  //   var that = this
  //   var data={
  //     id: that.id,
  //     pages: 1,
  //     size: 10
  //   }
  //   qingqiu.get("zuixinxq", data, function(re) {
  //     if (re.success == true) {
  //       if (re.result != null) {
  //         // that.tupianlist = re.result.records
  //         for(let obj of re.result.records){
  //           obj.backup1 = api.viewUrl + obj.backup1.split(',')[0]
  //         }
  //         that.setData ({
  //           tupianlist : re.result.records
  //         })
  //         debugger
  //       } 
  //     } 
  //   })
  // },
  // 需求修改
  xiugaigunali(){
    wx.navigateTo({
      url: '../submitNeeds/submitNeeds?type=1&id=' + this.data.xqxqlist.id,
    })
  },
  // 需求在线联系
  zaixianlianxi(){
    wx.showToast({
      title: '这个按钮还没有对接哦！',
      icon:'success',
      duration:2000
    })
  },
  // 需求报名
  baoming(){
    var that = this
    var data = {
      needId:that.data.id,
      wxUserId:app.globalData.wxid
    }
    wx.showModal({
      title:'提示',
      cancelText:'否',
      content:'你确认参与该需求吗？确认后雇主将能够看见你的联系方式！',
      confirmText:'是',
      success:function(res){
        if(res.confirm){
          console.log(data)
          qingqiu.get("insertNeedSign",data,function(res){
            if(res.success == true){
              wx.showToast({
                title: '报名成功',
                icon:'success',
                duration:2000
              })
              that.SelectjiedanList()
            }else{
              wx.showToast({
                title: res.message,
                icon:'none',
                duration:2000
              })
            }
          },'post')
        }else{
          return
        }
      }
    })
  },
  // 需求删除
  shancuoxuqiu() {
    var that = this
    var data={
      id: that.id
    }
    wx.showModal({
      title:'提示',
      content:'您确定删除吗？',
      success:function(res){
        if(res.confirm){
          qingqiu.get("delYneedAndNeedSign", data, function(re) {
            if (re.success == true) {
               wx.showToast({
                 title: '删除成功',
                 icon:'success',
                 duration:2000
               })
               setTimeout()
              } else {
                wx.showToast({
                  title: re.message,
                  icon: 'none',
                  duration: 2000
                })
              } 
          },'delete')
        }else{
          return
        }
      }
    })
  },
  // 需求完成
  lianxita() {
    var that = this
    var data={
      id: that.id,
      needState: 1
    }
    qingqiu.get("needUpdateStateById", data, function(re) {
      if (re.success == true) {
        wx.showToast({
          title: '需求已完成',
          icon: 'success',
          duration: 3000
        })
      } else{
        wx.showToast({
          title: re.message,
          icon: 'none',
          duration: 2000
        })
      }
    },"put")
  },
  // 图片放大
  fangda:function(e){
    var currentUrl = e.currentTarget.dataset.src
    wx.previewImage({
      current: currentUrl, // 当前显示图片的http链接
      urls: [currentUrl] // 需要预览的图片http链接列表
    })
  }
})