(function(jQuery){

	var htmlTemplate = '<input type="text" readonly="readonly" class="" /><div class="hi-clock-container">  <div class="hi-clock hr" >    <h1 class="h-title ">Selecione a Hora</h1>     <h1 class="h-time">      <span class="h-hour">00</span>:<span class="h-min">00</span>    </h1>    <div class="h-clock-e">      <div class="h-numbers h-min">          <span class="el i-0 h-2-dig">0</span>          <span class="el i-1 ">5</span>             <span class="el i-2  h-2-dig">10</span>             <span class="el i-3  h-2-dig">15</span>           <span class="el i-4 h-2-dig">20</span>             <span class="el i-5 h-2-dig">25</span>            <span class="el i-6 h-2-dig">30</span>           <span class="el i-7 h-2-dig">35</span>             <span class="el i-8 h-2-dig">40</span>          <span class="el i-9 h-2-dig">45</span>                   <span class="el i-10 h-2-dig">50</span>          <span class="el i-11 h-2-dig">55</span>           </div>      \
      <div class="h-numbers h-hour"> <span class="el i-0 ">12</span><span class="el i-1">1</span>   <span class="el i-2">2</span>           <span class="el i-3">3</span>                 <span class="el i-4">4</span>           <span class="el i-5">5</span>          <span class="el i-6">6</span>                 <span class="el i-7">7</span>           <span class="el i-8">8</span>        <span class="el i-9">9</span>        <span class="el i-10 h-2-dig">10</span>           <span class="el i-11 h-2-dig">11</span>        <div class="h-inner-clock">          <span class="el i-0 h-2-dig">0</span>          <span class="el i-1  h-2-dig">13</span>             <span class="el i-2  h-2-dig">14</span>             <span class="el i-3  h-2-dig">15</span>           <span class="el i-4 h-2-dig">16</span>             <span class="el i-5 h-2-dig">17</span>            <span class="el i-6 h-2-dig">18</span>           <span class="el i-7 h-2-dig">19</span> \
                   <span class="el i-8 h-2-dig">20</span>           <span class="el i-9 h-2-dig">21</span>          <span class="el i-10 h-2-dig">22</span>             <span class="el i-11 h-2-dig">23</span>        </div>          </div>    </div>     </div></div>';

	jQuery.fn.hiClock = function(value){

		function emit(el, event, params){
			return function(){ $(el).trigger(event, params); };
		}

		this.each(function(){

			var clock = null;
			if(clock = $(this).data("clock")){
				if(value instanceof Date){

					clock
						.setHour(value.getHours(), true)
						.setMin(value.getMinutes(), true);  
				}else{
					clock.inputElement.value = value;
				}

				return;
			}

			$(this).empty();
			$(this).append($(htmlTemplate));
	 
			clock = new HiClock(this);
			clock.on("change", emit(this, "change", [this]));
			clock.on("show", emit(this, "show", [this]));
			clock.on("hide", emit(this, "hide", [this]));
			$(this).data("clock", clock);

		});

		return this;
	};

}($));