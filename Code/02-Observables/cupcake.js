var Cupcake = {
	CakeFlavor :"Chocolate",
	IcingFlavor: "Vanilla",
	Decoration :"Plain"
}
//Getting a little more object-oriented, let's construct a VM for a single cupcake
var CupcakeVM = function(cupcake)  {
	this.CakeFlavor = ko.observable(cupcake.CakeFlavor);
	this.IcingFlavor = ko.observable(cupcake.IcingFlavor);
	this.Decoration = ko.observable(cupcake.Decoration);
}
//And let's add a VM for the entire screen
var GlobalVM = function() {
	this.Cupcake = new CupcakeVM(Cupcake);
	var self = this;
	this.ChangeCakeFlavor = function() {
		if (self.Cupcake.CakeFlavor() == "Chocolate") {
			self.Cupcake.CakeFlavor("Vanilla");
		} else {
			self.Cupcake.CakeFlavor("Chocolate");
		}
	}
}
var vm = new GlobalVM();