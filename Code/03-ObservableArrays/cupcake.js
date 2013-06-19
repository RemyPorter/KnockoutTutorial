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
	var self = this;
	this.AddCake = function() { //this always points to the VM in the binding context
		this.Cupcakes.push(this.NewCake.Copy());
		this.NewCake.Clear();
	}
	this.BetterAddCake = function() { //which, in this case, is a cupcake
		self.Cupcakes.push(this.Copy());
		self.NewCake.Clear();
	}
}
var vm = new GlobalVM();