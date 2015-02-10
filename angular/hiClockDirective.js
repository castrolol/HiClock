function HiClockDirective(){
   
  return {
    restrict: 'E',
    templateUrl: 'templates/hi-clock.html', //set the template URL
    scope: {
      'ngTime' : '='
    },
    link: function (scope, element) {

      [].forEach.call(element,function(el){
        var clock = new HiClock(el);
        scope.$watch("ngTime", function(oldValue, newValue){
          clock.inputElement.value = newValue;  
        })
        clock.on("change" , function(){
          scope.ngTime = clock.getTime();
          scope.$apply();
        });
      });
    }
  };
}
