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
          
          this.instruments = [];

          this.GetInstruments = function() {
            this.ReturnInstrumentsService.GetInstruments()
              .then(response => {
                if (!response.error) {
                  this.instruments = response.instruments;
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(err => {
                console.log(err);
                this.error = 'An error has occured. Please try again later';
            });
          }

          this.SelectInstrument = function(instrumentID) {
            var link = ['/individual', instrumentID];
            this.Router.navigate(link);
          }
	      }
      ]
    });
    app.ViewAllInstrumentsComponent.prototype.ngOnInit = function() {
      this.GetInstruments();
    };
})(window.app || (window.app = {}));