(function(app) {
  app.ViewIndividualInstrumentHireRequestComponent =
    ng.core.Component({
      selector: 'individual-instrument-hire-request' ,
      templateUrl: localPath+'views/viewIndividualInstrumentHireRequest.component.ejs',
      styleUrls: ["../../.."+localPath+'css/viewIndividualInstrumentHireRequest.component.css']
    })
    .Class({
      constructor: [
	      app.InstrumentHireRequestsService,
        app.UserService,
        ng.router.Router,
        ng.router.ActivatedRoute,
        function(InstrumentHireRequestsService, Router, ActivatedRoute, UserService) {
          this.InstrumentHireRequestsService = InstrumentHireRequestsService;
          this.Router = Router;
          this.ActivatedRoute = ActivatedRoute;
          this.UserService = UserService;
          this.error;
          this.instrumentHireRequests = {};

          this.GoBack = function() {
            window.history.back();
          }

          this.ReturnInstrument = function(hireID) {
            this.InstrumentHireRequestsService.ReturnInstrument(hireID)
              .then(response => {
                if (response.status) {
                  var link = ['/all'];
                  this.Router.navigate(link);
                } else {
                  this.error = 'There was an error';
                }
              })
              .catch(err => {
              });
          }

          this.PageIsAvailable = function() {
            if (this.UserService.GetCurrentUser().type == 'manager') {
              return true;
            } else {
              return false;
            }
          }

        }
      ]
    });
    app.ViewIndividualInstrumentHireRequestComponent.prototype.ngOnInit = function() {

      var urlParams = this.ActivatedRoute.params._value;
      var id = +urlParams.id;

      this.ReturnInstrumentsService.GetInstrument(id).then(response => {
        if (!response.error) {
          this.instrumentHireRequests = response.instrumentHireRequests[0];
        } else {
          this.error = 'An error has occured. Please contact administration for further assitance.';
        }
      }).catch(() => {
        this.error = 'An error has occured. Please try again later.';
      });
    };
})(window.app || (window.app = {}));