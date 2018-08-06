var utils = require('../../utils/utils.js') //此处必须用相对路径

Page({
  data:{
    containerShow: true,
    searchPanelShow: false,
    searchMovies: {},
  },
  onLoad: function(){
    var inTheatersUrl = "https://douban.uieee.com/v2/movie/in_theaters?start=0&count=3"
    var comingSoonUrl = "https://douban.uieee.com/v2/movie/coming_soon?start=0&count=3"
    var top250Url = "https://douban.uieee.com/v2/movie/top250?start=0&count=3"
    this.onProgress(inTheatersUrl, "inTheaters","正在热映")
    this.onProgress(comingSoonUrl, "comingSoon","即将上映")
    this.onProgress(top250Url, "top250","豆瓣Top250")
  },

  onChangeTap(event){
    let categoryTitle = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: `more-movie/more-movie?categoryTitle=${categoryTitle}`
    })
  },

  onMovie(event){
    const movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: `movie-detail/movie-detail?id=${movieId}`
    })
  },

  onProgress: function (url, selectKey, categoryTitle){
    var that = this
    wx.request({
      url: url,
      header: {
        "content-type": "application/xml"
      },
      method: 'GET',
      success: function (res) {
        that.processDouBanData(res.data, selectKey, categoryTitle)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  processDouBanData: function(moviesData,selectKey,categoryTitle){
    var movies = [];
    for (var index in moviesData.subjects){
      var subject = moviesData.subjects[index]
      var title = subject.title
      if(title.length>6){
        title = title.substring(0,6)+'...'
      }
      var stars = utils.StarsToArray(subject.rating.average)
      var temp = {
        title: title,
        coverUrl: subject.images.large,
        average: subject.rating.average,
        stars: stars,
        movieId: subject.id
      }
      movies.push(temp)
    }
    var movieState={}
    movieState[selectKey] = {
      categoryTitle: categoryTitle,
      movies: movies
    }
    this.setData(movieState)
  },
  onFocus: function(event){
    this.setData({
      containerShow : false,
      searchPanelShow : true
    })
  },
  onBlur: function(event){
    //获取到查询的文本
    let text = event.detail.value;//获取事件的自定义属性 event.detail.value;当前状态的值
    let url = `https://douban.uieee.com/v2/movie/search?q=${text}`;
    this.onProgress(url, "searchMovies", "");
  },
  onButtonXX: function(){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    })
  }
})