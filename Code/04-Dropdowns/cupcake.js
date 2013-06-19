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
	this.Decorations = ko.observableArray(["Sprinkles", "Chocolate Syrup", "Colored Sugar", "Bacon Bits", "Sriracha", "Plastic Mustache"]);
	this.Cupcakes = ko.observableArray([]);
	this.NewCake = new CupcakeVM();
	var self = this;
	this.AddCake = function() {
		self.Cupcakes.push(this.Copy());
		this.Clear();
	}
}
var vm = new GlobalVM();