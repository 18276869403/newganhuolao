// pages/myMessage/myMessage.js

// const app = getApp()
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
    // messageList: [{
    //   id: 1,
    //   name: '万载梦天木门专卖店',
    //   date: '2019-10-26 10-23',
    //   sort1: '水电工',
    //   sort11: '泥瓦工',
    //   sort111: '水暖',
    //   sort2: '水电工',
    //   sort22: '泥瓦工',
    //   sort222: '水暖',
    //   area:'万载',
    //   street:'双桥镇'
    // },
    //   {
    //     id: 2,
    //     name: '万载梦天木门专卖店',
    //     date: '2019-10-26 10-23',
    //     sort1: '水电工',
    //     sort11: '泥瓦工',
    //     sort111: '水暖',
    //     sort2: '水电工',
    //     sort22: '泥瓦工',
    //     sort222: '水暖',
    //     area: '万载',
    //     street: '双桥镇'
    //   },
    //   {
    //     id: 3,
    //     name: '万载梦天木门专卖店',
    //     date: '2019-10-26 10-23',
    //     sort1: '水电工',
    //     sort11: '泥瓦工',
    //     sort111: '水暖',
    //     sort2: '水电工',
    //     sort22: '泥瓦工',
    //     sort222: '水暖',
    //     area: '万载',
    //     street: '双桥镇'
    //   }],
    messageList:[],
    formymessageList:[],
    Lyid:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.Lyid = JSON.parse(options.obj)
    this.mymessageList()
    this.givemymessageList()
  },
  changeType: function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    that.setData({
      needsTypeid: id
    })
  },
  // 我发起的留言
  mymessageList() {
    var that = this
    var data={
      wxCaseId2:that.Lyid
    }
    qingqiu.get("pcQueryMessagePageByUserID", data, function(re) {
      console.log(re)
    if (re.success == true) {
      if (re.result != null) {
        that.messageList = re.result.records
        that.setData ({
          messageList : re.result.records
        })
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
    wxCaseId:that.Lyid
  }
  qingqiu.get("pcQueryMessagePageByUserID", data, function(re) {
  if (re.success == true) {
    if (re.result != null) {
      that.formymessageList = re.result.records
      that.setData ({
        formymessageList : re.result.records
      })
    } else {
      qingqiu.tk('未查询到任何数据')
    }
  } 
})
},
// 删除我的留言
deletemyLY: function(e) {
  var mylyid =e.currentTarget.dataset.Lyid;
  var data={
    wxCaseId:mylyid
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