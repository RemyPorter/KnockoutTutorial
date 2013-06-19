var CupcakeVM = function()  {
	this.CakeFlavor = ko.observable("");
	this.IcingFlavor = ko.observable("");
	this.Decoration = ko.observable("");
	this.Clear = function() {
		this.CakeFlavor("");
		this.IcingFlavor("");
		this.Decoration("");
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
	this.Flavors = ko.observableArray(["Chocolate", "Vanilla", "Red Velvet", "Peanut Butter", "Bacon", "Sriracha"]);
	//Decorations will be a custom object
	this.Decorations = ko.observableArray([
		{Id: ko.observable(1), Name: ko.observable("Sprinkles")}, //since these don't change, they don't technically need to be observables
		{Id: ko.observable(2), Name: ko.observable("Chocolate Syrup")}, 
		{Id: ko.observable(3), Name: ko.observable("Colored Sugar")}, 
		{Id: ko.observable(4), Name: ko.observable("Bacon Bits")}, 
		{Id: ko.observable(5), Name: ko.observable("Sriracha")}, 
			{Id: ko.observable(6), Name: ko.observable("Plastic Mustache")}]);
	this.Cupcakes = ko.observableArray([]);
	this.NewCake = new CupcakeVM();
	var self = this;
	this.AddCake = function() {
		self.Cupcakes.push(this.Copy());
		this.Clear();
	}
}
var vm = new GlobalVM();