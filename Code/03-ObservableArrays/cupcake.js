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
	this.Cupcakes = ko.observableArray([]);
	this.NewCake = new CupcakeVM();
	this.AddCake = function() {
		this.Cupcakes.push(this.NewCake.Copy());
		this.NewCake.Clear();
	}
}
var vm = new GlobalVM();