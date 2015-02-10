(function(jQuery){

	jQuery.fn.hiClock = function(){

		function emit(el, event, params){
			return function(){ $(el).trigger(event, params); };
		}

		this.each(function(){
			var clock = new Clock(this);
			clock.on("change", emit(this, "change", [this]));
			clock.on("show", emit(this, "show", [this]));
			clock.on("hide", emit(this, "hide", [this]));
		});

		return this;
	};

}($));