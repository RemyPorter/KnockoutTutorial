
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
	this.CanAdd = ko.computed(function() { //here, we use a computed for validation
		return self.NewCake().CakeFlavor() &&
			self.NewCake().IcingFlavor() &&
			self.NewCake().Decoration()!=null; 
	});

	//and here's a derived property
	this.CupcakeCount = ko.computed(function() {
		return self.Cupcakes().length;
	})

	var self = this;
	this.AddCake = function() {
		self.Cupcakes.push(this.Copy());
		this.Clear();
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