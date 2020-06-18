// pages/goodsList/goodsList.js
//获取应用实例
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')

Page({
  data: {
    viewUrl:api.viewUrl,
    weizhi:'',
    showModalStatus:false,
    goodslist:[],
    where:'',
    isLastPage:false,
    pageNo:1,
    size:10,
    city:[],
    area:[]
  },

  onLoad: function() {
    this.oneClass()
    this.twoClass()
    this.QueryoneArea()
    this.QuerytwoArea()
    if(app.globalData.oneCity != undefined && app.globalData.oneCity != "undefined"){
      this.setData({
        goodslist:[],
        weizhi:app.globalData.oneCity.name + app.globalData.twoCity.name,
        pageNo:1
      })
      this.selectsp()
    }else{
      this.setData({goodslist:[],weizhi:'全部',pageNo:1})
      this.selectsp()
    }
  },
  // 我要开店
  kaidian:function(e){
    var type = e.currentTarget.dataset.type
    if(type == 2){
      if(app.globalData.wxState == 1){
        wx.showToast({
          title: '您已入驻工人,同一微信不能入驻两种类型',
          icon:'none',
          duration:2000
        })
        return
      }else{
        app.globalData.type1 = 3
        wx.navigateTo({
          url: '../applyBusiness/applyBusiness?typeid=' + type
        })
      }
    }
  },
  // 获取搜索内容
  getText:function(e){
    this.setData({
      where:e.detail.value
    })
  },
  // 搜索商品
  getGoods:function(){
    if(this.data.where==""){
      this.data.where==this.data.where
    }else{
      this.data.where==""
    }
    this.data.pageNo=1
    this.data.isLastPage=false
    this.data.goodslist.splice(0,this.data.goodslist.length)
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
    this.setData({ pageNo: this.data.pageNo + 1 })
    this.selectsp()
  },
  // 获取商品
  selectsp(data){
    var that = this
    var data={
      pageNo:that.data.pageNo,
      size:10,
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
          that.setData({
            goodslist:that.data.goodslist
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
  //隐藏弹窗样式 地址
  hideModal: function() {
    var that = this;
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      hasMask: false
    })
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 左侧按钮
  cityleft: function(e) {
    var that = this;
    // var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name.replace(' ','')
    that.setData({
      cityId: id,
      weizhi:name,
      cityname1: name,
      needsList:[],
    })
    if(id == 0){
      app.globalData.oneCity = undefined
      app.globalData.twoCity = undefined
      that.xqneedlist() //需求
      that.setData({
        area:[],
        showModalStatus: false,
      })
    }else{
      var data ={
        oneAreaId:id
      }
      app.globalData.oneCity = {id:id,name:name}
      that.xqneedlist() //需求
      qingqiu.get("queryTwoArea", data, function(re) {
        if (re.success == true) {
          if (re.result != null) {
            that.area=re.result
            that.setData({
              area:that.area
            })
          }else {
            qingqiu.tk('未查询到任何数据')
          }
        } 
      })
    }
  },
  // 一级区域
  QueryoneArea(){
    var that = this
    qingqiu.get("queryOneArea", null, function(re) {
    if (re.success == true) {
      if (re.result != null) {
        var obj = {id:0,areaName:'全部'}
        var city=[]
        city.push(obj)
        city.push(re.result[0])
        that.setData({
          city:city
        })
      }else {
        qingqiu.tk('未查询到任何数据')
      }
    } 
  })
  },
  // 二级区域
  QuerytwoArea(){
    var that = this
    var data ={
      oneAreaId:that.data.id
    }
    qingqiu.get("queryTwoArea", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          var obj = {id:0,oneAreaId:0,areaName:'全部'}
          var area = []
          area.push(obj)
          for(let obj of re.result){
            area.push(obj)
          }
          that.setData({
            area:that.area
          })
        }else {
          qingqiu.tk('未查询到任何数据')
        }
      } 
    })
  },
  cityyiji: function() {
    var that = this
    qingqiu.get("oneAreaService", {}, function(re) {
      if (re.data.result.length > 0) {
        that.setData({
          cityId: re.data.result[0].id,
          cityname1: re.data.result[0].areaName
        })
      }
      that.setData({
        city: re.data.result
      })
      that.cityerji()
    })
  },
  cityerji: function() {
    var that = this
    var data = {
      oneAreaId: that.data.cityId
    }
    qingqiu.get("getAllTwoArea", data, function(re) {
      that.setData({
        area: re.data.result
      })
    })
  },
  // 一级分类
  oneClass(){
    var that =this
    var data={
      type:3
    }
    qingqiu.get("oneClassList", data, function(re) {
    if (re.success == true) {
      if (re.result != null) {
        that.oneclass = re.result
        that.setData ({
          oneclass : that.oneclass
        })
      } else {
        qingqiu.tk('未查询到任何数据')
      }
    } 
  })
  },
  // 二级分类
  twoClass(){
    var that =this
    var data={
      oneClassId:3
    }
    qingqiu.get("twoClassList", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          that.twoclass = re.result
          that.setData ({
            twoclass : that.twoclass
          })
        } else {
          qingqiu.tk('未查询到任何数据')
        }
      } 
    })
  },
})