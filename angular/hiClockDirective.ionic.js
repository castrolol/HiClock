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
        var itsApplying = false;
        scope.$watch("ngTime", function( newValue, oldValue){
          if(itsApplying) return;
          clock.inputElement.value = newValue || "";  
        });
        
        scope.$watch("ngDate", function(newValue, oldValue){
          if(itsApplying) return;
          var date = newValue;
          if( date && date instanceof Date ){
             clock
               .setHour(date.getHours(), true)
               .setMin(date.getMinutes(), true);  
          }else{
              clock.inputElement.value = "";
          }
        });
        
        setTimeout(function(){
          clock.on("change" , function(){
             scope.ngTime = clock.getTime();
             scope.ngDate = clock.getDate();
             itsApplying = true;
             scope.$apply();
             itsApplying = false;
          });
        },100);
        

      });

    }
  };
}
