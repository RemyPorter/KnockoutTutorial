
var CupcakesJSON = {
	cakes: [
		{Cake: "Chocolate", Icing: "Vanilla", Decoration: 1}
	]
}
var CupcakeVM = function()  {
	this.CakeFlavor = ko.observable(null);
	this.IcingFlavor = ko.observable(null);
	this.Decoration = ko.observable(null);
	this.Clear = function() {
		this.CakeFlavor(null);
		this.IcingFlavor(null);
		this.Decoration(null);
	}
	this.Copy = function() {
		var res = new CupcakeVM();
		res.CakeFlavor(this.CakeFlavor());
		res.IcingFlavor(this.IcingFlavor());
		res.Decoration(this.Decoration());
		return res;
	}
}
//Now our VM holds a list
var GlobalVM = function() {
	this.Flavors = ko.observableArray(["Chocolate", "Vanilla", "Red Velvet", "Peanut Butter", 
		"Bacon", "Sriracha"]);
	//Decorations will be a custom object
	this.Decorations = ko.observableArray([
		{Id: ko.observable(1), Name: ko.observable("Sprinkles"), tag: "sprinkles"}, //since these don't change, they don't technically need to be observables
		{Id: ko.observable(2), Name: ko.observable("Colored Sugar"), tag: "sugar"}, 
		{Id: ko.observable(3), Name: ko.observable("Bacon Bits"), tag: "bacon"}, 
		{Id: ko.observable(4), Name: ko.observable("Plastic Mustache"), tag: "mustache"}]);
	this.Cupcakes = ko.observableArray([]);
	this.NewCake = ko.observable(new CupcakeVM());
	this.ViewCake = ko.observable(this.NewCake());

	var self = this;
	//ko.computed sees that this depends on observables
	//when those observables change, this will get recalculated
	this.CanAdd = ko.computed(function() {
		return self.NewCake().CakeFlavor() &&
			self.NewCake().IcingFlavor() &&
			self.NewCake().Decoration()!=null; 
	});

	var self = this;
	this.AddCake = function() {
		self.Cupcakes.push(this.Copy());
		this.Clear();
	}

	this.RemoveCake = function(cake) {
		self.Cupcakes.splice(self.Cupcakes.indexOf(cake), 1);
		self.StopPreview();
	}

	this.LoadJSON = function(json) {
		this.Cupcakes(
			ko.utils.arrayMap(json.cakes, function(c) {
				var cake = new CupcakeVM();
				cake.CakeFlavor(c.Cake);
				cake.IcingFlavor(c.Icing);
				cake.Decoration(self.Decorations()[c.Decoration - 1]);
				return cake;
			})
		);
	}
}
var vm = new GlobalVM();
vm.LoadJSON(CupcakesJSON);

ko.bindingHandlers.flavor = {
	init: function(element) {
		//we're using this binding to control what image is displayed
		//make sure it's actually applied to an image!
		if (! element.nodeName == "IMG") {
			throw "This binding only applies to images."
		}
	},
	/* 
		element: the DOM element this is bound to.
		valueAccessor: a function which returns the observable or the underlying value
		allbindingsAccessor: a function which returns ALL binding keywords applied to this DOM element

		You can use allBindingsAccessor to set up extra parameters, or even manipulate
		the behavior of other KnockoutBindings
	*/
	update: function(element, valueAccessor, allBindingsAccessor) {
		var valueWrapped = valueAccessor(); var bindings = allBindingsAccessor();
		var value = ko.utils.unwrapObservable(valueWrapped); //this may or may not be an observable, so let's unwrap it
		//note: here we expect other binding parameters
		//when we apply this binding, it should look like this:
		// data-bind="flavor: flavorProp, type: 'icing'""
		var imageRoot = bindings.imageRoot || "../Images/";
		var imageType = bindings.type || "cake";
		if (value) {
			var imageUrl = imageRoot + imageType + '.' + value.toLowerCase() + '.png';
			element.src = imageUrl.replace(' ', '');
		} else {
			element.src = imageRoot + "transparent.gif"
		}
	}
}

ko.bindingHandlers.decoration = {
	init: function(element) {
		if (! element.nodeName == "IMG") {
			throw "This binding only applies to images."
		}
	},
	update: function(element, valueAccessor, allBindingsAccessor) {
		var deco = ko.utils.unwrapObservable(valueAccessor());
		var bindings = allBindingsAccessor();
		var imageRoot = bindings.imageRoot || "../Images/";
		if (deco) {
			var imageUrl = imageRoot + "deco." + deco.tag + ".png";
			element.src = imageUrl.replace(' ', '');
		}  else {
			element.src = imageRoot + "transparent.gif"
		}
	}
}