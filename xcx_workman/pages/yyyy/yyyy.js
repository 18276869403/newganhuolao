// import { match } from "assert"

// pages/yyyy/yyyy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shendu:'',
    fjkd:'',
    fjcd:'',
    mgd:'',
    mkd:'',
    msl:'',
    cgd:'',
    ckd:'',
    csl:'',
    // 地板
    dbfjcd:'',
    dbfjkd:'',
    dbdcd:'',
    dbdkd:'',
    // 地砖
    dzfjcd:'',
    dzfjkd:'',
    dzzcd:'',
    dzzkd:'',
    // 墙砖
    qzfjcd:'',
    qzfjkd:'',
    qzfjgd:'',
    qzmgu:'',
    qzmkd:'',
    qzmss:'',
    qzccd:'',
    qzckd:'',
    qzcss:'',
    qzcd:'',
    qzkd:'',
    //壁纸
    bzfjcd:'',
    bzfjkd:'',
    bzfjgd:'',
    bzgg:'',
    //窗帘
    chcd:'',
    chkd:'',
    blkd:'',
    //顶棚
    cd:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.obj)
    if(options.obj==1){
      this.setData({
        type:1
      })
    }
    if(options.obj==2){
      this.setData({
        type:2
      })
    }
    if(options.obj==3){
      this.setData({
        type:3
      })
    }
    if(options.obj==4){
      this.setData({
        type:4
      })
    }
    if(options.obj==5){
      this.setData({
        type:5
      })
    }
    if(options.obj==6){
      this.setData({
        type:6
      })
    }
    if(options.obj==7){
      this.setData({
        type:7
      })
    }
  },
  // 获取深度
  shendu:function(e){
    this.setData({
      shendu:e.detail.value
    })
  },
  //房间宽度
  fjkd:function(e){
    this.setData({
      fjkd:e.detail.value
    })
  },
  //房间长度
  fjcd:function(e){
    this.setData({
      fjcd:e.detail.value
    })
  },
    //门高度
  mgd:function(e){
    this.setData({
      mgd:e.detail.value
    })

  },
    //门宽度
  mkd:function(e){
    this.setData({
      mkd:e.detail.value
    })
  },
