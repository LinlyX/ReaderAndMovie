var utils = require('../../../../utils/utils.js');

class Movie{
  constructor(url){
    this.url=url;
  }
  getMovieData(cb){
    this.cb=cb;
    utils.http(this.url, 'GET', this.processMovieData.bind(this));
  }
  processMovieData(data) {
    if (!data) {
      return;
    }
    var director = {
      avatar: "",
      name: "",
      id: ""
    }
    if (data.directors[0] != null) {
      if (data.directors[0].avatars != null) {
        director.avatar = data.directors[0].avatars.large

      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id;
    }
    var movie = {
      movieImg: data.images ? data.images.large : "",
      country: data.countries[0],
      title: data.title,
      originalTitle: data.original_title,
      wishCount: data.wish_count,
      commentCount: data.comments_count,
      year: data.year,
      generes: data.genres.join("、"),
      stars: utils.StarsToArray(data.rating.average),
      score: data.rating.average,
      director: director,
      casts: utils.convertToCastString(data.casts),
      castsInfo: utils.convertToCastInfos(data.casts),
      summary: data.summary
    }
    //这里的设置数据将是一个异步方法
    // this.setData({
    //   movie: movie
    // })
    this.cb(movie);
  }
}

export {Movie}