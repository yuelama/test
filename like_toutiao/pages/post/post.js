// like_toutiao/pages/post/post.js
let apps = getApp();
var myDate = new Date();
var that = this;
function formate_data(myDate) {
  let month_add = myDate.getMonth() + 1;
  var formate_result = myDate.getFullYear() + '-'
    + month_add + '-'
    + myDate.getDate()
  return formate_result;
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice_status: false,
    accounts: ["微信号", "QQ号", "手机号"],
    accountIndex: 0,
    peopleHide: false,
    isAgree: false,
    date: formate_data(myDate),
    address: '点击选择位置',
    longitude: 0, //经度
    latitude: 0,//纬度
    showTopTips: false,
    TopTips: '',
    noteMaxLen: 200,//备注最多字数
    content: "",
    noteNowLen: 0,//备注当前字数
   // types: ["新闻", "旅行", "社交", "相亲", "聚会", "电影", "房产", "音乐", "婚嫁"],
	  types:[],
    typeIndex:0,
		acttypename:[],  
    showInput: false,//显示输入真实姓名,
		codepicurl:'',  //二维码图片	
		form_data:[],
		free:'',
		src: "",
    isSrc: false
		
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
     var that = this;
     apps.util.request({
     			  'url': 'entry/wxapp/getcategorys',
     			  header: {
     			    'content-type': 'application/json' // 默认值
     			  },
     			  success(res) { 
     				 // console.log(res)
     					var typename =[];
     					for(var i=0;i<res.data.data.fenleidata.length;i++){
     						typename[i] = res.data.data.fenleidata[i].name
     					}
     					/* var tyindex =[];
     					for(var a=0;a<res.data.data.fenleidata.length;a++){
     						 tyindex[a] = res.data.data.fenleidata[a].id
     					} 
     					console.log(tyindex) */
     					
     					that.setData({
     						types:typename
     					//	typeIndex:tyindex
     					})
     	       }	         
     			 
     			}) 
	
  },
	
	  //改变活动类别
 bindTypeChange: function (e) {
    this.setData({
      typeIndex: e.detail.value
    })
  }, 
	

 //限制人数
  switch1Change: function (e) {
    if (e.detail.value == false) {
      this.setData({
        peopleHide: false
      })
    } else if (e.detail.value == true) {
      this.setData({
        peopleHide: true
      })
    }
  },

 //选择地点
  addressChange: function (e) {
    this.addressChoose(e);
  },
  
  addressChoose: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        that.setData({
          address: res.name,
          longitude: res.longitude, //经度
          latitude: res.latitude,//纬度
        })
        if (e.detail && e.detail.value) {
          this.data.address = e.detail.value;
        }
      },
      fail: function (e) {
      },
      complete: function (e) {
      }
    })
  },
	
//改变时间
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
	

  
  //表单验证
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },
  
  //字数改变触发事件
  bindTextAreaChange: function (e) {
    var that = this
    var value = e.detail.value,
      len = parseInt(value.length);
    if (len > that.data.noteMaxLen)
      return;
    that.setData({
      content: value, 
			noteNowLen: len
    })
  },
	
		
	 //上传活动图片
 uploadPic: function () {//选择图标
	  var _self = this;		
	 var imgurl = apps.util.url('entry/wxapp/getimgurl',{m:'like_toutiao'});
   wx.chooseImage({
  success (res) {
    const tempFilePaths = res.tempFilePaths
		//console.log(res)
    wx.uploadFile({
      url: imgurl, //仅为示例，非真实的接口地址
      filePath: tempFilePaths[0],
      name: 'imgfile',	
      success (res){
			//console.log(res)
				var jsObject = JSON.parse(res.data);
				console.log(jsObject)
			 	_self.setData({
					isSrc: true,
					src:jsObject.data.img
				}) 
         }
       })
     }
   })
  }, 
	 
