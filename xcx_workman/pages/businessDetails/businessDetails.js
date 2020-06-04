// pages/businessDetails/businessDetails.js
//获取应用实例
const app = getApp()

const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')

Page({
  data: {
    viewUrl:api.viewUrl,
    goodsList:[],
    viewUrl:api.viewUrl,
    score: 3,
    CheckItem: 0,
    showList: [{
        id: 1,
        pinglun: '12',
        liulan: '12',
      },
      {
        id: 2,
        pinglun: '12',
        liulan: '12',
      },
      {
        id: 3,
        pinglun: '12',
        liulan: '12',
      },
    ],
    goodsdata1: [{
        colName: "商品",
        id: 0
      },
      {
        colName: "晒晒",
        id: 1
      }
    ],
    goodslists: [{
        id: 1,
        name: '室内F-10木门（含五室内F-10木门（含五',
        price: '12',
      },
      {
        id: 2,
        name: '室内F-10木门（含五室内F-10木门（含五',
        price: '12',
      },
      {
        id: 3,
        name: '室内F-10木门（含五室内F-10木门（含五',
        price: '12',
      },
    ]
  },
  // 图片预览
  tupian:function(e){
    var current = e.currentTarget.dataset.src
    wx.previewImage({
      current: current,//当前显示图片的http链接，我这边是把图片转成了base64
      urls: [current] //需要预览的图片http链接列表
    })
  },
  onLoad: function(options) {
    var obj = JSON.parse(options.obj)
    console.log(obj)
    this.setData({
      goodsList:obj
    })
    this.getGoodsList(obj.id)
    this.getGoodsdata(obj.id)
  },
  phonecall:function(e){
    var phone = e.currentTarget.dataset.phone
    wx.makePhoneCall({
      phoneNumber: phone,
    })
  },
  // 跳转商家详情页
  goshowshai:function(e){
    var id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../showDetails/showDetails?obj=' + id,
    })
  },

  // 获取店家晒晒
  getGoodsdata:function(id){
    var that = this
    var data = {
       wxUserId:id
    }
    qingqiu.get("casePage", data, function(re) {
    if (re.success == true) {
      if (re.result.records != null) {
          that.goodsList = re.result.records
          for(let obj of re.result.records){
            if(obj.picOne.indexOf(",") == -1){
              obj.picOne = that.data.viewUrl + obj.picOne
            }else{
              obj.picOne= that.data.viewUrl + obj.picOne.split(',')[0]
              obj.picTwo= that.data.viewUrl + obj.picTwo.split(',')[0]
            }
          }
          that.setData ({
            showList: re.result.records
          })
        }
      } 
    })
  },
  // 跳转商品详情
  goGoodsDetails:function(e){
    var obj = JSON.stringify(e.currentTarget.dataset.vals)
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?obj=' + obj
    })
  },

  // 获取店家商品
  getGoodsList:function(goodsid) {
      var that = this
      var data={
        pages: 1,
        size: 10,
        userId:goodsid,
        backup1:1
      }
      qingqiu.get("tjsp", data, function(re) {
        if (re.success == true) {
          if (re.result.records != null) {
            that.goodsList = re.result.records
            for(let obj of re.result.records){
              obj.goodPic1 = that.data.viewUrl + obj.goodPic1.split(',')[0]
              obj.goodPic2  = that.data.viewUrl + obj.goodPic2.split(',')[0]
            }
            that.setData ({
              goodslists: re.result.records
            })
          } else {
            qingqiu.tk('未查询到任何数据')
          }
        } 
      })
    },
  //最新最热样式变动
  serviceSelection1: function(e) {
    var navid = e.currentTarget.id;
    this.setData({
      CheckItem: navid
    })
  },
})