//门数量
  msl:function(e){
    this.setData({
      msl:e.detail.value
    })
  },
    //窗高度
    cgd:function(e){
    this.setData({
      cgd:e.detail.value
    })
  },
    //窗宽度
  ckd:function(e){
    this.setData({
      ckd:e.detail.value
    })
  },
    //窗数量
  csl:function(e){
    this.setData({
      csl:e.detail.value
    })
  },

  shendu:function(e){
    this.setData({
      shendu:e.detail.value
    })
  },
  // 计算
  jisuan:function(){
    var that=this
    if(that.data.shendu==''){
      wx.showToast({
        title: '请输入房间深度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.fjkd==''){
      wx.showToast({
        title: '请输入房间宽度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.fjcd==''){
      wx.showToast({
        title: '请输入房间长度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.mgd==''){
      wx.showToast({
        title: '请输入门高度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.mkd==''){
      wx.showToast({
        title: '请输入门宽度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.msl==''){
      wx.showToast({
        title: '请输入门数量',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.cgd==''){
      wx.showToast({
        title: '请输入窗高度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.ckd==''){
      wx.showToast({
        title: '请输入窗宽度',
        icon:'none',
        duration:2000
      })
      return
    }
    if(that.data.csl==''){
      wx.showToast({
        title: '请输入窗数量',
        icon:'none',
        duration:2000
      })
      return
    }
    console.log(that.data.fjcd)
    console.log(that.data.fjkd)
    console.log(that.data.shendu)
    var fc=that.data.fjcd
    var fk=that.data.fjkd
    var fs=that.data.shendu
    var mainji=(Number(fc)+Number(fk))*2*Number(fs)+Number(fc)*Number(fk)
    var menmainji=Number(that.data.mgd)*Number(that.data.mkd)*Number(that.data.msl)
    var chuangmainji=Number(that.data.cgd)*Number(that.data.ckd)*Number(that.data.csl)
    var sjmj=Number(mainji)-Number(menmainji)-Number(chuangmainji)
    var jieguo=(Number(sjmj)/8.6*100)/100
    if(Number(jieguo)>Number(jieguo).toFixed(0))
    {
      var jieguo=(Number(jieguo)+1).toFixed(0)
    }
    console.log(jieguo)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguo,
    })
  },
   // 地板用量计算
   
  //房间长度
  dbfjcd:function(e){
    this.setData({
      dbfjcd:e.detail.value
    })
  },
  //房间宽度
  dbfjkd:function(e){
    this.setData({
      dbfjkd:e.detail.value
    })
  },
  //地板长度
  dbdcd:function(e){
    this.setData({
      dbdcd:e.detail.value
    })
  },
  //地板宽度
  dbdkd:function(e){
    this.setData({
      dbdkd:e.detail.value
    })
  },
  //计算
  jisuandb(){
    var that=this
    var jieguodb=Math.round((Number(that.data.dbfjcd)/Number(that.data.dbdcd))*(Number(that.data.dbfjkd)/Number(that.data.dbdkd)))
    console.log(jieguodb)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguodb,
    })
  },

  // 地砖用量计算
   
  //房间长度
  dzfjcd:function(e){
    this.setData({
      dzfjcd:e.detail.value
    })
  },
  //房间宽度
  dzfjkd:function(e){
    this.setData({
      dzfjkd:e.detail.value
    })
  },
  //地砖长度
  dzzcd:function(e){
    this.setData({
      dzzcd:e.detail.value
    })
  },
  //地砖宽度
  dzzkd:function(e){
    this.setData({
      dzzkd:e.detail.value
    })
  },
  //计算
  jisuandz(){
    var that=this
    var jieguodz=Math.round((Number(that.data.dzfjcd)/Number(that.data.dzzcd))*(Number(that.data.dzfjkd)/Number(that.data.dzzkd)))
    console.log(jieguodz)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguodz,
    })
  },
  
  // 墙砖用量计算
   
  //房间长度
  qzfjcd:function(e){
    this.setData({
      qzfjcd:e.detail.value
    })
  },
  //房间宽度
  qzfjkd:function(e){
    this.setData({
      qzfjkd:e.detail.value
    })
  },
  //房间高度
  qzfjgd:function(e){
    this.setData({
      qzfjgd:e.detail.value
    })
  },
  //门高度
  qzmgu:function(e){
    this.setData({
      qzmgu:e.detail.value
    })
  },
  //门宽度
  qzmkd:function(e){
    this.setData({
      qzmkd:e.detail.value
    })
  },
  //门扇数
  qzmss:function(e){
    this.setData({
      qzmss:e.detail.value
    })
  },
  //窗高度
  qzccd:function(e){
    this.setData({
      qzccd:e.detail.value
    })
  },
  //窗宽度
  qzckd:function(e){
    this.setData({
      qzckd:e.detail.value
    })
  },
  //窗扇数
  qzcss:function(e){
    this.setData({
      qzcss:e.detail.value
    })
  },
  //墙砖长度
  qzcd:function(e){
    this.setData({
      qzcd:e.detail.value
    })
  },
  //墙砖宽度
  qzkd:function(e){
    this.setData({
      qzkd:e.detail.value
    })
  },
  //计算
  jisuanqz(){
    var that=this
    var jieguoqz=0
    console.log(jieguoqz)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguoqz,
    })
  },

  // 壁纸用量计算
   
  //房间长度
  bzfjcd:function(e){
    this.setData({
      qzfjcd:e.detail.value
    })
  },
  //房间宽度
  bzfjkd:function(e){
    this.setData({
      bzfjkd:e.detail.value
    })
  },
  //房间高度
  bzfjgd:function(e){
    this.setData({
      bzfjgd:e.detail.value
    })
  },
  //壁纸规格
  bzgg:function(e){
    this.setData({
      bzgg:e.detail.value
    })
  },
  //计算
  jisuanqz(){
    var that=this
    var jieguobz=0
    console.log(jieguobz)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguobz,
    })
  },
  
  // 窗帘用量计算
   
  //窗户长度
  chcd:function(e){
    this.setData({
      chcd:e.detail.value
    })
  },
  //窗户宽度
  chkd:function(e){
    this.setData({
      chkd:e.detail.value
    })
  },
  //布料宽度
  blkd:function(e){
    this.setData({
      blkd:e.detail.value
    })
  },
  //计算
  jisuancl(){
    var that=this
    var jieguocl=0
    console.log(jieguocl)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguocl,
    })
  },
  
  // 顶棚用量计算
   
  //窗户长度
  cd:function(e){
    this.setData({
      cd:e.detail.value
    })
  },
  //计算
  jisuandp(){
    var that=this
    var jieguodp=0
    console.log(jieguodp)
    wx.navigateTo({
      url: '../jsjg/jsjg?obj='+jieguodp,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})