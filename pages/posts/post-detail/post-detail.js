// pages/posts/post-detail/post-detail.js
// 全局的设置还没做
var postsDate = require('../../../data/post-data.js')


Page({
  data: {
    isPlayingMusic: false

  },
  onLoad: function(option){
    var postId = option.id;
    var postData = postsDate.postList[postId]
    this.data.currentPostId = postId 
    this.setData({
      postData: postData,
    })
    
    var postsCollection = wx.getStorageSync("posts_collection")
    //读取对象属性时，先去判断对象是否存在
    if (postsCollection){
      var postCollection = postsCollection[postId]
      if(postCollection === undefined){
        postCollection = false
      }
      this.setData({
        collected: postCollection
      })
    }else{
      var postsCollection={}
      postsCollection[postId] = false;
      wx.setStorageSync("posts_collection", postsCollection)
    }
  },

  onCollectionTap(event){
    var postsCollection = wx.getStorageSync("posts_collection")
    var postCollection = postsCollection[this.data.currentPostId]
    postCollection = !postCollection
    postsCollection[this.data.currentPostId] = postCollection
    this.showToast(postsCollection, postCollection)
  },

  onShareTap(){
    var list = [
      '分享到微信',
      '分享到朋友圈',
      '分享到QQ空间',
      '分享到微博'
    ]
    wx.showActionSheet({
      itemList: list,
      itemColor: '#405f80',
      success: function(res){
        wx.showToast({
          title: '用户'+list[res.tapIndex],
          icon: 'success',
          duration: 1000
        })
      }
    })
  },

  //将不同的功能提取出来做不同的函数
  showToast(postsCollection, postCollection){
    //更新文章是否收藏
    wx.setStorageSync("posts_collection", postsCollection)
    //更新数据绑定变量
    this.setData({
      collected: postCollection
    })
    wx.showToast({
      title: postCollection ? '收藏成功' : '取消收藏',
      icon: 'success',
      duration: 1000
    })
  },

  onMusic(){
    var that = this
    var postData = postsDate.postList[this.data.currentPostId]
    var isPlayingMusic = this.data.isPlayingMusic
    if (isPlayingMusic){
      wx.pauseBackgroundAudio()
      this.setData({
        isPlayingMusic: false
      })
    }else{
      wx.playBackgroundAudio({
        dataUrl: postData.music.url,
        title: postData.music.title,
        coverImgUrl: postData.music.coverImg
      })
      this.setData({
        isPlayingMusic: true
      })
    }

    wx.onBackgroundAudioPlay(function(){
      that.setData({
        isPlayingMusic: true
      })
    })
    wx.onBackgroundAudioPause(function(){
      that.setData({
        isPlayingMusic: false
      })
    })
  }
})