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
          this.filteredInstruments = [];
          this.filterText = '';

          this.GetInstruments = function() {
            this.ReturnInstrumentsService.GetInstruments()
              .then(response => {
                if (!response.error) {
                  this.instruments = response.instruments;
                  this.filteredInstruments = this.instruments;
                  this.Filter('');
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

          this.Filter = function() {
            this.filteredInstruments = [];
            filterString = new RegExp(this.filterText, "gi");
            for (var i = 0; i < this.instruments.length; i++) {
              var instrument = this.instruments[i];
              var name = instrument.firstname+" "+instrument.lastname;
              if (name.match(filterString)) {
                this.filteredInstruments.push(instrument);
              }
            }
          }

	      }
      ]
    });
    app.ViewAllInstrumentsComponent.prototype.ngOnInit = function() {
      this.GetInstruments();
    };
})(window.app || (window.app = {}));