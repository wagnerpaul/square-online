/*
Cool Example
http://nwlandscapesupply.com/products/cedar-play-chips/
 */

var VolumeCalc = VolumeCalc || {};

VolumeCalc = {

	isPDP: function(){ 
		var NodeListLength = document.querySelectorAll('[data-block-purpose^="product-detail"]').length;
		return Boolean(NodeListLength);
	},
	hasFooter: function(){ 
		var NodeListLength = document.querySelector('[data-block-purpose^="footer"]').length;
		return Boolean(NodeListLength);
	},
	isAllowed: function(){ 
		//future blacklist here
		return true;
	},
	alreadyExistsInDOM: function(){
		var exists = document.getElementsByClassName("container-volcalc");
		return Boolean(exists.length);
	},
	opening: "<h1>Construction Materials Calculator</h1><p>With this calculator you can quickly determine how much mulch, stone, or soil you will need for your project.</p>",
	buildForm: function(){
		this.form = document.createElement("form");
		this.form.setAttribute("name", "volcalc");
		this.form.setAttribute("class", "form");

		var dimensions = [
				{name: 'Length', unit: 'Ft'},
				{name: 'Width', unit: 'Ft'},
				{name: 'Depth', unit: 'In'}
			];

		for (var i = 0; i < dimensions.length; i++) {

			var wrapper = document.createElement("div");
				wrapper.setAttribute("class", "input-group col col-6  offset-3");

			var label = document.createElement("label");
				label.setAttribute("class", "field_name");
				label.innerHTML = "Enter " + dimensions[i].name + " (" + dimensions[i].unit + ")";

			
			var input = document.createElement("input");
				input.setAttribute("class", "field");
				input.setAttribute("type", "text");
				input.setAttribute("name", dimensions[i].name.toLowerCase());
				input.setAttribute("aria-label", dimensions[i].name.toLowerCase());
				input.setAttribute("inputmode", "numeric"); //hack for android numeric keyboad
				input.setAttribute("pattern", "[0-9]*"); //hack for ios numeric keyboad
				// input.setAttribute("placeholder", dimensions[i]);
				input.setAttribute("class", "square__forms_input--2camv square__forms_border--3w5GS input-group__input");

				input.oninput = this.calc;
			

			wrapper.appendChild(label);
			wrapper.appendChild(input);
			this.form.appendChild(wrapper);
		}

		var wrapper = document.createElement("div");
			wrapper.setAttribute("class", "input-group col col-6  offset-3");

		var label = document.createElement("label");
			label.setAttribute("class", "field_name");
			label.innerHTML = "Total yards needed";

		var input = document.createElement("input");
			input.setAttribute("class", "field_total");
			input.setAttribute("name", "vol");
			input.setAttribute("disabled", "disabled");
		
		wrapper.appendChild(label);
		wrapper.appendChild(input);
		this.form.appendChild(wrapper);

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

	  /**
	   * round to two decimal places
	   * hat tip: https://www.delftstack.com/howto/javascript/javascript-round-to-2-decimal-places/
	   */
	  var v = +(Math.round(v + "e+2")  + "e-2")

	  this.form.vol.value = v;
	},
	buildFormAndContainers: function(){

			this.buildForm();

			var divClasses = [
				'w-block',
					'container content-align--center',
						'w-container row',
							'w-cell col',
								'w-container row',
									'w-cell col col-10 offset-1',
										'w-container col',
											'w-cell row container-volcalc'
				]

			var outerDiv = null;	
			for (var i = divClasses.length - 1; i >= 0; i--) {
				var currentDiv = document.createElement("div");
					currentDiv.setAttribute("class", divClasses[i]);

                 if (i == divClasses.length - 1) {
                 	currentDiv.innerHTML =this.opening;
                 	currentDiv.appendChild(this.form)
             	} else {
             		currentDiv.appendChild(outerDiv)
             	};
				 outerDiv = currentDiv;  
			}
			this.formAndContainers = outerDiv;
	},
	injectStyles: function(){
		//console.log('injectStyles');
		var styleTag = document.createElement('style');
		var rules  = '.container-volcalc { max-width: 600px; margin: 3em auto 0;}';
			rules += '.container-volcalc h1, .container-volcalc p {width: 100%; margin-bottom: 1.75em; text-align: center}';
			rules += '.container-volcalc h1 {font-size: 2em; margin-bottom: .5em;}';
			rules += '.container-volcalc form {width: 100%}';
			rules += '.container-volcalc .input-group {width: 100%; text-align:center; margin-bottom: 1.75em}';
			rules += '.container-volcalc label {margin-bottom: 0.75em; display: block; font-size: 1.5em; font-weight: 700}'
			rules += '.container-volcalc input {width: 100px; text-align:center; padding: 14px; margin-bottom: 0.5em;}';
			rules += '.container-volcalc input.field_total {font-weight: 700; font-size: 1.5em; color: #333; opacity: 1;}';


		styleTag.textContent = rules;
		document.head.append(styleTag);
	},
	
	injectFormAndContainers: function(){
		//console.log('injectFormAndContainers');
		//bail if it already exists
		if (this.alreadyExistsInDOM()) return;
	
		//always clear any previous setInterval function before starting a new one
		if (this.attemptInterval) {
			//console.log('pre clearing')
			clearInterval(this.attemptInterval);
		}
		

		//janky sniffing for app elements to load
		this.counter = 0;
		this.attemptInterval  = setInterval(function() {
			//console.log(this.counter);
			
			if (this.alreadyExistsInDOM()) {
				//console.log('in dom');
				clearInterval(this.attemptInterval);
				return;
			}
			//console.log('not in dom');

			if  ( 	this.isPDP() && 
					this.hasFooter && 
					this.isAllowed() 
				) {
					
					this.buildFormAndContainers();

					var footer = document.querySelector('[data-block-purpose^="footer"]')
					footer.prepend(this.formAndContainers);
					//console.log('clearing attempt');
					clearInterval(this.attemptInterval);
			} 

			if (this.counter >= 20) {
				//console.log('clearing attempt failsafe');
				clearInterval(this.attemptInterval);
			}

			this.counter = this.counter + 1;

		}.bind(this), 100);

			

	},
	bindUrlChanges: function() {
		//console.log('bindUrlChanges');
		var self = this;
		var lastUrl = location.href; 
		new MutationObserver( function(){
		  var url = location.href;
		  if (url !== lastUrl) {
		    lastUrl = url;
		    onUrlChange();
		  }
		}).observe(document, {subtree: true, childList: true});
		 
		 
		function onUrlChange() {
			
		  self.injectFormAndContainers();
		}

	},
	init: function(){
		//console.log('init');
		//only bind url changes and inject styles once
		VolumeCalc.injectStyles();
		VolumeCalc.bindUrlChanges();
		

		//kick off init on very first page load
		VolumeCalc.injectFormAndContainers();

	}




}

//console.log('kickoff');
//kick off init on very first page load
VolumeCalc.init();
