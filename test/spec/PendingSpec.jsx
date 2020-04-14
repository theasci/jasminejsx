describe('Pending', function() {
	var originalReportPending = null;
	
	beforeAll(function(){
		originalReportPending = Global.jasminejsx.reportPending;
	});
	
	afterAll(function(){
		Global.jasminejsx.reportPending = originalReportPending;
	});
	
	describe('reportPending', function(){
		describe('enabled', function(){
			it('displays the message', function(){
				Global.jasminejsx.reportPending = true;
				pending('this message is shown');
			});
			
			it('displays "Pending" with no message given', function(){
				Global.jasminejsx.reportPending = true;
				pending();
			});
		});
		
		describe('disabled', function(){
			it('displays nothing but still shows up in the pending count', function(){
				Global.jasminejsx.reportPending = false;
				pending('this message is not shown');
			});
		});
	});
});