//上传活动图片
  /* uploadPic: function () {//选择图标
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], //压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
				console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isSrc: true,
          src: tempFilePaths
        })
      }
    })
  }, */
	  

  //删除图片
   clearPic: function () {//删除图片
    that.setData({
      isSrc: false,
      src: ""
    })
  },	 
		
	
  //改变联系方式
  bindAccountChange: function (e) {
    this.setData({
      accountIndex: e.detail.value
    })
  },

  //同意相关条例
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length,
      showInput: !this.data.showInput
    });
  },
		
	
  //上传活动群二维码
 /* uploadCodePic: function () {//选择图标
	  var _self = this;		
	 var codeurl = apps.util.url('entry/wxapp/getimgurl',{m:'like_toutiao'});
		wx.chooseImage({
		success (res) {
		  const tempFilePaths = res.tempFilePaths
		//	console.log(res)
		  wx.uploadFile({
		    url: codeurl, //仅为示例，非真实的接口地址
		    filePath: tempFilePaths[0],
		    name: 'imgfile',	
		    success (res){
				//	console.log(res)
					var jsObject = JSON.parse(res.data);
					console.log(jsObject)
				 	_self.setData({
						  isCodeSrc: true,
						codeSrc: jsObject.data.img
					}) 
		       }
		     })
		   }
		 })	
  }, */

