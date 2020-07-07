// pages/applyBusiness/applyBusiness.js
const app = getApp()

const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    viewUrl: api.viewUrl,
    bindImg: [],
    // 发布参数
    needsname: '',
    linkman: '',
    workcityname: '',
    workareaname: '',
    phone: '',
    needscontent: '',
    salary: '',
    // 用户信息
    wxUser: '',
    id: 0,
    select: 'circle',
    cityname: '',
    areaname: '',
    cityId: '',
    areaId: '',
    workcityname: '',
    workareaname: '',
    city: [],
    area: [],
    picIurl:'',
    picIurl1:''
  },

  // 获取一级区域
  getcity: function () {
    var that = this
    qingqiu.get("queryOneArea", null, function (res) {
      if (res.success == true) {
        for (let i = 0; i < res.result.length; i++) {
          that.getarea(res.result[i].id)
        }
        that.setData({
          city: res.result
        })
      }
    })
  },
  // 获取二级区域
  getarea: function (e) {
    var that = this
    var data = {
      oneAreaId: e
    }
    qingqiu.get("queryTwoArea", data, function (res) {
      if (res.success == true) {
        that.setData({
          area: res.result
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    this.getcity()
  },

  //获取输入的需求标题
  needsnameinput: function (e) {
    this.setData({
      needsname: e.detail.value
    })
  },
  needsnameblur: function (e) {
    var that = this
    qingqiu.messageReg(e.detail.value, 0, function (res) {
      if (res == 87014) {
        that.setData({
          needscontent: ''
        })
        wx.showToast({
          title: '内容包含敏感词，请重新输入...',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }, 'POST')
  },
  // 获取薪资的输入内容
  salaryinput: function (e) {
    this.setData({
      salary: e.detail.value
    })
  },
  //获取输入的需求内容
  needscontentinput: function (e) {
    this.setData({
      needscontent: e.detail.value
    })
  },
  needscontentblur: function (e) {
    var that = this
    qingqiu.messageReg(e.detail.value, 0, function (res) {
      console.log('回调函数', res)
      if (res == 87014) {
        that.setData({
          needscontent: ''
        })
        wx.showToast({
          title: '内容包含敏感词，请重新输入...',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }, 'POST')
  },

  //获取输入的联系人
  linkmaninput: function (e) {
    this.setData({
      linkman: e.detail.value
    })
  },
  //商家联系人敏感词
  linkmanblur: function (e) {
    var that = this
    qingqiu.messageReg(e.detail.value, 0, function (res) {
      console.log('回调函数', res)
      if (res == 87014) {
        that.setData({
          linkman: ''
        })
        wx.showToast({
          title: '内容包含敏感词，请重新输入...',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }, 'POST')
  },
  //获取输入的联系电话
  phoneinput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 右侧多选点击
  itemSelected: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = this.data.navRightItems[index];
    item.isSelected = !item.isSelected;
    this.setData({
      navRightItems: this.data.navRightItems,
    });
  },

  // 提交申请
  fabuzhaogong: function () {
    var that = this
    var s = qingqiu.yanzheng(that.data.needsname + ",请输入职位标题|" + that.data.salary + ",选择输入薪资|" + that.data.workcityname + ",请选择工作地|" + that.data.linkman + "请输入联系人|" + that.data.phone + ",输入联系电话|" + that.data.picIurl1 + ",未上传图片")
    if (s != 0) {
      wx.showToast({
        title: s,
        icon: 'none',
        duration: 2000
      })
      return
    }
    var data = {
      id: app.globalData.wxid,
      hireTitle:that.data.needsname,
      backup3:that.data.salary,
      oneAreaId:that.data.typeid,
      twoAreaId:that.data.areaId,
      publishMan:that.data.linkman,
      publishPhone:that.data.phone,
      hireContent:that.data.needscontent,
      backup4:that.data.picIurl1
    }
    qingqiu.get("localHireAdd", data, function (re) {
      console.log(re)
      if (re.success == true) {
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 3000
        })
        wx.redirectTo({
          url: '../recruitment/recruitment',
        })
      } else {
        wx.showToast({
          title: re.message,
          icon: 'none',
          duration: 2000
        })
      }
    }, 'post')
  },

  // 图片上传（对接完成）
  upimg: function (e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 指定只能为压缩图，首先进行一次默认压缩
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths;
        qingqiu.messageReg(tempFilePaths, 1, function(re) {
          var data = JSON.parse(re.data)
          if (data.errcode == 87014) {
            wx.showToast({
              title: '内容含有违法违规内容',
              icon: 'none'
            })
            return
          } else if (data.errcode != 0) {
            wx.showToast({
              title: '令牌失效，请重新进入小程序',
              icon: 'none'
            })
            return
          } else {
            wx.uploadFile({
              url: api.uploadurl,
              filePath: tempFilePaths[0],
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
                var sj = that.data.viewUrl + jj.message
                console.log(res)
                that.setData({
                  picIurl: sj,
                  picIurl1: jj.message
                })
              }
            })
          }
        })
      },
    })
  },
  //地址 显示弹窗样式
  showModal: function (e) {
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
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)


  },
  //隐藏弹窗样式 地址
  hideModal: function () {
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
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  // 左侧按钮
  cityleft: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    that.setData({
      show: true,
      typeid: id,
      curIndex: index,
      workcityname1: name,
    })
  },
  // 右侧单选点击
  arearight: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    if (that.data.workcityname1 == undefined) {
      wx.showToast({
        title: '请先选择城市',
        icon: 'none',
        duration: 2000
      })
      return
    }
    that.setData({
      show: false,
      showModalStatus: false,
      areaId: id,
      curIndex: index,
      workareaname: name,
      workcityname: that.data.workcityname1
    })
  },
  // 服务规则页面显示
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
  //服务规则页面关闭
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

})