//index.js
//获取应用实例
const app = getApp()
//调用接口js
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({
  data: {
    viewUrl:api.viewUrl,
    sousuotext:'',
    gongren:'2',
    shangjia:'1',
    msgList: [],
    bannerImg: [],
    needsList: [],
    needsListfy:[],
    workerList: [],
    storeList: [],
    goodsList: [],
    xuqiulist:[],
    grlist:[],
    sjlist:[],
    tupian:[]
  },
  // 搜索框
  shurukuang:function(e){
    this.setData({
      sousuotext:e.detail.value
    })
  },
  // 搜索按钮
  btnsearch:function(){
    var obj = {
      pageNo:1,
      pageSize:3
    }
    if(this.data.sousuotext != "" || this.data.firstId != "undefined" || this.data.firstId != null){
      obj.needTitle = this.data.sousuotext
    }
    this.xqneedlist(obj)
  },
  onLoad: function() {
    var that = this
    wx.login({
      success: function(res) {
        qingqiu.get("getKeyInfo", {
          code: res.code
        }, function(re) {
          app.globalData.wxid = re.result.wxUser.id
          if (re.result.wxUser.picUrl != null && re.result.wxUser.picUrl.length > 0) {
            app.globalData.sqgl = 1
          }
          app.globalData.openid = re.result.openId
          app.globalData.wxState = re.result.wxUser.wxState
          that.setData({
            openid:re.result.openId
          })
        }, "POST")
      } 
    })
    this.firstbanner() //banner
    this.pointList() //通知
    this.xqneedlist({pageNo:1,pageSize:3}) //需求
    this.grneedlist() //工人
    this.sjneedlist()  //商家
    this.spneedlist() //商品
    this.QueryoneArea() //一级区域
    this.QuerytwoArea() //二级区域
    this.setData({
      weizhi:app.globalData.weizhi
    })
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  // 截获竖向滑动
  catchTouchMove:function(res){
    return false
  },
  // 需求列表
  xqneedlist(data) {
    var that = this
    qingqiu.get("zuixinxq", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          that.xuqiulist = re.result.records
          for(var i= 0 ; i < that.xuqiulist.length; i++){
            that.xuqiulist[i].publishTime = re.result.records[i].publishTime.split(" ")[0]
            if(that.xuqiulist[i].backup1 != null&& that.xuqiulist[i].backup1.length > 0){
              that.xuqiulist[i].backup1 = re.result.records[i].backup1.split(',')
            }
          }  
          that.setData ({
            xuqiulist : re.result.records,
          })
          console.log(that.data.xuqiulist)
        } else {
          qingqiu.tk('未查询到任何数据')
        }
      } 
    })
  },
  // 推荐工人
  grneedlist() {
    var that = this
    var data={
      pages: 1,
      size: 4,
      wxState:1
    }
    qingqiu.get("wxUserPage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          for(let obj of re.result.records){
            if(obj.starClass == 0){
              obj.shopName = "暂未评定"
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
            obj.picIurl = that.data.viewUrl + obj.picIurl
            obj.dateBirth = util.ages(obj.dateBirth)
            obj.oneClassName = obj.oneClassName.replace(/,/, "|")
            obj.twoClassName = obj.twoClassName.replace(/,/, "|")
          }
          console.log(re.result.records)
          that.setData({
            workerList:re.result.records
          })
        } 
      } 
    })
  },
  // 推荐商家
  sjneedlist() {
    var that = this
    var data={
      pages: 1,
      size: 4,
      wxState:0
    }
    qingqiu.get("wxUserPage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          for(let obj of re.result.records){
            obj.picIurl = that.data.viewUrl + obj.picIurl
            obj.oneClassName = obj.oneClassName.replace(/,/, "|")
            obj.twoClassName = obj.twoClassName.replace(/,/, "|")
          }
          that.setData({
            storeList:re.result.records
          })
        } 
      } 
    })
  },

  // 获取广告
  firstbanner:function() {
    var that = this
    var data = {
      page:1,
      size:100      
    }
    qingqiu.get("bannerlist", data , function(re){
      if(re.success == true){
        if(re.result != null){
          that.data.bannerImg = re.result
          for(let obj of that.data.bannerImg){
            obj.bannerUrl= that.data.viewUrl+obj.bannerUrl;
          }
          that.setData({
            bannerImg:that.data.bannerImg
          })
        }
      }
    })
  },

  // banner点击事件
  goBaidu:function(event){
    var data = (event.currentTarget.dataset)
    wx.navigateTo({
      url:'../outurl/outurl?goBaidu='+ data.url, //
      success:function() {
      },       //成功后的回调；
      fail:function() { },         //失败后的回调；
      complete:function() { },      //结束后的回调(成功，失败都会执行)
    })
  },

  // 通知
  pointList:function(){
    var that = this
    var data = {
      page:1,
      size:10      
    }
    qingqiu.get("pointList", data ,function(re){
      if(re.success == true){
        if(re.result != null){
          for(let obj of re.result.records){
            obj.name = util.formatName(obj.name)
            obj.name = "恭喜" + obj.name + "成功入驻";
          }
          that.setData({
            msgList:re.result.records
          })
        }
      }
    })
  },
 
  // 跳转到工人入驻页面
  applyBusiness: function(e) {
    var obj = e.currentTarget.dataset.typeid
    if(obj == 1){
      if(app.globalData.wxState == 0){
        wx.showToast({
          title: '您已入驻商家,同一微信不能入驻两种类型',
          icon:'none',
          duration:2000
        })
        return
      }else{
        wx.navigateTo({
          url: '../applyBusiness/applyBusiness?typeid=' + obj
        })
      }
    }else if(obj == 2){
      if(app.globalData.wxState == 1){
        wx.showToast({
          title: '您已入驻工人,同一微信不能入驻两种类型',
          icon:'none',
          duration:2000
        })
        return
      }else{
        wx.navigateTo({
          url: '../applyBusiness/applyBusiness?typeid=' + obj
        })
      }
    }else{
      wx.navigateTo({
        url: '../applyBusiness/applyBusiness?typeid=' + obj
      })
    }
  },
  // 跳转到推荐有礼页面
  activity: function() {
    wx.navigateTo({
      url: '../activity/activity',
    })
  },
  // 跳转到更多需求页面
  need: function() {
    wx.switchTab({
      url: '../need/need',
    })
  },
  // 跳转到需求详情页面
  needsDetails: function(e) {
    var obj1 =e.currentTarget.dataset.vall;
    var xqxq = JSON.stringify(obj1);
    wx.navigateTo({
      url: '../needsDetails/needsDetails?obj1=' + xqxq,
    })
  },
  // 跳转到推荐工人更多页面
  services: function() {
    wx.switchTab({
      url: '../services/services',
    })

  },
  // 跳转到推荐商品更多页面
  goodList: function() {
    wx.navigateTo({
      url: '../goodsList/goodsList',
    })

  },
  // 跳转到工人详情页面
  workerDetails: function(e) {
    var obj =e.currentTarget.dataset.vals;
    obj = JSON.stringify(obj);
    wx.navigateTo({
      url: '../workerDetails/workerDetails?obj=' + obj,
    })
  },
  // 跳转到商家详情页面
  businessDetails: function(e) {
    var obj = e.currentTarget.dataset.vals
    obj = JSON.stringify(obj)
    wx.navigateTo({
      url: '../businessDetails/businessDetails?obj=' + obj,
    })
  },
  // 跳转到商品列表页面
  goodsList: function() {
    wx.navigateTo({
      url: '../goodsList/goodsList',
    })
  },
  // 推荐商品
  spneedlist() {
    var that = this
    var data={
      pages: 1,
      size: 10,
      backup1:1
    }
    qingqiu.get("tjsp", data, function(re) {
      if (re.success == true) {
        if (re.result.records != null) {
          that.goodsList = re.result.records
          //debugger
          for(let obj of re.result.records){
            obj.goodPic1 = that.data.viewUrl + obj.goodPic1.split(',')[0]
            obj.goodPic2  = that.data.viewUrl + obj.goodPic2.split(',')[0]
          }
          that.setData ({
            goodsList: re.result.records
          })

        } else {
          qingqiu.tk('未查询到任何数据')
        }
      } 
    })
  },
  // 一级区域
  QueryoneArea(){
    var that = this
    qingqiu.get("queryOneArea", null, function(re) {
    if (re.success == true) {
      if (re.result != null) {
        that.city=re.result
        that.setData({
          city:that.city
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
        that.area=re.result
        that.setData({
          area:that.area
        })
      }else {
        qingqiu.tk('未查询到任何数据')
      }
    } 
  })
  },
  //获取位置信息
  weizhi:function(){
    var that = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.showModal({
          title: '当前位置',
          content: "纬度:" + latitude + ",经度:" + longitude,
        })
        console.log(res)
      }
    })
  },
  //手动选择位置
  weizhi2(){},
  // 跳转到商品详情页面
  goodsDetails(e) {
    var obj =e.currentTarget.dataset.vals;
        var shopxq = JSON.stringify(obj);
        //debugger
        wx.navigateTo({
          url: '../goodsDetails/goodsDetails?obj=' + shopxq,
        })
      },
  //地址 显示弹窗样式
  showModal: function(e) {
    debugger
    this.setData({
      hasMask: true
    })
    var animation = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.opacity(0).rotateX(-100).step();
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function() {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)


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
  // 左侧按钮
  cityleft: function(e) {
    var that = this;
    // var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    that.setData({
      cityId: id,
      cityname1: name,
    })
    var data ={
      oneAreaId:id
    }
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
  },
  // 右侧单选点击
  arearight: function(e) {
    var that = this;
    if(that.data.cityname1=='')
    {
      wx.showToast({
        title: '请先选择城市',
        icon:'none',
        duration:2000
      })
      return
    }
    //var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    getApp().globalData.weizhi = this.data.cityname1+name
    that.setData({
      weizhi:app.globalData.weizhi,
      areaId: id,
      //curIndex: index,
      areaname: name,
      showModalStatus: false,
      cityname: this.data.cityname1
    })
  },
})