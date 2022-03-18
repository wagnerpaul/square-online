var VolumeCalc = VolumeCalc || {};
VolumeCalc = {

	isPDP: function(){ 
		var NodeListLength = document.querySelectorAll('[data-block-purpose^="product-detail"]').length;
		return Boolean(NodeListLength);
	},

	buildForm: function(){
		this.form = document.createElement("form");
		this.form.setAttribute("name", "volcalc");
		this.form.setAttribute("class", "form");

		var dimensions = ['length','width', 'depth'];

		for (var i = 0; i < dimensions.length; i++) {
			var wrapper = document.createElement("div");
				wrapper.setAttribute("class", "input-group");

			var label = document.createElement("label");
				label.setAttribute("class", "field_name");
				label.innerHTML = "Enter " + dimensions[i] + " (Ft)";

			
			var input = document.createElement("input");
				input.setAttribute("class", "field");
				input.setAttribute("type", "text");
				input.setAttribute("name", dimensions[i]);
				input.setAttribute("aria-label", dimensions[i]);
				input.setAttribute("placeholder", dimensions[i]);
				input.setAttribute("class", "square__forms_input--2camv square__forms_border--3w5GS input-group__input");

				input.onkeyup = this.calc;
			

			// this.form.appendChild(label);
			wrapper.appendChild(input);
			this.form.appendChild(wrapper);
		}

		var label = document.createElement("label");
			label.setAttribute("class", "field_name");
			label.innerHTML = "Total yards needed";

		var input = document.createElement("input");
			input.setAttribute("class", "field_total");
			input.setAttribute("name", "vol");
			input.setAttribute("disabled", "disabled");
		
		this.form.appendChild(label);
		this.form.appendChild(input);

	},
	calc: function() {
	  //Hat tip: https://codepen.io/dwill/pen/WqwGeG
	  var l = this.form.length.value; //in feet
	  var w = this.form.width.value; //in feet
	  var d = this.form.depth.value; //in inches

	  l = l/3;
	  w = w/3;
	  d = d/36;

	  var v = l * w * d;

	  var v = Math.round( v * 2 ) / 2 ;

	  if (v == 0) v = "please enter width, depth and length"

	  this.form.vol.value = v;
	},
	buildContainers: function(){
			this.containers = document.createElement("div");
			this.containers.setAttribute("class", "w-block");

			// container content-align--center
			// 	w-container row
			// 		w-cell col
			// 			w-container row
			// 				w-cell col col-12 col-sm-8 col-md-6 offset-sm-2 offset-md-3
			// 					w-container col
			// 						w-cell row
			// 							form


			var tpl = "<div class=''>";
			wrapper.setAttribute("class", "container content-align--center");
			wrapper.appendChild(this.form);


			wrapper = wrapper.appendChild(this.form)
	},
	init: function(){

		if( this.isPDP() ) {
			this.buildForm();
			this.buildContainers();
			


			var footer = document.querySelector('[data-block-purpose^="footer"]')
			footer.prepend(this.containers);	
		}

	}
}

VolumeCalc.init();