var postsDate = require('../../data/post-data.js') //此处必须用相对路径

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //小程序总会读取data对象来做数据绑定，这个动作为动作A
    //动作A的执行时在onLoad时间执行之后发生的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //页面初始化，options为页面跳转所带来的参数
  onLoad: function (options) {
    //this.data.post_key = postsDate.postList
    this.setData({
      post_key: postsDate.postList,
    });

    // var list = this.data.post_key
    // var postsReading = wx.getStorageSync('posts_reading')
    // if(postsReading){
    //   this.setData({
    //     views: postsReading
    //   })
    // }else{
    //   postsReading = {};
    //   for(var i=0; i<list.length; i++){
    //     var currentId = list[i].postId;
    //     postsReading[current] = 0;
    //   }
    //   wx.setStorageSync('posts_reading', postsReading)
    // }

  },

  onPostTap: function(event) {
    var postId = event.currentTarget.dataset.postId;
    // var postsView = wx.getStorageSync('posts_reading');
    // postsView[postId] = postsView[postId] + 1;
    // wx.setStorageSync('posts_reading', postsView);
    // this.setData({
    //   views: postsReading
    // })
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  onSwiper(event) {
    var postId = event.target.dataset.postId;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  },
  // onView: function (event) {
  //   var postId = event.currentTarget.dataset.postId;
  //   var view = wx.getStorageSync('posts_view')[this.data.currentId];
  //   view += 1;
  //   this.setDate({
  //     view: view
  //   })
  // }
})