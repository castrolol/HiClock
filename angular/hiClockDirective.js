function HiClockDirective(){
   
  return {
    restrict: 'E',
    templateUrl: 'templates/hi-clock.html', //set the template URL
    scope: {
      'ngTime' : '=',
      'ngDate' : '='
    },
    link: function (scope, element) {

      [].forEach.call(element,function(el){
        var clock = new HiClock(el);

        scope.$watch("ngTime", function( newValue, oldValue){
          clock.inputElement.value = newValue || "";  
        });

        scope.$watch("ngDate", function(newValue, oldValue){
          var date = newValue;
          clock
            .setHour(date.getHours(), true)
            .setMin(date.getMinutes(), true);  
        });
 
        clock.on("change" , function(){
          scope.ngTime = clock.getTime();
          scope.ngDate = clock.getDate();
          scope.$apply();
        });
        
      });
    }
  };
}
