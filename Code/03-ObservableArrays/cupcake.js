var CupcakeVM = function()  {
	this.CakeFlavor = ko.observable("");
	this.IcingFlavor = ko.observable("");
	this.Decoration = ko.observable("");
}
//Now our VM holds a list
var GlobalVM = function() {
	this.Cupcakes = ko.observableArray([]);
	this.NewCake = new CupcakeVM();
	this.AddCake = function() {
		this.Cupcakes.push(this.NewCake);
		this.NewCake = new CupcakeVM();
	}
}
var vm = new GlobalVM();