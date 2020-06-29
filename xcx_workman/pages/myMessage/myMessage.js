// pages/myMessage/myMessage.js

const app = getApp()
const qingqiu = require('../../utils/request.js')
var api = require('../../utils/config.js')
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    needsTypeid: 1,
    needsTypeList: [{
        id: 1,
        name: '我发起的留言'
      },
      {
        id: 2,
        name: '给我的留言'
      }
    ],
    messageList:[],
    formymessageList:[],
    Lyid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    wx.showShareMenu({
      withShareTicket: true
    })
    if(this.data.needsTypeid == 1){
      this.mymessageList()
    }else{
      this.givemymessageList()
    }
  },
  changeType: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    if(id == 1){
      this.mymessageList()
    }else{
      this.givemymessageList()
    }
    that.setData({
      needsTypeid: id
    })
  },
  // 我发起的留言
  mymessageList() {
    var that = this
    var data={
      wxId:app.globalData.wxid
    }
    qingqiu.get("myMessage", data, function(re) {
    if (re.success == true) {
      if (re.result != null) {
        for(let obj of re.result){
          if(obj.picIurl == null || obj.picIurl == '' || obj.picIurl == 'null' || obj.picIurl == undefined){
            obj.picIurl = ''
          }
          if(obj.name != null && obj.name != 'null'&& obj.name!=''){
            obj.name = obj.name
          }else if(obj.shopName!=null && obj.shopName!='null'&& obj.shopName!=''){
            obj.name = obj.shopName
          }else{
            obj.name = obj.wxNc
          }
        }
        that.setData ({
          messageList : re.result
        })
        console.log(that.data.messageList)
      } else {
        qingqiu.tk('未查询到任何数据')
      }
    } 
  })
},
// 给我的留言
givemymessageList() {
  var that = this
  var data={
    wxId:app.globalData.wxid
  }
  qingqiu.get("messageForMe", data, function(re) {
  if (re.success == true) {
    if (re.result != null) {
      for(let obj of re.result){
        if(obj.picIurl == null || obj.picIurl == '' || obj.picIurl == 'null' || obj.picIurl == undefined){
          obj.picIurl = ''
        }
        if(obj.name != null && obj.name != 'null' && obj.name!=''){
          obj.name = obj.name
        }else if(obj.shopName!=null && obj.shopName!='null' && obj.shopName!=''){
          obj.name = obj.shopName
        }else{
          obj.name = obj.wxNc
        }
      }
      that.setData ({
        formymessageList : re.result 
      })
    } else {
      qingqiu.tk('未查询到任何数据')
    }
  } 
})
},

// 查看留言
liuyan:function(e){
  var id = e.currentTarget.dataset.wxid
  var name = e.currentTarget.dataset.name
  wx.navigateTo({
    url: '../HM-chat/HM-chat?id='+id+'&name='+name, 
  })
},

// 删除我的留言
deletemyLY: function(e) {
  var mylyid =e.currentTarget.dataset.Lyid;
  var data={
    wxId:mylyid
  }
  qingqiu.get("deleteMessage", data, function(re) {
    if (re.success == true) {
      if (re.result ==1) {
        qingqiu.tk('删除成功！')
      } else {
        qingqiu.tk('删除失败！')
      }
    } 
  })
}
})