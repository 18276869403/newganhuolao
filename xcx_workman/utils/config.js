// const baseUrl = "https://localhost:5001/api/app/"
// const sysUrl = "https://localhost:5001/api/sys/"
var deng = require('./configdxy.js')
var zhu = require('./configzpy.js')
// const imgurl = "http://111.231.51.198:91/work-boot/" 
const imgurl = "http://192.168.1.242:9123/work-boot/" //本地
const viewUrl = imgurl+ 'sys/common/view/'
const Download = imgurl + 'sys/common/download' 
const Uploadurl2 = imgurl + 'sys/common/upload2'
const Uploadurl = imgurl + 'sys/common/upload'

// const imgurl = "http://localhost:5001"
// const baseUrl = imgurl + "/api/wx/"
// 获取用户openid
// const GetwxLogin = baseUrl + "wxlogin/GetLogin"
module.exports = {
	// GetwxLogin: GetwxLogin,
	imgurl: imgurl,
	deng: deng,
	zhu: zhu,
	viewUrl: viewUrl, // 图片路径
	download:Download,	// 下载
	uploadurl2:Uploadurl2, //上传图片
	uploadurl:Uploadurl	//上传文件
};
