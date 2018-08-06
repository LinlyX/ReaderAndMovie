function StarsToArray(stars){
  let num = Math.round(stars/2)
  let arr = []
  for(let i=0; i<5; i++){
    if(num-1>=0){
      arr.push(1);
    }else{
      arr.push(0)
    }
    num = num - 1
  }
  return arr
}

function http(url,method,callback) {
  var that = this
  wx.request({
    url: url,
    header: {
      "content-type": "json"
    },
    method: method,
    success: function (res) {
      callback(res.data)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  StarsToArray: StarsToArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}