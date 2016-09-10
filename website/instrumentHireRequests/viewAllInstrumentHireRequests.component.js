(function(app) {
  app.ViewAllInstrumentHireRequestsComponent =
    ng.core.Component({
      selector: 'all-instrument-hire-requests' ,
      templateUrl: localPath+'views/viewAllInstrumentHireRequests.component.ejs',
      styleUrls: ['../../..'+localPath+'css/viewAllInstrumentHireRequests.component.css']
    })
    .Class({
      constructor: [
        app.InstrumentHireRequestsService,
        ng.router.Router,
	      function(InstrumentHireRequestsService, Router) {
          this.InstrumentHireRequestsService = InstrumentHireRequestsService;
          this.Router = Router;
          
          this.instrumentHireRequests = ['asdfasdf'];

          this.GetInstrumentHireRequests = function() {
            this.InstrumentHireRequestsService.GetInstrumentHireRequests()
              .then(response => {
                if (!response.error) {
                  this.instrumentHireRequests = response.instrumentHireRequests;
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later';
            });
          }

          this.SelectInstrumentHireRequest = function(requestID) {
            // select the student
          }
	      }
      ]
    });
})(window.app || (window.app = {}));