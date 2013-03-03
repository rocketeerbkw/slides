var octodex = (function($, window, undefined) {
  var $el, feed;
  var url = 'http://feeds.feedburner.com/Octocats';
  var numCats = 10;

  function rotate() {
    var cats = feed.entries;
    var cat = Math.floor(Math.random() * cats.length) + 1;
    var img = $(cats[cat].content).find('img').attr('src');
    $el.attr('src', img);
  }

  function parseRSS() {
    $.ajax({
      url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+numCats+'&callback=?&q=' + encodeURIComponent(url),
      dataType: 'json',
      success: function(data) {
        feed = data.responseData.feed;
        rotate();
        window.setInterval(rotate, 3000);
      }
    });
  }

  return {
    init: function(el, num) {
      $el = $(el);
      if (num) numCats = num;
      parseRSS();
    }
  }
})(jQuery, window);
