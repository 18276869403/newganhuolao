
//获取应用实例
const app = getApp()

const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')

Page({
  data: {
    viewUrl:api.viewUrl,
    // showList: [{
    //   id: 1,
    //   pinglun: '120000',
    //   liulan: '1200000',
    //   url:'../image/top.png'
    // },
    // {
    //   id: 2,
    //   pinglun: '12',
    //   liulan: '12',
    //   url: '../image/chuang.png'
    // },
    // {
    //   id: 3,
    //   pinglun: '12',
    //   liulan: '12',
    //   url: '../image/chuang.png'
    // },
    //   {
    //     id: 4,
    //     pinglun: '12',
    //     liulan: '12',
    //     url: '../image/top.png'
    //   },
    // ],
    showList:[],
    // imgList: [
    //   "http://192.168.1.254:3000/work-boot/sys/common/view/191590400845_.pic_hd.jpg",
    //   "http://192.168.1.254:3000/work-boot/sys/common/view/191590400845_.pic_hd.jpg",
    //   "http://192.168.1.254:3000/work-boot/sys/common/view/191590400845_.pic_hd.jpg"
    // ],
    imgList:[],
    sousuotext:'',
    id:1,
    sousuonr:'',
    pageNo:1
  },
  onPullDownRefresh: function () {
    app.globalData.showid = 1
    this.data.pageNo=1
    this.data.isLastPage=false
    this.data.showList.splice(0,this.data.showList.length)
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onShow(){
    this.setData({
      weizhi:app.globalData.weizhi
    })
  },
  onLoad: function (options) {
    this.QueryoneArea()
    this.QuerytwoArea()
    if(app.globalData.showid == 0){
      this.getShowList()
    }else{
      this.SelectshowList()
    }
  }, 
  getShowList(){
    var that = this
    var data = {
      wxUserId:app.globalData.wxid
    }
    qingqiu.get("casePage",data,function(re){
      if(re.success==true){
        that.data.showList=re.result.records
        for(var i= 0 ; i < that.data.showList.length; i++){
          that.data.showList[i].picOne = api.viewUrl+re.result.records[i].picOne.split(',')[0]
        } 
        that.setData({
          showList:re.result.records
        })
      }else{
        wx.showToast({
          title: re.message,
          icon:'none',
          duration:2000
        })
      }
      
    })
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
    this.SelectshowList()
  },
  // 获取晒晒 
  SelectshowList() {
    var that = this
    var data={
      pageNo: that.data.pageNo,
      size: 10,
      isLastPage: false,
      tips: '上拉加载更多',
      caseName:that.data.sousuonr
    }
    qingqiu.get("CasePage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          if(re.result.records==''){
            that.data.isLastPage=true
            return
          }
          that.showList=re.result.records
          for(var i= 0 ; i < that.showList.length; i++){
            that.showList[i].picOne = api.viewUrl+re.result.records[i].picOne.split(',')[0]
            that.data.imgList[i] = that.showList[i].picOne
            that.data.showList.push(re.result.records[i])
          } 
          console.log(that.data.showList)
          that.setData({
            showList:that.data.showList
          })
        } 
      } 
    })
  },
  // // 晒晒点击事件
  // imgYu:function(event){
  //   var src = event.currentTarget.dataset.src;
  //   wx.previewImage({
  //     current: src,
  //     urls: this.data.imgList
  //   })
  // },
  // 发布弹窗显示
  showModal1: function () {
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
      showModalStatus1: true
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //发布弹窗关闭
  hideModal1: function () {
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    // flag = 0;
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      hasMask: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus1: false
      })
    }.bind(this), 200)
  },
  // 搜索框
   shurukuang:function(e){
    this.setData({
      sousuotext:e.detail.value
    })
  },
  // 搜索
  btnsearch:function(){
    var that=this
    that.data.sousuonr=that.data.sousuotext
    that.SelectshowList()
  },
  // 跳转到晒晒详情页面
   showDetails: function(e) {
    var ssid =e.currentTarget.dataset.ssid;
    qingqiu.get("updateWxCase",{id:ssid},function(re){
      if(re.success == true){
        wx.navigateTo({
          url: '../showDetails/showDetails?obj='+ssid,
        })
      }else{
        wx.showToast({
          title: re.message,
          icon:'none',
          duration:2000
        })
      }
    },'put')
    
  },
  // 发布晒晒页面
  submitShow: function() {
    wx.navigateTo({
      url: '../submitShow/submitShow',
    })
  },
  // 发布视频
  submitVideo:function(){
    var that = this
    // wx.chooseImage({
    //   sourceType: ['album', 'camera'],
    //   success:function(res){
    //     console.log(res)
    //     var tempFilePath = res.tempFilePaths[0].replace('http://','')
    //     console.log(tempFilePath)
    //     wx.uploadFile({
    //       url: api.uploadurl,
    //       filePath: tempFilePath,
    //       header: {
    //         "Content-Type": "multipart/form-data"
    //       },
    //       formData: {
    //         method: 'POST' //请求方式
    //       },
    //       name: 'files',
    //       success:function(res){
    //         console.log(res)
    //       }
    //     })
    //   }
    // })
    wx.chooseVideo({
      camera: ['album','camera'],
      maxDuration:60,
      success:function(res){
        console.log(res)
        var tempFilePath = res.tempFilePath
        console.log(tempFilePath)
        wx.uploadFile({
          url: api.uploadurl,
          filePath: tempFilePath,
          header: {
            "Content-Type": "multipart/form-data"
          },
          formData: {
            method: 'POST' //请求方式
          },
          name: 'file',
          success:function(res){
            console.log(res)
            var re = JSON.parse(res.data)
            if(re.success == true){
              var data = {
                wxUserId:app.globalData.wxid,
                backup3:1,
                backup4:0,
                picOne:re.message
              }
              qingqiu.get('insertCase',data,function(res){
                if(res.success == true){
                  wx.showToast({
                    title: '发布成功,视频正在审核中...',
                    icon:'success',
                    duration:2000
                  })
                  setTimeout(function(){
                    that.hideModal1()
                    that.onLoad()
                  },1000)
                }else{
                  wx.showToast({
                    title: res.message,
                    icon:'none',
                    duration:2000
                  })
                }
              },'post')
            }else{
              wx.showToast({
                title: res.message,
                icon:'none',
                duration:2000
              })
            }
          }
        })
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
  //地址 显示弹窗样式
  showModal: function(e) {
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
    if(that.data.cityname1==undefined)
    {
      wx.showToast({
        title: '请先选择城市',
        icon:'none',
        duration:2000
      })
      return
    }
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