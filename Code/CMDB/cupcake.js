
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
	}

	this.previewTimeout = null;
	this.PreviewCake = function(cake) {
		if (self.previewTimeout) {
			clearTimeout(self.previewTimeout);
			self.previewTimeout = null;
		}
		self.ViewCake(cake);
	}

	this.StopPreview = function() {
		self.previewTimeout = setTimeout(function() {
			self.ViewCake(self.NewCake());
		}, 500);
	}
}
var vm = new GlobalVM();

ko.bindingHandlers.flavor = {
	update: function(element, valueAccessor, allBindingsAccessor) {
		var valueWrapped = valueAccessor(); var bindings = allBindingsAccessor();
		var value = ko.utils.unwrapObservable(valueWrapped);
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