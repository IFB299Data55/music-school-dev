(function(app) {
  app.ViewAllInstrumentsComponent =
    ng.core.Component({
      selector: 'all-instruments' ,
      templateUrl: localPath+'views/viewAllInstruments.component.ejs',
      styleUrls: ['../../..'+localPath+'css/viewAllInstruments.component.css']
    })
    .Class({
      constructor: [
        app.ReturnInstrumentsService,
        ng.router.Router,
	      function(ReturnInstrumentsService, Router) {
          this.ReturnInstrumentsService = ReturnInstrumentsService;
          this.Router = Router;
          
          this.instruments = ['asdfasdf'];

          this.GetInstruments = function() {
            this.ReturnInstrumentsService.GetInstruments()
              .then(response => {
                if (!response.error) {
                  this.instruments = response.instruments;
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later';
            });
          }

          this.SelectInstrument = function(instrumentID) {
            // select the student
          }
	      }
      ]
    });
})(window.app || (window.app = {}));