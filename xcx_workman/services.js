//获取应用实例
const app = getApp()

const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({
  data: {
    viewUrl: api.viewUrl,
    chooseworker: 1,
    needsList: [{
        id: 1,
        needType: 0,
        title: '祥源乡新农村工程点需要友们火速联系！',
        price: '350/天',
        location: '万载 | 双桥镇',
        number: 2,
        date: '2019.11.15',
        status: '进行中'
      },
      {
        id: 2,
        needType: 1,
        title: '祥源乡新农村工程点需要友们火速联系！',
        price: '350/天',
        location: '万载 | 双桥镇',
        number: 2,
        date: '2019.11.15',
        status: '进行中'
      },
      {
        id: 3,
        needType: 0,
        title: '祥源乡新农村工程点需要友们火速联系！',
        price: '350/天',
        location: '万载 | 双桥镇',
        number: 2,
        date: '2019.11.15',
        status: '进行中'
      }
    ],
    goodsdata3: [{
        id: 1,
        name: '商家'
      },
      {
        id: 2,
        name: '工人'
      }
    ],
    workerlist: [],
    businesslist: [{
        id: 1,
        businessname: '新飞电器万载店'
      },
      {
        id: 2,
        businessname: '新飞电器万载店'
      },
      {
        id: 3,
        businessname: '新飞电器万载店'
      }
    ]
  },

  onLoad: function() {
    this.grneedlist(this.data.chooseworker)
  },
  changeType: function(e) {
    var that = this
    if (that.data.chooseworker == 0) {
      that.setData({
        chooseworker: 1
      })
      that.grneedlist(that.data.chooseworker)
    } else {
      that.setData({
        chooseworker: 0
      })
      that.sjneedlist(that.data.chooseworker)
    }
  },
  // 跳转到商家详情页面
  businessDetails: function () {
    wx.navigateTo({
      url: '../businessDetails/businessDetails',
    })
  },
  // 推荐工人
  grneedlist(type) {
    var that = this
    var data={
      pages: 1,
      size: 10,
      wxState:type
    }
    qingqiu.get("wxUserPage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          for(let obj of re.result.records){
            if(obj.starClass == 0){
              obj.shopName = ""
            }else if(obj.starClass == 1){
              obj.shopName = "一级工匠"
            }else if(obj.starClass == 2){
              obj.shopName = "二级工匠"
            }else if(obj.starClass == 3){
              obj.shopName = "三级工匠"
            }else if(obj.starClass == 4){
              obj.shopName = "四级工匠"
            }if(obj.starClass == 5){
              obj.shopName = "五级工匠"
            }
            obj.dateBirth = util.ages(obj.dateBirth)
            obj.picIurl = that.data.viewUrl + obj.picIurl
            obj.oneClassName = obj.oneClassName.replace(/,/, " | ")
            obj.twoClassName = obj.twoClassName.replace(/,/, " | ")
          }
          console.log(re.result.records)
          that.setData({
            workerlist:re.result.records
          })
        } 
      } 
    })
  },

  // 推荐商家
  sjneedlist(type) {
    var that = this
    var data={
      pages: 1,
      size: 10,
      wxState:type
    }
    qingqiu.get("wxUserPage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          for(let obj of re.result.records){
            obj.picIurl = that.data.viewUrl + obj.picIurl
            obj.oneClassName = obj.oneClassName.replace(/,/, "|")
            obj.twoClassName = obj.twoClassName.replace(/,/, "|")
          }
          console.log(re.result.records)
          that.setData({
            businesslist:re.result.records
          })
        } 
      } 
    })
  },
  // 跳转到工人详情页面
  workerDetails: function () {
    wx.navigateTo({
      url: '../workerDetails/workerDetails',
    })
  },
})