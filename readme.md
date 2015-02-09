# HiClock - A simple timepicker

HiClock é um simples timepicker criado puramente com html, css e js.


  - VanillaJS
  - It's easy-to-use in your usual framework
  - Awesome UX

To use it is necessary to reference the js and css the component and include the places where you will need the html component.

and call the following code.

```js
   var containerClass = ".hi-clock-container"
   var hiClockList = document.querySelecto(containerClass);
   new HiClock(hiClockList[i]);

```
or if you use in multiples places of your html
```js
  //use in all hi-clock elements
   var containerClass = ".hi-clock-container"
   var hiClockList = document.querySelectorAll(containerClass);
   for(var i = 0; i < hiClockList.length; i++){
        new HiClock(hiClockList[i]);
   }
```
#JQuery

if you use JQuery
```js

    $(".hi-clock-container").each(function(){
        new HiClock(this);
    });
```

#Angular Directive

if you use Angular, can download the hi-clock directive  ([hiClockDirective.js])

(it is necessary to put the html file in the templates folder)

```js
    module.directive("hiClock", HiClockDirective);
```

and will use 

```html
    <hi-clock></hi-clock>
```

can be used in Ionic (with backbutton helper)
use the [hiClockDirective.ionic.js] instead of [hiClockDirective.js]





[hiClockDirective.ionic.js]:https://github.com/castrolol/HiClock/blob/master/angular/hiClockDirective.ionic.js
[hiClockDirective.js]:https://github.com/castrolol/HiClock/blob/master/angular/hiClockDirective.js
