// pages/need/need.js
//获取应用实例
const app = getApp()
//调用接口js
const qingqiu = require('../../utils/request.js')
const api = require('../../utils/config.js')

Page({
  data: {
    viewUrl:api.viewUrl,
    animationData:'',
    showModalStatus:'',
    animationData:'',
    navRightItems:'',
    hasMask:'',
    sousuotext:'',
    needsListfy:[],
    needsList:[],
    oneclass:[],
    twoclass:[],
    firstId:'',
    firstname:'',
    firstnamewhere:'',
    secondId:'',
    secondname:'',
    secondnamewhere:'',
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
    erjiname:''
  },
   // 搜索框
   shurukuang:function(e){
    this.setData({
      sousuotext:e.detail.value
    })
  },
  // 全部
  quanbu:function(){
     var that = this
     that.data.firstId=''
     that.data.secondId=''
     that.data.firstname=''
     that.setData({
        showModalStatus: false,
        firstname:that.data.firstname
      })
  },
  // 搜索按钮
  btnsearch:function(){
    var obj = {
      pageNo:1,
      pageSize:10
    }
    if(this.data.sousuotext != "" && this.data.yijiid != "undefined" && this.data.yijiid != null){
      obj.needTitle = this.data.sousuotext
    }
    if(this.data.yijiid != "" && this.data.yijiid != "undefined" && this.data.yijiid != null){
      obj.oneClassId = this.data.yijiid
    }
    if(this.data.flerjiid != "" && this.data.flerjiid != "undefined" && this.data.yijiid != null){
      obj.twoClassId = this.data.flerjiid
    }
    this.xqneedlist(obj)
  },
  // 获取需求
  // 下拉刷新
  onPullDownRefresh: function () {
    this.onLoad()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000);
  },
  onLoad: function() {
    this.xqneedlist({pageNo:1,pageSize:10})
    this.oneClass()
    this.twoClass()
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
  // 左侧按钮
  left: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    that.setData({
      firstId: id,
      firstname: name
    })
    var data={
      oneClassId:that.data.firstId
    }
    qingqiu.get("twoClassList", data, function(re) {
    if (re.success == true) {
      if (re.result != null) {
        that.twoclass = re.result
        that.setData ({
          twoclass : that.twoclass
        })
      } else {
      }
    } 
  })
  },
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
  // 需求列表
  xqneedlist(data) {
    var that = this
    qingqiu.get("zuixinxq", data, function(re) {
      if (re.success == true) {
        if (re.result != null) {
          that.needsList = re.result.records
          for(var i= 0 ; i < that.needsList.length; i++){
            re.result.records[i].publishTime = re.result.records[i].publishTime.split(' ')[0]
            if(re.result.records[i].backup1!= null&&re.result.records[i].backup1.length>0){
              re.result.records[i].backup1 = re.result.records[i].backup1.split(',')
            }
          }
          console.log(re.result.records)
          that.setData ({
            needsList : re.result.records,
            needsListfy : re.result.records
          })
        } else {
          qingqiu.tk('未查询到任何数据')
        }
      } 
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
  // 跳转到需求详情页面
  needsDetails: function(e) {
    var obj1 =e.currentTarget.dataset.vall;
    var xqxq = JSON.stringify(obj1);
    wx.navigateTo({
      url: '../needsDetails/needsDetails?obj1=' + xqxq,
    })
  },
  // 跳转到提交需求页面
  submitNeeds: function() {
    wx.navigateTo({
      url: '../submitNeeds/submitNeeds?type=0&id=0',
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
        yijiname : that.data.yijiname,
        erjiname : that.data.erjiname,
      })
    }else{
      that.setData({
        yijiname : '',
        erjiname : '',
      })
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
      type:3
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
})