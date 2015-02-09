function HiClockDirective($ionicPlatform) {

  function RegisterBackButton(clock) { 

    var desregister = $ionicPlatform.registerBackButtonAction(function(e) {

      desregister();

      clock.hide();

      e.preventDefault();
  
      return false;

    }, 999);

  }

  return {
    restrict: 'E',
    templateUrl: 'templates/hi-clock.html',
    link: function(scope, element) {

      [].forEach.call(element, function(el) {
        var clock = new HiClock(el);
        var desregister = null;

        clock.onshow(RegisterBackButton.bind(null, clock));

      });

    }
  };
}