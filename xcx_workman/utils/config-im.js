const baseUrl = "http://111.231.51.198:91/work-boot/"
//  const baseUrl = "http://127.0.0.1:9123/work-boot/" 

const imBaseUrl = "ws://111.231.51.198:91/work-boot/"
//  const imBaseUrl = "ws://127.0.0.1:9123/work-boot/"  

// 消息列表
const imList = baseUrl + "work/im/list"  
// 接收消息ws /work/im/user/{id}
const imReceive = imBaseUrl+ "work/im/user/"  
// 发送消息 /work/im/user/{id}
const imSend = baseUrl + "work/im/add"  
// 附件上传路径
const upload = baseUrl + "sys/common/upload"
// 图片预览
const viewUrl = baseUrl + 'sys/common/view/'

module.exports = {
  imSend : imSend,
  imList : imList,
  imReceive : imReceive,
  upload  : upload,
  viewUrl : viewUrl
};