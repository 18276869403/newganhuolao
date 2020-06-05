
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
    sousuonr:''
  },
  onPullDownRefresh: function () {
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onLoad: function (options) {
    if(options.id!=null||options.id!=""||options.id!=undefined){
    }
    this.SelectshowList()
  },
  getShowList(){
    var that = this
    var data = {
      wxUserId:app.globalData.wxid
    }
    qingqiu.get("casePage",data,function(re){
      console.log(re)
      if(re.success==true){
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
  // 获取晒晒
  SelectshowList() {
    var that = this
    var data={
      pages: 1,
      size: 10,
      caseName:that.data.sousuonr
    }
    qingqiu.get("CasePage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          that.showList=re.result.records
          for(var i= 0 ; i < that.showList.length; i++){
            that.showList[i].picOne = api.viewUrl+re.result.records[i].picOne.split(',')[0]
            that.data.imgList[i] = that.showList[i].picOne
          } 
          that.setData({
            showList:re.result.records
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
    wx.navigateTo({
      url: '../showDetails/showDetails?obj='+ssid,
    })
  },
  // 发布晒晒页面
  submitShow: function() {
    wx.navigateTo({
      url: '../submitShow/submitShow',
    })
  }
})