(function(app) {
  app.ViewIndividualInstrumentComponent =
    ng.core.Component({
      selector: 'individual-instrument' ,
      templateUrl: localPath+'views/viewIndividualInstrument.component.ejs',
      styleUrls: ["../.."+localPath+'css/viewIndividualInstrument.component.css']
    })
    .Class({
      constructor: [
	      app.ViewInstrumentsService,
        ng.router.Router,
        ng.router.ActivatedRoute,
        app.UserService,
        function(ViewInstrumentsService, Router, ActivatedRoute, UserService) {
          this.ViewInstrumentsService = ViewInstrumentsService;
          this.Router = Router;
          this.ActivatedRoute = ActivatedRoute;
          this.UserService = UserService;
          this.error;
          this.instrument = false;

          this.GoBack = function() {
            window.history.back();
          }

          // add editing stuff

          this.DeleteInstrument = function(instrumentID) {
            this.ViewInstrumentsService.DeleteInstrument(instrumentID)
              .then(response => {
                if (response.status) {
                  var link = ['/all'];
                  this.Router.navigate(link);
                } else {
                  this.error = 'There was an error';
                }
              });
          }

          this.FormIsAvailable = function() {
            if(this.UserService.checkUserType('manager')) {
              return true;
            }
            
            return false;
          }

        }
      ]
    });
    app.ViewIndividualInstrumentComponent.prototype.ngOnInit = function() {

      var urlParams = this.ActivatedRoute.params._value;
      var id = +urlParams.id;

      this.ViewInstrumentsService.GetInstrument(id).then(response => {
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