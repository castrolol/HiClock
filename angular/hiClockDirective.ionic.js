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
    scope: {
      ngTime: '='
    }
    link: function(scope, element) {

      [].forEach.call(element, function(el) {

        var clock = new HiClock(el);
        clock.on("show", RegisterBackButton.bind(null, clock));

        scope.$watch("ngTime", function(oldValue, newValue){
          clock.inputElement.value = newValue;  
        });

        clock.on("change" , function(){
          scope.ngTime = clock.getTime();
          scope.$apply();
        });

      });

    }
  };
}