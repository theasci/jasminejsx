describe('SpecLength', function() {
	describe('jasmine-2.6.4', function(){
		// <32 its does not output final suite stats if using asyncronous tests
		for (var i = 1; i <= 32; i++) {
			eval('it("it'+i+'",function(){ pending(); })');
		}

		//<19 describes does not output final suite stats if using asyncronous tests
		for (var i = 1; i <= 19; i++) {
			eval('describe("describe'+i+'", function(){ it("it'+i+'",function(){ pending(); }) })');
		}
	});
});
