// pages/more-movie/more-movie.js
var utils = require('../../../utils/utils.js') //此处必须用相对路径

Page({
  data: {
    totalCount: 0,
    category:'',
    categoryEng:'',
    movieEmpty: true,
    movies: [],
    loadingMore: false //下拉函数控制变量
  },
  onLoad: function (options) {
    const category = options.categoryTitle;
    this.setData({
      category: category
    })
    wx.setNavigationBarTitle({
      title: category
    });
    var dataUrl ="";
    switch (category){
      case '正在热映':
        dataUrl ='https://douban.uieee.com/v2/movie/in_theaters?start=0&count=20';
        this.data.categoryEng = 'in_theaters';
        utils.http(dataUrl, 'GET', this.processDouBanData)
        break;
      case '即将上映':
        dataUrl = 'https://douban.uieee.com/v2/movie/coming_soon?start=0&count=20';
        this.data.categoryEng = 'coming_soon';
        utils.http(dataUrl, 'GET', this.processDouBanData)
        break;
      case '豆瓣Top250':
        dataUrl = 'https://douban.uieee.com/v2/movie/top250?start=0&count=20';
        this.data.categoryEng = 'top250';
        utils.http(dataUrl, 'GET', this.processDouBanData)
        break
    }
  },
  onPullDownRefresh: function(){
     const that = this.data;
     const categoryEng = that.categoryEng;
     let url = `https://douban.uieee.com/v2/movie/${categoryEng}?start=0&count=20`;
     that.totalCount = 0;
     that.movieEmpty = true;
     utils.http(url, 'GET', this.processDouBanData);
  },
  onMovie(event) {
    const movieId = event.currentTarget.dataset.movieId;
    wx.navigateTo({
      url: `../movie-detail/movie-detail?id=${movieId}`
    })
  },
  onScroll: function(){
    const that = this.data;
    const categoryEng = that.categoryEng;
    const totalCount = that.totalCount;
    if(!that.loadingMore){return;} //下拉函数不可用，则不发请求
    that.loadingMore = false;
    let url = `https://douban.uieee.com/v2/movie/${categoryEng}?start=${totalCount}&count=20`;
    wx.showNavigationBarLoading();
    utils.http(url, 'GET', this.processDouBanData);
    wx.showNavigationBarLoading();
  },
  processDouBanData: function (moviesData) {
    const that = this.data;
    that.loadingMore = false;
    const movies = [];
    let totalMovies = [];
    for (let index in moviesData.subjects) {
      var subject = moviesData.subjects[index]
      var title = subject.title
      if (title.length > 6) {
        title = title.substring(0, 6) + '...'
      }
      var stars = utils.StarsToArray(subject.rating.average)
      let temp = {
        title: title,
        coverUrl: subject.images.large,
        average: subject.rating.average,
        stars: stars,
        movieId: subject.id
      }
      movies.push(temp)
    }
    if (that.movieEmpty){
      totalMovies = movies;
      that.movieEmpty = false;
    }else{
      totalMovies = that.movies.concat(movies);
    }
    this.setData({
      movies: totalMovies
    })
    that.loadingMore = true; //有新数据，下拉函数开启
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();//处理完页面数据，停止下拉刷新
    that.totalCount += 20;
  }
})