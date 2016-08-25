var indexList = require('../template/list.string');

// 定义视图
SPA.defineView('list', {
  // 装载模板
  html: indexList,
  //定义插件
  plugins:['delegated'],
  //装载子视图
  modules:[{
  	name:'content',
  	container:'#index',
  	views:['list','index'],
  	/*defaultTag:'list'*/
  }],
  //banner
  bindEvents:{
  	'show':function(){
  		var mySwiper=new Swiper('#list-swiper',function(){
  			loop:true;
  		});
  	}
  },
  bindActions:{
  	'switch':function(){
  		this.modules.content.launch('index');
  	}
  }
});
