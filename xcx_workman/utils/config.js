var deng = require('./configdxy.js')
var zhu = require('./configzpy.js')
var im = require('./config-im.js')
const imgurl = "http://miss.it-ys.com:91/work-boot/" 
// const imgurl = "http://192.168.1.242:8080/work-boot/" //本地
const baiduAK = 'CauqHCxjKu4NcebB4UjlUYTbGqtRpEN5'

// url
const viewUrl = imgurl+ 'sys/common/view/'
const Download = imgurl + 'sys/common/download' 
const Uploadurl2 = imgurl + 'sys/common/upload2'
const Uploadurl = imgurl + 'sys/common/upload'

module.exports = {
	imgurl: imgurl,
	deng: deng,
	zhu: zhu,
	im : im,
	viewUrl: viewUrl, // 图片路径
	download:Download,	// 下载
	uploadurl2:Uploadurl2, //上传图片
	uploadurl:Uploadurl,	//上传文件
	baiduAK:baiduAK
};
