// pages/myGoods/myGoods.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    goodsList: [{
        id: 1,
        img: '../image/top.png', 
        name: '室内F-10木门（含五金件五',
        price: '299'
      },
      {
        id: 2,
        img: '../image/top.png',
        name: '室内F-10木门（含五金件五',
        price: '299'
      },
      {
        id: 3,
        img: '../image/top.png',
        name: '室内F-10木门（含五金件五',
        price: '299'
      },
      {
        id: 4,
        img: '../image/top.png',
        name: '室内F-10木门（含五金件五',
        price: '299'
      },
      {
        id: 5,
        img: '../image/top.png',
        name: '室内F-10木门（含五金件五',
        price: '299'
      },
      {
        id: 6,
        img: '../image/top.png',
        name: '室内F-10木门（10木门（含五金件五10木门（含五金件五含五金件五',
        price: '299'
      }
    ],
    goodsLists:[],
    spmyid:'',
    spid:'',
    spxx:'',
    type:0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.mygoodsList()
  },
  // 我的商品
  mygoodsList() {
    var that = this
    var data={
      userId:app.globalData.wxid
  }
  qingqiu.get("queryMyGoodPage", data, function(re) {
    console.log(re)
  if (re.success == true) {
    if (re.result != null) {
      that.goodsLists = re.result.records
      for(var i= 0 ; i < that.goodsLists.length; i++){
        if(re.result.records[i].goodPic1 !=null && re.result.records[i].goodPic1.length>0){
          that.goodsLists[i].goodPic1 = re.result.records[i].goodPic1.split(',')
          that.goodsLists[i].goodPic2 = re.result.records[i].goodPic2.split(',')
        }            
      } 
      that.setData ({
        goodsLists : re.result.records
      })
    } else {
      qingqiu.tk('未查询到任何数据')
    }
  } 
})
},
  // 添加商品
  addEditGoods:function(e){
    wx.navigateTo({
      url: '../addEditGoods/addEditGoods?obj='+ app.globalData.wxid, 
    })
  },
  //置顶
  onemyGood:function(e){
    var spid =e.currentTarget.dataset.myspid;
    this.data.spid=spid
    var data={
      id: spid 
    }
    qingqiu.get("editMyGoodTop", data, function(re) {
    if (re.success == true) {
      wx.showToast({
        title: '置顶成功！',
        icon:'none',
        duration:2000
      })
    }
  },'put')
  this.mygoodsList()
  },

  // 编辑商品
  addEditGoods2:function(e){
    var spxx = e.currentTarget.dataset.spxx
    var spxx1 = JSON.stringify(spxx);
    wx.navigateTo({
      url: '../addEditGoods/addEditGoods?obj1='+ spxx1,
    })
  },
  //删除我的商品
  DeletemyGood: function(e) {
    var that = this
    var spid =e.currentTarget.dataset.myspid;
    var data={
      id: spid 
    }
    var userid = JSON.stringify(that.spmyid)
    wx.showModal({
      title: '提示',
      content: '你确定要删除吗？',
      success (res) {
        if (res.confirm) {
          qingqiu.get("deleteUserGood", data, function(re) {
            if (re.success == true) {
              wx.showToast({
                title: '删除成功！',
                icon:'none',
                duration:2000
              })
              that.onLoad()
            }},"delete")
        } else if (res.cancel) {
          wx.showToast({
            title: '取消删除！',
            icon:'none',
            duration:2000
          })
        }
      }
    })
},
mygooddetail(e){
  var spxx = e.currentTarget.dataset.mgd
  var spxx1 = JSON.stringify(spxx);
  wx.navigateTo({
     url: '../goodsDetails/goodsDetails?obj=' + spxx1,
  })
}
})