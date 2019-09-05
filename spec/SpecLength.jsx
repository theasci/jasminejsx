describe('SpecLength', function() {
	describe('jasmine-2.2.0', function(){
		//30 works but 31 does not
		for (var i = 1; i <= 31; i++) {
			eval('it("it'+i+'",function(){ fail(); })');
		}
	});
	// describe('jasmine-2.3.4', function(){
	// 	//31 its works, but 32 does not
	// 	for (var i = 1; i <= 32; i++) {
	// 		eval('it("it'+i+'",function(){ fail(); })');
	// 	}
	// });
	// describe('jasmine-2.5.2', function(){
	// 	// 31 its works, but 32 does not
	// 	for (var i = 1; i <= 32; i++) {
	// 		eval('it("it'+i+'",function(){ fail(); })');
	// 	}
	//
	// 	//16 describes works, but 17 does not
	// 	for (var i = 1; i <= 16; i++) {
	// 		eval('describe("describe'+i+'", function(){ it("it'+i+'",function(){ fail(); }) })');
	// 	}
	// });
	// describe('jasmine-2.6.4', function(){
	// 	//18 its works, but 19 does not
	// 	for (var i = 1; i <= 18; i++) {
	// 		eval('it("it'+i+'",function(){ fail(); })');
	// 	}
	// });
});
