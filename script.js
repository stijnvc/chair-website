$(document).ready( function() {

  var loaderFadeIn = setTimeout(function(){  $('.loader').addClass('fade-in'); }, 2500);
  $('#video').addClass('fade-in');

  var canvas = document.getElementById('video');
  var ctx = canvas.getContext('2d');
  var scale = 2;

  var preload = [];
  var frames = [];
  //var frame = 0;

  var image = new Image();
  image.src = 'video/placeholder.png';
  image.onload = function(){
    drawImage(image);
    window.requestAnimationFrame(function placeholder(){
      drawImage(image);
      window.requestAnimationFrame(placeholder);
    });
  };

  // function preload() {
  //   var image = new Image();
  //   //image.crossOrigin = "Anonymous";
  //   image.src = 'video/frames/frame' + pad(frame) + '.jpg';
  //   frames.push(image);
  //   if(frame < 36){
  //     frame = frame+1;
  //     image.onload = preload;
  //   }else{
  //     image.onload = init;
  //   }
  // }
  // preload();

  for (var frame = 0; frame < 37; frame++) {
    preload.push('video/frames/frame' + pad(frame) + '.jpg');
  }
  var promises = [];
  for (var i = 0; i < preload.length; i++) {
      (function(url, promise) {
          var img = new Image();
          img.onload = function() {
            promise.resolve();
          };
          img.src = url;
          frames[i] = img;
      })(preload[i], promises[i] = $.Deferred());
  }
  $.when.apply($, promises).done(function() {
    init();
  });

  function init() {
    window.requestAnimationFrame(scrollPlay);
    clearTimeout(loaderFadeIn);
    $('.loader').removeClass('fade-in');
    $('main').addClass('fade-in');
  }

  function drawImage(image) {
    var vw = viewportWidth();
    var vh = viewportHeight();
    var imageW = image.naturalWidth;
    var imageH = image.naturalHeight;
    var w = imageW;
    var h = imageH;
    h = vh;
    w = vh*(imageW/imageH);

    canvas.width = w*scale;
    canvas.height = h*scale;
    ctx.scale(scale, scale);
    ctx.drawImage(image, 0, 0, w, h);
  }

  function scrollPlay(){

    var triggerBuffer = viewportHeight()/3;
    // Hero video parent element position
    if($('#hero').height()-viewportHeight() < scrollDistance() && $('#hero').hasClass('absolute') == false){
      $('#hero').addClass('absolute');
    }else if($('#hero').height()-viewportHeight() > scrollDistance() && $('#hero').hasClass('absolute') == true){
      $('#hero').removeClass('absolute');
    }


    var frameNumber  = 36;
    if($('#hero').height()-viewportHeight()+150 > scrollDistance()){
      var frameNumber  = Math.max(0, Math.round(scrollDistance()*frameNumber/($('#hero').height()-viewportHeight()+150)));
    }

    drawImage(frames[frameNumber]);

    window.requestAnimationFrame(scrollPlay);

  }

  function pad(n) {
    var s = "000" + n;
    return s.substr(s.length-4);
  }
  function scrollDistance(){
    return $(document).scrollTop();
  }
  function viewportHeight(){
    //return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    //return window.innerHeight;
    return $('#size-reference').height();
  }
  function viewportWidth(){
  //return $('#size-reference').width();
    return $( window ).width();
  }
  function getDistanceToViewport(element){
    return getPosition(element)-viewportHeight();
  }
  function getPosition(element) {
    // element = element[0];
    // var yPosition = 0;
    //
    // while(element) {
    //   yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
    //   element = element.offsetParent;
    // }

    var yPosition = element.offset().top;
    return yPosition;
  }

});
