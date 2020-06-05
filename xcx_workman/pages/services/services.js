//获取应用实例
const app = getApp()

const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')
const util = require('../../utils/util.js')

Page({
  data: {
    viewUrl: api.viewUrl,
    chooseworker: 1,
    needsList: [],
    goodsdata3: [],
    workerlist: [],
    workerlist1:[],
    businesslist1:[],
    businesslist: [],
    oneclass:[],
    twoclass:[],
    firstId:'',
    navRightItems:[],
    firstname:'',
    secondId:'',
    secondname:'',
    oneclassid:'',
    twoclassid:'',
    fenClass1:'请选择业务分类',
    fenClass2:'',
    tempClass:'',
    gongzhong: [{
      id: 1,
      oneclass: '',
      twoclasslist:[{
        id:1,
        twoclass:'erji'
      },
      {
        id:2,
        twoclass:'erji111'
      }]
    }],
    flerjiid:'',
    yijiid:'',
    yijiname:'',
    erjiid:'',
    erjiname:'',
    fenleilx:1
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  // 搜索框
  shurukuang:function(e){
    this.setData({
      sousuotext:e.detail.value
    })
  },
  // 搜索按钮
  btnsearch:function(){
    var data = { pages: 1,size: 10, wxState:this.data.chooseworker }
    if(this.data.yijiid != "" && this.data.yijiid != "undefined" && this.data.yijiid != null){
      data.oneClassId = this.data.yijiid
    }
    if(this.data.flerjiid != "" && this.data.flerjiid != "undefined" && this.data.flerjiid != null){
      data.twoClassId = this.data.flerjiid
    }
    if(this.data.chooseworker == 1){
      if(this.data.sousuotext != "" && this.data.sousuotext != "undefined" && this.data.sousuotext != null){
        data.name = this.data.sousuotext
      }
      this.grneedlist(data)
    }else{
      if(this.data.sousuotext != "" && this.data.sousuotext != "undefined" && this.data.sousuotext != null){
        data.shopName = this.data.sousuotext
      }
      this.sjneedlist(data)
    }
  },
  onLoad: function() {
    this.grneedlist({pages:1,size:10,wxState:this.data.chooseworker})
  },
  changeType: function(e) {
    var that = this
    if (that.data.chooseworker == 0) {
      that.setData({
        chooseworker: 1
      })
      that.data.fenleilx=1
      that.grneedlist({pages:1,size:10,wxState:that.data.chooseworker})
    } else {
      that.setData({
        chooseworker: 0
      }) 
      that.data.fenleilx=2
      that.sjneedlist({pages:1,size:10,wxState:that.data.chooseworker})
    }
  },
  // 一级分类
  // oneClass(){
  //   var that =this
  //   var data={
  //     type:that.data.fenleilx
  //   }
  //   qingqiu.get("oneClassList", data, function(re) {
  //   if (re.success == true) {
  //     if (re.result != null) {
  //       that.oneclass = re.result
  //       that.setData ({
  //         oneclass : that.oneclass
  //       })
  //       console.log(that.oneclass)
  //     } else {
  //       qingqiu.tk('未查询到任何数据')
  //     }
  //   } 
  // })
  // },
  // 二级分类
  // twoClass(){
  //   var that =this
  //   var data={
  //     oneClassId:2
  //   }
  //   qingqiu.get("twoClassList", data, function(re) {
  //   if (re.success == true) {
  //     if (re.result != null) {
  //       that.twoclass = re.result
  //       that.setData ({
  //         twoclass : that.twoclass
  //       })
  //       console.log(that.twoclass)
  //     } else {
  //       qingqiu.tk('未查询到任何数据')
  //     }
  //   } 
  // })
  // },
  // 左侧按钮
  // left: function (e) {
  //   var that = this;
  //   var id = e.currentTarget.dataset.id
  //   var name = e.currentTarget.dataset.name
  //   that.setData({
  //     firstId: id,
  //     firstname: name
  //   })
  //   var data={
  //     oneClassId:that.data.firstId
  //   }
  //   qingqiu.get("twoClassList", data, function(re) {
  //   if (re.success == true) {
  //     if (re.result != null) {
  //       that.twoclass = re.result
  //       that.setData ({
  //         twoclass : that.twoclass
  //       })
  //     } else {}
  //   } 
  // })
  // },
  // 右侧单选点击
  right: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    that.setData({
      secondId: id,
      secondname: name,
      yijiname: this.data.yijiname1,
      showModalStatus: false,
    })
  },
  // 全部
  quanbu:function(){
    var that = this
    that.data.firstId=''
    that.data.secondId=''
    that.data.firstname=''
    that.setData({
      showModalStatus: false,
      firstname:that.data.firstname
    })
  },
  // 跳转到商家详情页面
  businessDetails: function (e) {
    var obj = JSON.stringify(e.currentTarget.dataset.vals)
    wx.navigateTo({
      url: '../businessDetails/businessDetails?obj=' + obj,
    })
  },
  // 推荐工人
  grneedlist(data) {
    var that = this
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
          that.setData({
            workerlist:re.result.records,
            workerlist1:re.result.records
          })
        } 
      } 
    })
  },

  // 推荐商家
  sjneedlist(data) {
    var that = this
    qingqiu.get("wxUserPage", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          for(let obj of re.result.records){
            obj.picIurl = that.data.viewUrl + obj.picIurl
            obj.oneClassName = obj.oneClassName.replace(/,/, "|")
            obj.twoClassName = obj.twoClassName.replace(/,/, "|")
          }
          that.setData({
            businesslist:re.result.records,
            businesslist1:re.result.records
          })
        } 
      } 
    })
  },
  // 跳转到工人详情页面
  workerDetails: function (e) {
    var obj = JSON.stringify(e.currentTarget.dataset.vals)
    wx.navigateTo({
      url: '../workerDetails/workerDetails?obj=' + obj,
    })
  },
  //显示弹窗样式
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
        showModalStatus: false
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
  // 业务分类
  showModallist: function() {
    this.fenlei()
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
      showModalStatus6:true
    })
    setTimeout(function() {
      animation.opacity(1).rotateX(0).step();
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //选择业务页面关闭
  hideModallist: function(e) {
    var that=this
    var flag = e.currentTarget.dataset.return
    if(flag=="ture"){
      that.setData({
        yijiid: that.data.yijiid,
        flerjiid:that.data.flerjiid,
        yijiname : that.data.yijiname,
        erjiname : that.data.erjiname,
      })
      that.btnsearch()
    }else{
      that.setData({
        yijiname : '',
        erjiname : '',
        yijiid:'',
        flerjiid:''
      })
      that.btnsearch()
    }
    //this.writeclass(flag)
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
    setTimeout(function() {
      animation.translateY(0).step()
      this.setData({
        animationData2: animation.export(),
        showModalStatuslist: false,
        showModalStatus6:false
      })
    }.bind(this), 200)
  },
  // 获取分类
  typefenleiyj: function() {
    var that = this
    var data = {
      type:that.data.fenleilx
    }
    qingqiu.get("oneClassList", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          for(let i=0;i<re.result.length;i++){
            var gongzhongclass = 'gongzhong[' + i +'].oneclass'
            var gongzhongid = 'gongzhong[' + i + '].id'
            that.setData({
              [gongzhongid]:re.result[i].id,
              [gongzhongclass]:re.result[i].className
            })
            console.log(re.result[i].className)
            var onedata = { oneClassId:re.result[i].id }
            qingqiu.get("twoClassList",onedata,function(re){
              if (re.success == true){
                if (re.result != null) {
                  var gongzhongclass2 = 'gongzhong[' + i +'].twoclasslist'
                  that.setData({
                    [gongzhongclass2]:re.result
                  })
                }
              }
            })
          }
        } 
      } 
    })
  },
  typefenleiej: function() {
    var data = {
      oneClassId: this.data.typeyj
    }
    var that = this
    qingqiu.get("twoClassService", data, function(re) {
      that.setData({
        typeejlist: re.data.result
      })
    })
  },
  // 选项卡点击事件获取分类
  fenlei: function(e) {
    var that = this;
    var id = 1
    var litype = 0
    if (id == 1) {
      litype = 2;
    } else {
      litype = 1;
    }
    var typeid = "fenleitype1.yjid"
    var typeerji = "fenleitype1.erjiid"
    var typestate = "fenleitype1.typestate"
    var typeid1 = "fenleitype2.yjid"
    var typeerji1 = "fenleitype2.erjiid"
    var typestate1 = "fenleitype2.typestate"
    that.setData({
      [typeid]:'',
      [typeerji]:'',
      [typestate]:false,
      [typeid1]:'',
      [typeerji1]:'',
      [typestate1]:false,
      fenClass1:'',
      fenClass2:'',
      needsTypeid: id,
      litype: litype,
      yijiname: '',
      secondId: 0,
      erjiworkname: '',
      typeyj: 0
    })
    this.typefenleiyj()
  },
  // 改变二级分类
  changetwoclass: function (e) {
    var that=this
    that.data.flerjiid = e.currentTarget.dataset.id
    that.data.yijiid = e.currentTarget.dataset.yjid
    that.data.yijiname = e.currentTarget.dataset.yijiname
    that.data.erjiname = e.currentTarget.dataset.erjiname
    that.setData({
      flerjiid : that.data.flerjiid
    })
  },
  // 获取选择分类
  // selectfenlei(){
  //   var that=this
  //   that.setData({
  //     yijiname : that.data.yijiname,
  //     erjiname : that.data.erjiname,
  //     showModalStatuslist: false,
  //     showModalStatus6:false
  //   })
  //   console.log(that.data.yijiname)
  //   console.log(that.data.erjiname)
  // }
})