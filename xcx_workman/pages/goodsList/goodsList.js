// pages/goodsList/goodsList.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')

Page({
  data: {
    viewUrl:api.viewUrl,
    // goodslist: [{
    //     id: 1,
    //     name: '室内F-10木门（含五室内F-10木门（含五',
    //     price: '122',
    //     img: '../image/top.png',
    //     storename: ' 马克波罗瓷砖专卖店'
    //   },
    //   {
    //     id: 2,
    //     name: '室内F-10木门（含五室内F-10木门（含五',
    //     price: '120',
    //     img: '../image/chuang.png',
    //     storename: ' 马克波罗瓷砖专卖店'
    //   },
    //   { 
    //     id: 3,
    //     name: '室内F-10木门（含五室内F-10木门（含五',
    //     price: '12',
    //     img: '../image/chuang.png',
    //     storename: ' 马克波罗瓷砖专卖店'
    //   },
    // ],
    // needsList: [{
    //     id: 1,
    //     needType: 0,
    //     title: '祥源乡新农村工程点需要友们火速联系！',
    //     price: '350/天',
    //     location: '万载 | 双桥镇',
    //     number: 2,
    //     date: '2019.11.15',
    //     status: '进行中'
    //   },
    //   {
    //     id: 2,
    //     needType: 1,
    //     title: '祥源乡新农村工程点需要友们火速联系！',
    //     price: '350/天',
    //     location: '万载 | 双桥镇',
    //     number: 2,
    //     date: '2019.11.15',
    //     status: '进行中'
    //   },
    //   {
    //     id: 3,
    //     needType: 0,
    //     title: '祥源乡新农村工程点需要友们火速联系！',
    //     price: '350/天',
    //     location: '万载 | 双桥镇',
    //     number: 2,
    //     date: '2019.11.15',
    //     status: '进行中'
    //   }
    // ],
    goodslist:[],
    where:'',
    isLastPage:false,
    pages:1,
    size:10
  },

  onLoad: function() {
    this.selectsp()
  },
  // 我要开店
  kaidian:function(){
    wx.navigateTo({
      url: '../applyBusiness/applyBusiness?typeid='+ "2",
    })
  },
  // 获取搜索内容
  getText:function(e){
    this.setData({
      where:e.detail.value
    })
  },
  // 搜索商品
  getGoods:function(){
    // if(this.data.where==""){
    //   this.selectsp({pages:1,size:this.data.size})
    // }else{
    //   this.selectsp({pages:1,size:this.data.size,goodName:this.data.where})
    // }
    this.selectsp()
  },
  // 上拉功能
  onReachBottom: function () {
    if (this.data.isLastPage) {
      wx.showToast({
        title: '没有更多了！',
        icon:'none',
        duration:2000
      })
        return
    }
    this.setData({ pages: this.data.pages + 1 })
    this.selectsp()
  },
  // 获取商品
  selectsp(data){
    var that = this
    var data={
      pages:that.data.pages,
      size:10,
      isLastPage: false,
      tips: '上拉加载更多',
      goodName:that.data.where
    }
    qingqiu.get("tjsp", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          if(re.result.records==''){
            that.data.isLastPage=true
            wx.showToast({
              title: '没有更多了！',
              icon:'none',
              duration:2000
            })
            return
          }
          that.goodslist=re.result.records
          for(let obj of re.result.records){
            obj.goodPic1 = api.viewUrl + obj.goodPic1.split(',')[0]
            that.data.goodslist.push(obj)
          }
          console.log(that.data.goodslist)
          that.setData({
            goodslist:that.goodslist
          })
        }else{
          wx.showToast({
            title: '暂无商品！',
            icon: 'none',
            duration: 3000
          })
        }
      }else{
        wx.showToast({
          title: '加载失败！',
          icon: 'none',
          duration: 3000
        })
      }
    })
  },
  // 跳转到商品详情页面
  goodsDetails(e) {
    var obj =e.currentTarget.dataset.vals;
    var shopxq = JSON.stringify(obj);
        //debugger
    wx.navigateTo({
      url: '../goodsDetails/goodsDetails?obj=' + shopxq,
    })
  },
})