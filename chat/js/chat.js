$(function() {





var iScroller = new IScroll('#iScrollContainer');
window.iScroller = iScroller;

var Chatter = function(opt) {
  this.dom = $(opt.dom);
  this.maxImgWidth = opt.maxImgWidth;

  this._fetchLastChatList();
};

Chatter.prototype._fetchLastChatList = function() {
  var mockMessages = [
    {type: 'text', content: '平时运动多吗？饮食情况平时运动多吗？饮食情况怎么样怎么样', isMine: false, user: {icon: 'http://a.hiphotos.baidu.com/ting/pic/item/c8177f3e6709c93dbdb3d4d09d3df8dcd1005450.jpg'}},
    {type: 'text', content: '平时运动多吗？饮食情况怎么样', isMine: true, user: {icon: 'http://musicdata.baidu.com/data2/pic/115459298/115459298.jpg'}},
    {type: 'text', content: '平时运动多吗？饮食情况平时运动多吗？饮食情况怎么样怎么样', isMine: false, user: {icon: 'http://a.hiphotos.baidu.com/ting/pic/item/c8177f3e6709c93dbdb3d4d09d3df8dcd1005450.jpg'}},
    {type: 'text', content: '平时运动多吗？饮食情况平时运动多吗？饮食情况怎么样怎么样平时运动多吗？饮食情况怎么样', isMine: true, user: {icon: 'http://musicdata.baidu.com/data2/pic/115459298/115459298.jpg'}},
    {type: 'text', content: '平时运动多吗？饮食情况怎么样', isMine: false, user: {icon: 'http://a.hiphotos.baidu.com/ting/pic/item/c8177f3e6709c93dbdb3d4d09d3df8dcd1005450.jpg'}},
    {type: 'text', content: '平时运动多吗？饮食情况怎么样', isMine: true, user: {icon: 'http://musicdata.baidu.com/data2/pic/115459298/115459298.jpg'}},
    {type: 'img', content: 'http://n.sinaimg.cn/default/20151101/bzmF-fxkhqea2920788.jpg', isMine: false, user: {icon: 'http://a.hiphotos.baidu.com/ting/pic/item/c8177f3e6709c93dbdb3d4d09d3df8dcd1005450.jpg'}},
    {type: 'img', content: 'http://n.sinaimg.cn/default/20151101/I7KR-fxkhcfq1025307.jpg', isMine: true, user: {icon: 'http://musicdata.baidu.com/data2/pic/115459298/115459298.jpg'}},
    {type: 'text', content: '平时运动多吗？饮食情况怎么样', isMine: false, user: {icon: 'http://a.hiphotos.baidu.com/ting/pic/item/c8177f3e6709c93dbdb3d4d09d3df8dcd1005450.jpg'}},
    {type: 'text', content: '平时运动多吗？饮食情况怎么样', isMine: true, user: {icon: 'http://musicdata.baidu.com/data2/pic/115459298/115459298.jpg'}}
  ];

  var that = this;
  setTimeout(function() {
    that._renderList(mockMessages);
    iScroller.refresh();
    iScroller.scrollTo(0, iScroller.maxScrollY, 200);
  }, 3);
};

Chatter.prototype._renderList = function(messages) {
  var html = [];
  for(var i = 0; i < messages.length; i ++) {
    html.push(this._generateHtml(messages[i]));
  }
  this.dom.append(html.join(''));
};

Chatter.prototype._generateHtml = function(message) {
  var html = [];

  html.push('<div class="chat-item ' + (message.isMine ? 'right-item' : 'left-item') + '">');
    html.push('<div class="chat-item-user">');
      html.push('<img src="' + message.user.icon + '">');
    html.push('</div>');
    html.push('<div class="chat-item-content"><div>');
      if (message.type === 'text') {
        html.push(message.content);
      } else if (message.type === 'img') {
        html.push('<img onload="iScroller.refresh();iScroller.scrollTo(0, iScroller.maxScrollY, 200);" src="' + message.content + '" style="max-width: ' + this.maxImgWidth + 'px;"/>');
      } else {
        html.push('未知消息类型');
      }
    html.push('</div></div>');
  html.push('</div>');

  return html.join('');
};

Chatter.prototype.sendMessage = function(message) {
  this.dom.append(this._generateHtml(message));
  iScroller.refresh();
  iScroller.scrollTo(0, iScroller.maxScrollY, 200);
};


var chatter = new Chatter({
  dom: '#chatContent',
  maxImgWidth: $(window).width() - 120
});

$('#sendCamera').on('click', function() {
  chatter.sendMessage({
    type: 'img',
    content: 'http://n.sinaimg.cn/default/20151101/I7KR-fxkhcfq1025307.jpg',
    isMine: true, user: {icon: 'http://musicdata.baidu.com/data2/pic/115459298/115459298.jpg'}
  });
});

$('#sendText').on('click', function() {
  var text = $('#chatInput').val();
  if (text) {
    $('#chatInput').val('');
    chatter.sendMessage({
      type: 'text',
      content: text,
      isMine: true, user: {icon: 'http://musicdata.baidu.com/data2/pic/115459298/115459298.jpg'}
    });
  }
});

});