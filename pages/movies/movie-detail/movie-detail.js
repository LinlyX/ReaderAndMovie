import { Movie } from 'class/Movie.js';

Page({
  data: {
    movie: {}
  },
  onLoad: function (options) {
    let id = options.id;
    let movieUrl = `https://douban.uieee.com/v2/movie/subject/` + id;
    var movie = new Movie(movieUrl);
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })
  },
  viewMoviePostImg: function (event) {
    var url = event.currentTarget.dataset.src;
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  }
})