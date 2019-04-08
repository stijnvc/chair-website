$(document).ready( function() {
  var frames = [];
  var frame = 0;
  function preload() {
    var image = new Image();
    //image.crossOrigin = "Anonymous";
    image.src = 'video/frames/frame' + pad(frame) + '.jpg';
    frames.push(image);
    if(frame < 45){
      frame = frame+1;
      image.onload = preload;
    }else{
      image.onload = init;
    }
  }
  preload();
  function init() {
    window.requestAnimationFrame(scrollPlay);

  }

  $('main').addClass('fade-in');

  // Get video properties
  var frameNumber = 0;

  function scrollProgress() {

      var triggerBuffer = viewportHeight()/3;
      // Hero video parent element position
      if(getDistanceToViewport($('#parts')) < scrollDistance() && $('#hero').hasClass('absolute') == false){
        $('#hero').addClass('absolute');
      }else if(getDistanceToViewport($('#parts')) > scrollDistance() && $('#hero').hasClass('absolute') == true){
        $('#hero').removeClass('absolute');
      }

      if(getDistanceToViewport($('#parts'))+triggerBuffer < scrollDistance() && $('#parts').hasClass('active') == false){
        $('#parts').addClass('active');
      }
      else if(getDistanceToViewport($('#parts'))-triggerBuffer > scrollDistance() && $('#parts').hasClass('active') == true){
        $('#parts').removeClass('active');
      }

      if(getDistanceToViewport($('#scroll'))+triggerBuffer < scrollDistance() && $('#scroll').hasClass('active') == false){
        $('#scroll').addClass('active');
      }
      else if(getDistanceToViewport($('#scroll'))-triggerBuffer > scrollDistance() && $('#scroll').hasClass('active') == true){
        $('#scroll').removeClass('active');
      }
      window.requestAnimationFrame(scrollProgress);

  };

  window.requestAnimationFrame(scrollProgress);

  var canvas = document.getElementById('video');
  var ctx = canvas.getContext('2d');
  var scale = 2;

  function drawImage(image) {
    var vw = viewportWidth();
    var vh = viewportHeight();
    var imageW = image.naturalWidth;
    var imageH = image.naturalHeight;
    var w = imageW;
    var h = imageH;
    if (imageW/imageH >= vw/vh){
      h = vh;
      w = vh*(imageW/imageH);
    }else{
      w = vw;
      h = vw*(imageH/imageW);
    }
    canvas.width = w*scale;
    canvas.height = h*scale;
    // canvas.style.width = w+"px";
    // canvas.style.height = h+"px";
    console.log(h+"px");
    ctx.scale(scale, scale);
    ctx.drawImage(image, 0, 0, w, h);
  }

  function scrollPlay(){

    var frameNumber  = 45;
    if(getDistanceToViewport($('#parts')) > scrollDistance()){
      var frameNumber  = Math.round(scrollDistance()*frameNumber/getDistanceToViewport($('#parts')));
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
    return window.innerHeight;
  }
  function viewportWidth(){
    return window.innerWidth;
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
