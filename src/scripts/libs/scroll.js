// pullToRefresh
module.exports = function (opt) {
  opt.eleHeadAndFoot = $('#home-swiper');
  opt.objRefreshAjax = {
    url: '/api/livelist.php',
    type: 'get',
    data: {
      type: 'refresh'
    },
    success: function (res) {
      opt.vm.livelist = res.data.concat(opt.vm.livelist);
    }
  };
  opt.objMoreAjax = {
    url: '/api/livelist.php',
    type: 'get',
    data: {
      type: 'more',
      pageNo: 2
    },
    success: function (res) {
        opt.vm.livelist.pushArray(res.data);

        myScroll.refresh();
        myScroll.scrollTo(0, self.y + topSize);
        foot.removeClass('down');
        foot.attr('src', '/footballSNS/images/arrow.png');
    }
  };

  // var myScroll = this.widgets.myScroll;
  var myScroll = opt.scroll;
  var topSize = 35;

  var ele = opt.eleHeadAndFoot;
  var head = ele.find('.head img'),
      topImgHasClass = head.hasClass('up');
  var foot = ele.find('.foot img'),
      bottomImgHasClass = head.hasClass('down');

  myScroll.on('scroll', function () {
    var y = this.y,
    maxY = this.maxScrollY - y;
    if (y >= 0) {
      $('.head').show();
      !topImgHasClass && head.addClass('up');
      return '';
    }
    if (maxY >= 0) {
      $('.foot').show();
      !bottomImgHasClass && foot.addClass('down');
      return '';
    }
  });

  myScroll.on('scrollEnd', function () {
    if (this.y >= -topSize && this.y < 0) {
      myScroll.scrollTo(0, -topSize);
      head.removeClass('up');
    } else if (this.y >= 0) {
      head.attr('src', '/footballSNS/images/ajax-loader.gif');
      //TODO ajax下拉刷新数据

      $.ajax({
        url: opt.objRefreshAjax.url,
        type: opt.objRefreshAjax.type,
        data: opt.objRefreshAjax.data,
        success: function (res) {
          opt.objRefreshAjax.success(res);
        }
      })

      setTimeout(function () {
        myScroll.scrollTo(0, -topSize);
        head.removeClass('up');
        head.attr('src', '/footballSNS/images/arrow.png');
      }, 1000);
    }

    var maxY = this.maxScrollY - this.y;
    var self = this;
    if (maxY > -topSize && maxY < 0) {
      myScroll.scrollTo(0, self.maxScrollY + topSize);
      foot.removeClass('down')
    } else if (maxY >= 0) {
      foot.attr('src', '/footballSNS/images/ajax-loader.gif');
      // ajax上拉加载数据
      $.ajax({
        url: '/api/livelist.php',
        type: 'get',
        data: {
          type: 'more',
          pageNo: 2
        },
        success: function (res) {
          opt.vm.livelist.pushArray(res.data);

          myScroll.refresh();
          myScroll.scrollTo(0, self.y + topSize);
          foot.removeClass('down');
          foot.attr('src', '/footballSNS/images/arrow.png');
        }
      });
    }
  });
};
