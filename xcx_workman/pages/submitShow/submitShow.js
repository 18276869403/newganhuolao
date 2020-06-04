// pages/submitShow/submitShow.js
const app = getApp()
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl:api.viewUrl,
    needscontent: '',
    cityname: '',
    areaname: '',
    cityId: '',
    areaId: '',
    ceshi: [{
        id: 1,
        areaName: '万载'
      },
      {
        id: 2,
        areaName: '万载111'
      }
    ],
    city:[],
    // area: [{
    //     id: 1,
    //     areaName: '双桥镇'
    //   },
    //   {
    //     id: 2,
    //     areaName: '双桥镇11'
    //   }
    // ],
    area:[],
    // showImg: [{
    //     id: 1,
    //     showimg: '../image/tu.png'
    //   },
    //   {
    //     id: 2,
    //     showimg: '../image/tu.png'
    //   },
    //   {
    //     id: 3,
    //     showimg: '../image/tu.png'
    //   }
    // ],
    tupian: '',
    id:'',
    tupianlist: [],
    imgUrl: '',
    cityname1: '',
    picIurl1:'',
    picIurl:'',
    picimg:'',
    picimg1:'',
    picimg2:'',
    picimg3:'',
    picimg4:'',
    picimg5:'',
    picimgs1:'',
    picimgs2:'',
    picimgs3:'',
    picimgs4:'',
    picimgs5:'',
    picimg6:'',
    picimgs6:'',
    num:1,
    addresslist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      wxuserid: app.globalData.wxid
    })
    this.QueryoneArea()
    this.QuerytwoArea()
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

  onShow: function() {

  },
  lijifabu: function() {

  },
  fanhui: function() {
    wx.switchTab({
      url: '../showwork/showwork',
    })
  },
  // // 发布晒晒
  // lijifabu(){
  //   var that =this
  //   var data={
  //     wxUserId : 257,
  //     backup3:0,
  //     caseName : that.data.needscontent,
  //     picOne:that.data.picIurl1
  //   }
  //   qingqiu.get("insertCase", data, function(re) {
  //   console.log(re)
  //   if (re.success == true) {
  //         wx.switchTab({
  //           url: '../showwork/showwork',
  //         })
  //   } 
  // },'post')
  // },
  // 发布晒晒
  lijifabu(){
    var that =this
    if(that.data.needscontent==""){
      wx.showToast({
        title: '晒晒详情不能为空！',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.cityId==""||that.data.areaId==""){
      wx.showToast({
        title: '请选择所在区域！',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.picimgs5==""){
      if(that.data.picimgs4==""){
        if(that.data.picimgs3==""){
          if(that.data.picimgs2==""){
            if(that.data.picimgs1==""){
              wx.showToast({
                title: '请上传图片！',
                icon:'none',
                duration:2000
              })
              return
            }else{
              var tupians = that.data.picimgs1
            }
          }else{
            var tupians = that.data.picimgs1+','+that.data.picimgs2
          }
        }else{
          var tupians = that.data.picimgs1+','+that.data.picimgs2+','+
          that.data.picimgs3
        }
      }else{
        var tupians = that.data.picimgs1+','+that.data.picimgs2+','+
        that.data.picimgs3+','+that.data.picimgs4
      }
    }else{
      var tupians = that.data.picimgs1+','+that.data.picimgs2+','+
      that.data.picimgs3+','+that.data.picimgs4+','+that.data.picimgs5
    }
    var data={
      wxUserId : that.data.wxuserid,
      backup3:0,
      backup4:0,
      oneAreaId:that.data.cityId,
      twoAreaId:that.data.areaId,
      caseName : that.data.needscontent,
      picOne:tupians
    }
    qingqiu.get("insertCase", data, function(re) {
    if (re.success == true) {
      wx.showToast({
        title: '发布成功！',
        icon:'success',
        duration:2000
      })
          wx.switchTab({
            url: '../showwork/showwork',
          })
    } 
  },'post')
  },
  //获取输入的晒活内容
  commentinput: function(e) {
    this.setData({
      needscontent: e.detail.value
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
    //var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    that.setData({
      areaId: id,
      //curIndex: index,
      areaname: name,
      showModalStatus: false,
      cityname: this.data.cityname1
    })
  },
  // 图片上传（对接完成）
  upimg: function(e) {
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.number
    var that = this
    let uploadFile = ''; //最后处理完，图片上传的图片地址
    wx.chooseImage({
      sizeType: ['compressed'], // 指定只能为压缩图，首先进行一次默认压缩
      sourceType: ['album', 'camera'],
      success:function(res) {
       const tempFilePaths = res.tempFilePaths;
       //获得原始图片大小
       wx.getImageInfo({
         src: res.tempFilePaths[0],
         success(res) {
           // console.log('获得原始图片大小',res.width)
           //console.log(res.height)
           var originWidth, originHeight;
           originHeight = res.height;
           originWidth = res.width;
           //压缩比例
           // 最大尺寸限制
           var maxWidth = 1200,
             maxHeight = 600;
           // 目标尺寸
           var targetWidth = originWidth,
             targetHeight = originHeight;
           //等比例压缩，如果宽度大于高度，则宽度优先，否则高度优先
           if (originWidth > maxWidth || originHeight > maxHeight) {
             if (originWidth / originHeight > maxWidth / maxHeight) {
               // 要求宽度*(原生图片比例)=新图片尺寸
               targetWidth = maxWidth;
               targetHeight = Math.round(maxWidth * (originHeight / originWidth));
             } else {
               targetHeight = maxHeight;
               targetWidth = Math.round(maxHeight * (originWidth / originHeight));
             }
           }
           //尝试压缩文件，创建 canvas
           var ctx = wx.createCanvasContext('firstCanvas');
           ctx.clearRect(0, 0, targetWidth, targetHeight);
           ctx.drawImage(tempFilePaths[0], 0, 0, targetWidth, targetHeight);
           ctx.draw();
           //更新canvas大小
           that.setData({
             cw: targetWidth,
             ch: targetHeight
           });
           //保存图片
           setTimeout(function() {
             wx.canvasToTempFilePath({
               canvasId: 'firstCanvas',
               success: (res) => {
                 //写入图片数组
                 var uploadpic = "uploadPic[" + index + "]";
                 //
                 that.setData({
                   [uploadpic]: res.tempFilePath
                 });
                 uploadFile = res.tempFilePath;
                 that.data.num +=1;
                 that.setData({
                  num: that.data.num 
                 });
                 wx.uploadFile({
                   url: api.uploadurl2 + "/" + targetWidth + "/" + targetHeight, //仅为示例，非真实的接口地址
                   filePath: uploadFile,
                   header: {
                    "Content-Type": "multipart/form-data"
                    },
                    formData: {
                      method: 'POST' //请求方式
                    },
                    name: 'file',
                    success(res) {
                      var r = res.data
                      var jj = JSON.parse(r);
                      var sj = api.viewUrl + jj.message
                      console.log(res)
                      if (type == '1') {
                        that.setData({
                          picimg1: sj,
                          picimgs1:jj.message
                        })
                      } else if (type == '2') {
                        that.setData({
                          picimg2: sj,
                          picimgs2:jj.message
                        })
                      } else if (type == '3') {
                        that.setData({
                          picimg3: sj,
                          picimgs3:jj.message
                        })
                      } else if (type == '4') {
                        that.setData({
                          picimg4: sj,
                          picimgs4:jj.message
                        })
                      } else if (type == '5') {
                        that.setData({
                          picimg5: sj,
                          picimgs5:jj.message
                        })
                      } else if (type == '6') {
                        that.setData({
                          picimg6: sj,
                          picimgs6:jj.message
                        })
                      }
                    }
                 })
               },
               fail: (err) => {
                //  console.error(err)
               }
             }, this)
           }, 500);
          }
        })
      }
    })
  },

})