function HiClockDirective($ionicPlatform){
   
  return {
    restrict: 'E',
    templateUrl: 'templates/hi-clock.html', //set the template URL
    link: function (scope, element) {

      [].forEach.call(element,function(el){
        var clock = new HiClock(el);
      });
    }
  };
}