$(document).ready( function() {

    var vid = $('#hero video')[0];

    vid.oncanplay = function() {

      $('main').addClass('fade-in');

      $(window)
      .on('scroll', scrollProgress);

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
          // else if(getDistanceToViewport($('#parts'))+150 > scrollDistance() && $('#parts').hasClass('active') == true){
          //   $('#parts').removeClass('active');
          // }

          if(getDistanceToViewport($('#scroll'))+triggerBuffer < scrollDistance() && $('#scroll').hasClass('active') == false){
            $('#scroll').addClass('active');
          }
          // else if(getDistanceToViewport($('#scroll')) > scrollDistance() && $('#scroll').hasClass('active') == true){
          //   $('#scroll').removeClass('active');
          // }

      };

      scrollProgress();


      function scrollPlay(){

        var frameNumber  = Math.floor(vid.duration);

        // Hero Video
        if(getDistanceToViewport($('#parts')) > scrollDistance()){
          var frameNumber  = scrollDistance()*Math.floor(vid.duration)/getDistanceToViewport($('#parts'));
        }

        vid.currentTime  = frameNumber;
        window.requestAnimationFrame(scrollPlay);

      }

      window.requestAnimationFrame(scrollPlay);

    };

    function scrollDistance(){
      return $(document).scrollTop();
    }
    function viewportHeight(){
      return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    }
    function getDistanceToViewport(element){
      return getPosition(element)-viewportHeight();
    }
    function getPosition(element) {
      element = element[0];
      var yPosition = 0;

      while(element) {
        yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
        element = element.offsetParent;
      }

      return yPosition;
    }
});
