
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
		{Id: ko.observable(1), Name: ko.observable("Sprinkles")}, //since these don't change, they don't technically need to be observables
		{Id: ko.observable(2), Name: ko.observable("Chocolate Syrup")}, 
		{Id: ko.observable(3), Name: ko.observable("Colored Sugar")}, 
		{Id: ko.observable(4), Name: ko.observable("Bacon Bits")}, 
		{Id: ko.observable(5), Name: ko.observable("Sriracha")}, 
		{Id: ko.observable(6), Name: ko.observable("Plastic Mustache")}]);
	this.Cupcakes = ko.observableArray([]);
	this.NewCake = ko.observable(new CupcakeVM());

	this.ImagifyIcing = function(flavor) {
		if (! flavor) { return "..Images/transparent.gif"; }
		return "../Images/icing." + flavor.toLowerCase().replace(' ', '') + '.png';
	}

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
		}
	}
}