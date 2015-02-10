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
      ngTime: '=',
      ngDate: '='
    },
    link: function(scope, element) {

      [].forEach.call(element, function(el) {

        var clock = new HiClock(el);
        clock.on("show", RegisterBackButton.bind(null, clock));
        var hasApplying = false;
        scope.$watch("ngTime", function( newValue, oldValue){
          if(hasApplying) return;
          clock.inputElement.value = newValue || "";  
        });

        scope.$watch("ngDate", function(newValue, oldValue){
          if(hasApplying) return;
          var date = newValue;
          clock
            .setHour(date.getHours(), true)
            .setMin(date.getMinutes(), true);  
        });
 
        clock.on("change" , function(){
          hasApplying = true;
          scope.ngTime = clock.getTime();
          scope.ngDate = clock.getDate();
          scope.$apply();
          hasApplying = false;
        });
        

      });

    }
  };
}