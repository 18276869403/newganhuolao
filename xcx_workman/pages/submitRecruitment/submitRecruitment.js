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
  tijiaoshenqing: function () {
    var that = this
    var data = {}
    if (that.data.select != 'success') {
      wx.showToast({
        title: '未勾选注册协议',
        icon: 'none',
        duration: 2000
      })
      return
    }
    if (that.data.needsTypeid == 1) {
      var s = qingqiu.yanzheng(that.data.areaId + ",选择区域|" + that.data.fenleitype1.yjid + ",选择商家分类|" + that.data.needsname + ",输入商铺名称|" + that.data.linkman + "输入联系人|" + that.data.phone + ",输入联系电话|" + that.data.picIurl1 + ",上传门头照")
      if (s != 0) {
        wx.showToast({
          title: s,
          icon: 'none',
          duration: 2000
        })
        return
      }
      data = {
        id: app.globalData.wxid,
        oneClassName: that.data.fenleitype1.yjid + "," + that.data.fenleitype2.yjid,
        twoClassName: that.data.fenleitype1.erjiid + "," + that.data.fenleitype2.erjiid,
        oneAreaId: that.data.typeid,
        twoAreaId: that.data.areaId,
        shopName: that.data.needsname,
        name: that.data.linkman,
        phone: that.data.phone,
        shopAddress: that.data.workeraddress,
        content: that.data.needscontent,
        picIurl: that.data.picIurl1,
        picZz: that.data.picZz1,
        wxState: 0,
      }
    }
    qingqiu.get("wxUserAdd", data, function (re) {
      console.log(re)
      if (re.success == true) {
        wx.showToast({
          title: '申请成功,等待后台审核...',
          icon: 'success',
          duration: 3000
        })
        setTimeout(function () {
          wx.login({
            success: function (res) {
              qingqiu.get("getKeyInfo", {
                code: res.code
              }, function (re) {
                app.globalData.wxid = re.result.wxUser.id
                app.globalData.openid = re.result.openId
                app.globalData.wxState = re.result.wxUser.wxState
                wx.switchTab({
                  url: '../mine/mine',
                })
              }, "POST")
            }
          })
        }, 1000)
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
    var type = e.currentTarget.dataset.type
    var index = e.currentTarget.dataset.number
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 指定只能为压缩图，首先进行一次默认压缩
      sourceType: ['album', 'camera'],
      success: function (res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths;
        qingqiu.messageReg(tempFilePaths, 1, function (res) {
          var data = JSON.parse(res.data)
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
                // res.data.data = ""
                if (type == '1') {
                  that.setData({
                    picIurl: sj,
                    picIurl1: jj.message
                  })
                } else if (type == '2') {
                  that.setData({
                    picZz: sj,
                    picZz1: jj.message
                  })
                } else if (type == '3') {
                  that.setData({
                    picPerson1: sj,
                    picPerson3: jj.message
                  })
                } else if (type == '4') {
                  that.setData({
                    picPerson2: sj,
                    picPerson4: jj.message
                  })
                } else if (type == '5') {
                  that.setData({
                    picIurl: sj,
                    picIurl1: jj.message
                  })
                }
              }
            })
          }
        })
      },
    })
  },
  cityyiji: function () {
    var that = this
    qingqiu.get("queryOneArea", {}, function (re) {
      if (re.data.result.length > 0) {
        that.setData({
          typeid: re.result[0].id,
          workcityname1: re.result[0].areaName
        })
      }
      that.setData({
        city: re.data.result
      })
      that.cityerji()
    })
  },
  cityerji: function () {
    var that = this
    var data = {
      oneAreaId: that.data.typeid
    }
    qingqiu.get("queryTwoArea", data, function (re) {
      that.setData({
        area: re.result
      })
    })
  },
  // 左侧按钮
  left: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    that.setData({
      show: true,
      typeyj: id,
      typeid: index,
      yijiname1: name,
      erjiName: []
    })
    this.typefenleiej()
  },
  // 右侧单选点击
  right: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    that.setData({
      show: false,
      secondId: id,
      curIndex: index,
      erjiworkname: name,
      yijiname: that.data.yijiname1
    })
  },

  // 获取分类
  typefenleiyj: function () {
    var that = this
    var type = that.data.needsTypeid
    var data = {
      type: type
    }
    qingqiu.get("oneClassList", data, function (re) {
      if (re.success == true) {
        if (re.result != null) {
          for (let i = 0; i < re.result.length; i++) {
            var gongzhongclass = 'gongzhong[' + i + '].oneclass'
            var gongzhongid = 'gongzhong[' + i + '].id'
            that.setData({
              [gongzhongid]: re.result[i].id,
              [gongzhongclass]: re.result[i].className
            })
            var onedata = {
              oneClassId: re.result[i].id
            }
            qingqiu.get("twoClassList", onedata, function (re) {
              if (re.success == true) {
                if (re.result != null) {
                  var gongzhongclass2 = 'gongzhong[' + i + '].twoclasslist'
                  that.setData({
                    [gongzhongclass2]: re.result
                  })
                }
              }
            })
          }
        }
      }
    })
  },
  typefenleiej: function () {
    var data = {
      oneClassId: this.data.typeyj
    }
    var that = this
    qingqiu.get("twoClassService", data, function (re) {
      that.setData({
        typeejlist: re.data.result
      })
    })
  },
  //显示弹窗样式
  showModal6: function (e) {
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
      showModalStatus6: true
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)

  },
  //隐藏弹窗样式
  hideModal6: function () {
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
        showModalStatus6: false
      })
      var erjiId = ''
      var erjiName = ""
      for (var i = 0; i < that.data.navRightItems.length; i++) {
        if (that.data.navRightItems[i].isSelected == true) {
          if (erjiId != '') {
            erjiId = erjiId + ',' + that.data.navRightItems[i].id
            erjiName = erjiName + ',' + that.data.navRightItems[i].name
          } else {
            erjiId = that.data.navRightItems[i].id
            erjiName = that.data.navRightItems[i].name
          }
          that.setData({
            erjiName: erjiName,
            erjiId: erjiId,
          })
        }
      }
      that.setData({
        itemList: [],
        cost: ''
      })
    }.bind(this), 200)
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
    this.cityerji()
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

  // // 选择业务弹出
  // showTypeModal2: function() {
  //   this.setData({
  //     hasMask: true
  //   })
  //   var animation = wx.createAnimation({
  //     duration: 300,
  //     timingFunction: "linear",
  //     delay: 0
  //   })
  //   this.animation = animation

  //   animation.opacity(0).rotateX(-100).step();
  //   this.setData({
  //     animationData: animation.export(),
  //     showTypeModalStatus2: true
  //   })
  //   setTimeout(function() {
  //     animation.opacity(1).rotateX(0).step();
  //     this.setData({
  //       animationData: animation.export()
  //     })
  //   }.bind(this), 200)
  // },
  // //选择业务页面关闭
  // hideTypeModal2: function() {
  //   var animation = wx.createAnimation({
  //     duration: 200,
  //     timingFunction: "linear",
  //     delay: 0
  //   })
  //   // flag = 0;
  //   this.animation = animation
  //   animation.translateY(300).step()
  //   this.setData({
  //     animationData: animation.export(),
  //     hasMask: false
  //   })
  //   setTimeout(function() {
  //     animation.translateY(0).step()
  //     this.setData({
  //       animationData: animation.export(),
  //       showTypeModalStatus2: false
  //     })
  //   }.bind(this), 200)
  // },
  // // 改变二级分类
  // changeTypetwoclass: function (e) {
  //   var that = this;
  //   var id = e.currentTarget.dataset.id
  //   that.setData({
  //     twoclassid: id,
  //   })
  // },

  // 选择工种弹出
  showModal2: function () {
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
      animationData3: animation.export(),
      showModalStatus2: true,
      showModalStatus6: true
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData3: animation.export()
      })
    }.bind(this), 200)
  },
  //选择工种页面关闭
  hideModal2: function (e) {
    var flag = e.currentTarget.dataset.return
    this.writeclass(flag)
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
        showModalStatus2: false,
        showModalStatus6: false
      })
    }.bind(this), 200)
  },

  // 业务分类
  showModallist: function () {
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
      showModalStatuslist: true,
      showModalStatus6: true
    })
    setTimeout(function () {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //选择业务页面关闭
  hideModallist: function (e) {
    var flag = e.currentTarget.dataset.return
    this.writeclass(flag)
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    // flag = 0;
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData2: animation.export(),
      hasMask: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData2: animation.export(),
        showModalStatuslist: false,
        showModalStatus6: false
      })
    }.bind(this), 200)
  },
  // 改变二级分类
  changetwoclass: function (e) {
    var that = this;
    var typeid = "fenleitype1.yjid"
    var typeerji = "fenleitype1.erjiid"
    var typestate = "fenleitype1.typestate"
    var typeid1 = "fenleitype2.yjid"
    var typeerji1 = "fenleitype2.erjiid"
    var typestate1 = "fenleitype2.typestate"
    if (that.data.needsTypeid == 1) {
      var id = e.currentTarget.dataset.id
      var yjid = e.currentTarget.dataset.yjid
      var yijiname = e.currentTarget.dataset.yijiname
      var erjiname = e.currentTarget.dataset.erjiname
      if (that.data.fenleitype1.typestate == true && that.data.fenleitype1.erjiid == id && that.data.fenleitype1.yjid == yjid) {
        that.setData({
          [typeid]: '',
          [typeerji]: '',
          [typestate]: false,
          fenClass1: ''
        })
        return
      } else if (that.data.fenleitype2.typestate == true && that.data.fenleitype2.erjiid == id && that.data.fenleitype2.yjid == yjid) {
        that.setData({
          [typeid1]: '',
          [typeerji1]: '',
          [typestate1]: false,
          fenClass2: ''
        })
        return
      }
      if (that.data.fenleitype1.typestate == false) {
        that.setData({
          [typeid]: yjid,
          [typeerji]: id,
          [typestate]: true,
          yijiname: yijiname,
          fenClass1: yijiname + ' | ' + erjiname
        })
      } else if (that.data.fenleitype2.typestate == false) {
        that.setData({
          [typeid1]: yjid,
          [typeerji1]: id,
          [typestate1]: true,
          yijiname: yijiname,
          fenClass2: yijiname + ' | ' + erjiname
        })
      } else {
        wx.showToast({
          title: '只能同时选择两种',
          icon: 'none',
          duration: 2000
        })
        return
      }
    } else {
      var id = e.currentTarget.dataset.id
      var yjid = e.currentTarget.dataset.yjid
      var yijiname = e.currentTarget.dataset.yijiname
      var erjiname = e.currentTarget.dataset.erjiname
      if (that.data.fenleitype1.typestate == true && that.data.fenleitype1.erjiid == id && that.data.fenleitype1.yjid == yjid) {
        that.setData({
          [typeid]: '',
          [typeerji]: '',
          [typestate]: false,
          fenClass1: ''
        })
        return
      } else if (that.data.fenleitype2.typestate == true && that.data.fenleitype2.erjiid == id && that.data.fenleitype2.yjid == yjid) {
        that.setData({
          [typeid1]: '',
          [typeerji1]: '',
          [typestate1]: false,
          fenClass2: ''
        })
        return
      }
      if (that.data.fenleitype1.typestate == false) {
        that.setData({
          [typeid]: yjid,
          [typeerji]: id,
          [typestate]: true,
          yijiname: yijiname,
          fenClass1: yijiname + ' | ' + erjiname
        })
      } else if (that.data.fenleitype2.typestate == false) {
        that.setData({
          [typeid1]: yjid,
          [typeerji1]: id,
          [typestate1]: true,
          yijiname: yijiname,
          fenClass2: yijiname + ' | ' + erjiname
        })
      } else {
        wx.showToast({
          title: '只能同时选择两种',
          icon: 'none',
          duration: 2000
        })
        return
      }
    }
  },
  writeclass: function (type) {
    if (type == "false") {
      this.setData({
        yijiname: ''
      })
    } else {
      if (this.data.fenClass2 != '') {
        this.setData({
          tempClass: this.data.fenClass1 + "," + this.data.fenClass2
        })
      } else {
        this.setData({
          tempClass: this.data.fenClass1
        })
      }
    }
  },
})