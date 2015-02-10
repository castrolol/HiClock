  (function() {

    function EventEmitter() {
      function execute(args, listener) {
        args = [].slice.call(args, 1);
        listener.apply(this, args);
      }

      var events = {};

      this.on = function(eventType, listener) {
        if (!events[eventType]) events[eventType] = [];
        events[eventType].push(listener);
      }

      this.off = function(eventType, listener) {
        if (!events[eventType]) return;
        var index = events[eventType].indexOf(listener);
        if (!~index) return;
        events[eventType].splice(index, 1);
      }

      this.emit = function(eventType) {
        if (!events[eventType]) return;
        events[eventType].forEach(execute.bind(this, arguments));
      }

    }

    function HiClock(hiClockElement) {

      EventEmitter.apply(this);

      this.hour = null;
      this.min = null;
      this.hiClockElement = hiClockElement;
      this.inputElement = hiClockElement.querySelector("input");
      this.clockElement = hiClockElement.querySelector(".hi-clock-container");


      [].forEach.call(hiClockElement.classList, (function(c) {
        this.clockElement.classList.add(c);
      }).bind(this));

      this.init();

    };

    HiClock.prototype.setInputValue = function(val) {
      this.inputElement.value = val;
      this.emit("change", value);
    }

    HiClock.prototype.setActive = function(ctx){

      var typeElement = this.clockElement.querySelector(".h-numbers.h-" + ctx.type);

      var active = typeElement.querySelector(".active");

      if (active) active.classList.remove("active");

      [].forEach.call(typeElement.querySelectorAll(".el"), function(el) {
        if (el.textContent == ctx.value) el.classList.add("active");
      });

    }

    HiClock.prototype.setPart = function(ctx) {

      this[ctx.type] = ctx.value;

      var text = ("0" + ctx.value).substr(-2, 2);

      var timeElement = this.clockElement.querySelector(".h-time");

      timeElement.querySelector(".h-" + ctx.type).textContent = text;

      this.setInputValue(timeElement.textContent.trim());

      this.setActive(ctx);

    };

    HiClock.prototype.init = function() {
      
      this.hiClockElement.removeChild(this.clockElement);
      document.body.appendChild(this.clockElement);

      this.clockElement.classList.remove("min");
      this.clockElement.classList.remove("hr");

      this.setInitialListeners();

      this
        .setHour(0)
        .setMin(0); 

    }

    HiClock.prototype.setInitialListeners = function() {

      this.inputElement.addEventListener("click", (function() {
        this.show();
      }).bind(this));

      var timeElement = this.clockElement.querySelector(".h-time");
      timeElement
        .querySelector(".h-min")
        .addEventListener("click", (function() {
          this.clockElement.classList.add("min");
          this.clockElement.classList.remove("hr");
        }).bind(this));

      timeElement
        .querySelector(".h-hour")
        .addEventListener("click", (function() {
          self.clockElement.classList.remove("min");
          self.clockElement.classList.add("hr");
        }).bind(this));

      this.clockElement.addEventListener("click", (function(e) {
        if (e.target.classList.contains("el")) {
          var parentNode = e.target.parentNode;
          var ctx = {
            type: parentNode.classList.contains("h-min") ? "min" : "hour",
            value: +(e.target.textContent)
          };
          this.handleAction(ctx);
        } else if (e.target == self.clockElement) {
          this.hide();
        }
      }).bind(this));


    };


    HiClock.prototype.setHour = function(v) {
      this.setPart({
        type: "hour",
        value: v
      });
      return this;
    };


    HiClock.prototype.setMin = function(v) {
      this.setPart({
        type: "min",
        value: v
      });
      return this;
    };

    HiClock.prototype.show = function() {

      var value = this.inputElement.value;
      var parts = null;
      if (parts = value.match(/(2[0-3]|[01][0-9]):([0-5][0-9])/)) {
        this
          .setHour(parts[1])
          .setMin(parts[2]);
      }


      this.clockElement.classList.remove("min");
      this.clockElement.classList.add("show");
      setTimeout((function() {
        this.clockElement.classList.add("hr");
        this.emit("show");
      }).bind(this), 10);

    };

    HiClock.prototype.hide = function() {

      this.clockElement.classList.remove("hr");
      this.clockElement.classList.remove("min");
      setTimeout((function() {
        this.clockElement.classList.remove("show");
        this.emit("hide");
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