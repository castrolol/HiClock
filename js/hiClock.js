  (function() {

   

    function HiClock(hiClockElement) {
      var self = this;

      this.listeners = [];

      this.hour = null;
      this.min = null;
      this.hiClockElement = hiClockElement;
      this.inputElement = hiClockElement.querySelector("input");
      this.clockElement = hiClockElement.querySelector(".hi-clock-container");

      [].forEach.call(hiClockElement.classList, function(c){ 
        self.clockElement.classList.add(c);
      });

      this.init();

      this.setPart({
        type: "hour",
        value: 0
      });
      this.setPart({
        type: "min",
        value: 0
      });

    };

    HiClock.prototype.onshow = function(cb){
      this.listeners.push(cb);
    }

    HiClock.prototype.setPart = function(ctx) {
      this[ctx.type] = ctx.value;
      var texto = ("0" + ctx.value).substr(-2, 2);
      var timeElement = this.clockElement.querySelector(".h-time");
    
      timeElement.querySelector(".h-" + ctx.type).textContent = texto;
      this.inputElement.value = (""+timeElement.textContent).trim();
    
      var typeElement = this.clockElement.querySelector(".h-numbers.h-" + ctx.type);
      var active = typeElement.querySelector(".active");
    
      if( active ) active.classList.remove("active");
    
      [].forEach.call(typeElement.querySelectorAll(".el"), function(el){
        if( el.textContent == ctx.value) el.classList.add("active");
      });

    };

    HiClock.prototype.init = function() {
      var self = this;
     
      this.hiClockElement.removeChild(this.clockElement);
      document.body.appendChild(this.clockElement);

      this.clockElement.classList.remove("min");
      this.clockElement.classList.remove("hr");
      this.inputElement.addEventListener("click", function(){
        self.show();
      });

       var timeElement = this.clockElement.querySelector(".h-time");
       timeElement.querySelector(".h-min").addEventListener("click", function(){
          self.clockElement.classList.add("min");
          self.clockElement.classList.remove("hr");
       });

       timeElement.querySelector(".h-hour").addEventListener("click", function(){
          self.clockElement.classList.remove("min");
          self.clockElement.classList.add("hr");
       });

      this.clockElement.addEventListener("click", function(e) {
        if (e.target.classList.contains("el")) {
          var parentNode = e.target.parentNode;
          var ctx = {
            type: parentNode.classList.contains("h-min") ? "min" : "hour",
            value: +(e.target.textContent)
          };
          self.handleAction(ctx);
        }else if(e.target == self.clockElement){
          self.hide();
        }
      });

    }

    
    HiClock.prototype.setHour = function(v){
      this.setPart({
        type: "hour",
        value: v
      });
      return this;
    };

    
    HiClock.prototype.setMin = function(v){
      this.setPart({
        type: "min",
        value: v
      });
      return this;
    };

    HiClock.prototype.show = function() {

      var value = this.inputElement.value;
      var parts = null;
      if( parts = value.match(/(2[0-3]|[01][0-9]):([0-5][0-9])/))
      {
        this
          .setHour(parts[1])
          .setMin(parts[2]);
      }


      this.clockElement.classList.remove("min");
      this.clockElement.classList.add("show");
      setTimeout((function(){
        this.clockElement.classList.add("hr");

        this.listeners.forEach(function(cb){
          cb();
        });
      }).bind(this), 10);

    };

    HiClock.prototype.hide = function() {

      this.clockElement.classList.remove("hr");
      this.clockElement.classList.remove("min");
      setTimeout((function(){
        this.clockElement.classList.remove("show");
      }).bind(this), 200);
      
      

    };

    HiClock.prototype.handleAction = function(ctx) {

      if (ctx.type == "hour") {
        this.setPart(ctx);
        this.clockElement.classList.remove("hr");
        this.clockElement.classList.add("min");
        return;
      }

      if (ctx.type == "min") {
        this.setPart(ctx);
        this.hide();
      }

    };

    window.HiClock = HiClock;

  }()); 