//上传活动群二维码
  /* uploadCodePic: function () {//选择图标
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'],//压缩图
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          isCodeSrc: true,
          codeSrc: tempFilePaths
        })
      }
    })
  },
 */

  //删除活动群二维码
 /* clearCodePic: function () {
    that.setData({
      isCodeSrc: false,
      codeSrc: ""
    })
  },	 */
		
	//提示注意
	tapNotice: function (e) {
    if (e.target.id == 'notice') {
      this.hideNotice();
    }
  },
  showNotice: function (e) {
    this.setData({
      'notice_status': true
    });
  },
	
  hideNotice: function (e) {
    this.setData({
      'notice_status': false
    });
  },	
		
		

 //提交表单
  submitForm: function (e) {
		//console.log(e);
		
		var that = this;
		if (this.data.showInput == false) {
		     wx.showModal({
		       title: '提示',
		       content: '请先阅读《发起须知》'
		     })
		     return;
		   } 
 
		var form_data = e.detail.value;
		//console.log(form_data);
  	var openid = wx.getStorageSync('userid');
		/* var headimg = wx.getStorageSync('avatarUrl');
		console.log(headimg);
		var username = wx.getStorageSync('nickName');
		console.log(username); */
		
	  var title = form_data.title;
    var endtime = this.data.date;
		var free = form_data.free;
		var src = this.data.src;
		//console.log(src)
		
  var typeIndex = this.data.typeIndex;
  var acttype = 1 + parseInt(typeIndex);

  // var acttypename = getTypeName(acttype); 
	 // var acttype = this.data.acttype; 
	 
    var address = this.data.address;
    var longitude = this.data.longitude; //经度
    var latitude = this.data.latitude;//纬度
    var switchHide = form_data.switchHide;
    var peoplenum = form_data.peoplenum;
    //console.log(peoplenum);
    var content = form_data.content;
    //------发布者真实信息------
    var realname = form_data.realname;
    var contactindex = this.data.accountIndex;	
    if (contactindex == 0) {
      var contactWay = "微信号";
    } else if (contactindex == 1) {
      var contactWay = "QQ号";
    } else if (contactindex == 2) {
      var contactWay = "手机号";
    }
    var wxReg = new RegExp("^[a-zA-Z]([-_a-zA-Z0-9]{5,19})+$");
		//console.log(wxReg)
    var qqReg = new RegExp("[1-9][0-9]{4,}");
    var phReg = /^1[34578]\d{9}$/;
    var nameReg = new RegExp("^[\u4e00-\u9fa5]{2,4}$");
		 var contactValue = form_data.contactValue;
	//	console.log(nameReg)
		//先进行表单非空验证
		 if (title == "") {
		  that.setData({
		    showTopTips: true,
		    TopTips: '请输入主题'
		  });
		} else if (address == '点击选择位置') {
		  that.setData({
		    showTopTips: true,
		    TopTips: '请选择地点'
		  });
		} else if (switchHide == true && peoplenum == "") {
		  that.setData({
		    showTopTips: true,
		    TopTips: '请输入人数'
		  });
		} else if (content == "") {
		  that.setData({
		    showTopTips: true,
		    TopTips: '请输入活动内容'
		  });
		}else if (realname == "") {
		  that.setData({
		    showTopTips: true,
		    TopTips: '请输入真实姓名'
		  });
		} else if (realname != "" && !nameReg.test(realname)) {
		  that.setData({
		    showTopTips: true,
		    TopTips: '真实姓名一般为2-4位汉字'
		  });
		} else if (contactValue == "") {
		  that.setData({
		    showTopTips: true,
		    TopTips: '请输入联系方式'
		  });
		} else if (contactWay == "微信号" && !wxReg.test(contactValue)) {
		  that.setData({
		    showTopTips: true,
		    TopTips: '微信号格式不正确'
		  });
		} else if (contactWay == "手机号" && !phReg.test(contactValue)) {
		  that.setData({
		    showTopTips: true,
		    TopTips: '手机号格式不正确'
		  });
		} else if (contactWay == "QQ号" && !qqReg.test(contactValue)) {
		  that.setData({
		    showTopTips: true,
		    TopTips: 'QQ号格式不正确'
		  });
		} else {
		  console.log('校验完毕');
		  that.setData({
		    isLoading: true,
		    isdisabled: true
		  }) 		     	
		} 
		
		//向表中增加一条数据	
	  apps.util.request({
	  		  'url': 'entry/wxapp/gettest',
	  		  header: {
	  		    'content-type': 'application/json' // 默认值
	  		  },
			 	data:{
					title:form_data.title,
					openid:this.data.openid,
					endtime:this.data.date,
					src:this.data.src,
					
				//	acttypename:this.data.types,  //添加活动类型
					//typeIndex:this.data.typeIndex,      //添加活动编号
					acttype:acttype + "", 
					free:form_data.free,			  
					isShow:'1',
					address:this.data.address,
					longitude:this.data.longitude,
					latitude:this.data.latitude,
					content:form_data.content,		 	
				 contactValue:form_data.contactValue,
				  peoplenum: form_data.peoplenum,
					realname:form_data.realname,
					readnums:'0',
					//likenum:'0',
				//	liker:'0',  //收藏人数
				//	joinnumber:'0' , //报名人数 
					isSrc:'true'
					//src:_self.data.src
				}, 
     success (res) {
			//console.log(res)			
			 console.log("发布成功");	
				     wx.showToast({
                        title: '发布成功',
                        icon: 'success',
                        duration: 1000
                      })
					 	 that.setData({
								 title: '',
                  typeIndex: 0,
									src:'',
                  address: '点击选择位置',
                  longitude: 0, //经度
                  latitude: 0,//纬度
                  data: formate_data(myDate),
                  isHide: true,
                  peoplenum: 0,
                  peopleHide: false,
                  isAgree: false,
                  accountIndex: 0,
                  realname: "",
                  content: "",
									free:"",
                  contactValue: '',
                  noteNowLen: 0,
                  showInput: false,
                  src: "",
                  isSrc: false,
                  codeSrc: "",
                  isCodeSrc: false
							 })
							  setTimeout(function () {
                        wx.switchTab({
                          url: '../index/index',
                        })
                      }, 2000) 
							 
				 
							/* console.log("发布失败")
							 that.setData({
							  showTopTips: false
							})
							 setTimeout(function () {
							        wx.switchTab({
							          url: '../index/index',
							        })
							      }, 2000) 		 */			
						 
										
	 	     }
		})
		
 },
 
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

//根据活动类型获取活动类型名称
/* function getTypeName(acttype) {
  var acttypeName = "";
  if (acttype == 1) acttypeName = "新闻";
  else if (acttype == 2) acttypeName = "旅行";
  else if (acttype == 3) acttypeName = "社交";
  else if (acttype == 4) acttypeName = "相亲";
  else if (acttype == 5) acttypeName = "聚会";
  else if (acttype == 6) acttypeName = "电影";
  else if (acttype == 7) acttypeName = "房产";
  else if (acttype == 8) acttypeName = "音乐";
  else if (acttype == 9) acttypeName = "婚嫁";
  return acttypeName;
} */

