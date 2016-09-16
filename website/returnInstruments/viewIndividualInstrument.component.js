(function(app) {
  app.ViewIndividualInstrumentComponent =
    ng.core.Component({
      selector: 'individual-instrument' ,
      templateUrl: localPath+'views/viewIndividualInstrument.component.ejs',
      styleUrls: ["../../.."+localPath+'css/viewIndividualInstrument.component.css']
    })
    .Class({
      constructor: [
	      app.ReturnInstrumentsService,
        ng.router.Router,
        ng.router.ActivatedRoute,
        function(ReturnInstrumentsService, Router, ActivatedRoute) {
          this.ReturnInstrumentsService = ReturnInstrumentsService;
          this.Router = Router;
          this.ActivatedRoute = ActivatedRoute;
          this.error;
          this.instrument = {};

          this.GoBack = function() {
            window.history.back();
          }

          this.ReturnInstrument = function(hireID) {
            this.ReturnInstrumentsService.ReturnInstrument(hireID)
              .then(response => {
                if (response.status) {
                  var link = ['/all'];
                  this.Router.navigate(link);
                } else {
                  this.error = 'There was an error';
                }
              })
              .catch(err => {
                console.log(err);
              });
          }
        }
      ]
    });
    app.ViewIndividualInstrumentComponent.prototype.ngOnInit = function() {

      var urlParams = this.ActivatedRoute.params._value;
      var id = +urlParams.id;

      this.ReturnInstrumentsService.GetInstrument(id).then(response => {
        if (!response.error) {
          this.instrument = response.instrument[0];
        } else {
          this.error = 'An error has occured. Please contact administration for further assitance.';
        }
      }).catch(() => {
        this.error = 'An error has occured. Please try again later.';
      });
    };
})(window.app || (window.app = {}));