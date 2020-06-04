const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  return [year,month,day].map(formatNumber).join('-')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const Ages = function(str){
    str = str.split(' ')[0]
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);    
    if(r==null)return false;    
      var d= new Date(r[1],   r[3]-1,   r[4]);    
      if (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])  
      { 
        var Y = new Date().getFullYear();  
        return Y-r[1];  
      }  
    return("输入的日期格式错误！");  
}

const SubName = function(str){
  var temp = "";
  if(str.length>2){
    temp = temp + str.substring(0,3) + "...";
  }else{
    temp = str
  }
  return temp;
}

const FormatName = function (str) {
  var temp = ""
  if (str.length>1)
  {
    return temp = str.substring(0,1) + '**';
  }else{
    return temp 
  }
}

const FormatPhone = function (str) {
    var temp = "";
    for (var i=0; i<str.length; i++)
    {
      if (i<3||i>8)
      {
        temp = temp + str.substring(i,i+1);
      }
      else
      {
        temp = temp + "*";
      }
    }
    return temp;
}

module.exports = {
  formatTime: formatTime,
  formatDate:formatDate,
  ages:Ages,
  formatName:FormatName,
  subName:SubName,
  formatPhone:FormatPhone
}
