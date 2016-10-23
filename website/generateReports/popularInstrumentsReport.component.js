(function(app) {
  app.PopularInstrumentsReportComponent =
    ng.core.Component({
      selector: 'popular-instruments-report' ,
      inputs: ['report'],
      templateUrl: localPath+'views/viewTableReport.component.ejs',
      styleUrls: ["../.."+localPath+'css/viewTableReport.component.css']
    })
    .Class({
      constructor: [
        app.GenerateReportsService,
    	  app.UserService,
        ng.router.Router,
        ng.router.ActivatedRoute,
        function(GenerateReportsService, UserService, Router, ActivatedRoute) {
          this.GenerateReportsService = GenerateReportsService;
          this.UserService = UserService;
          this.Router = Router;
          this.ActivatedRoute = ActivatedRoute;
          this.error;
          this.report = false;
          this.reportRows = [];

          this.GoBack = function() {
            window.history.back();
          }

          this.FormIsAvailable = function() {
            if(this.UserService.GetCurrentUser().type == 'manager') {
                return true;
            }
            return false;
          }
	      }
      ]
    });
    app.ViewIndividualReportComponent.prototype.ngOnInit = function() {

      var urlParams = this.ActivatedRoute.params._value;
      var id = +urlParams.id;

      this.GenerateReportsService.GetReport(id).then(response => {
        if (!response.error) {
          this.report = response.report[0];
          for (var i = 0; i < this.report.length; i++) {

          }
        } else {
          this.error = 'An error has occured. Please contact administration for further assitance.';
        }
      }).catch(() => {
        this.error = 'An error has occured. Please try again later.';
      });
    };
})(window.app || (window.app = {}));