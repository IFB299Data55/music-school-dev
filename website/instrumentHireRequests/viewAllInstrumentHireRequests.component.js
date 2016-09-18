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
        app.UserService,
	      function(InstrumentHireRequestsService, Router, UserService) {
          this.InstrumentHireRequestsService = InstrumentHireRequestsService;
          this.Router = Router;
          this.UserService = UserService;
          
          this.instrumentHireRequests = [];
          this.filteredRequests = [];
          this.filterText = '';

          this.GetInstrumentHireRequests = function() {
            this.InstrumentHireRequestsService.GetInstrumentHireRequests()
              .then(response => {
                if (!response.error) {
                  this.instrumentHireRequests = response.instrumentHireRequests;
                  this.filteredRequests = this.instrumentHireRequests;
                  this.Filter('');
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(err => {
                console.log(err);
                this.error = 'An error has occured. Please try again later';
            });
          }

          this.SelectInstrumentHireRequest = function(requestID) {
            var link = ['/individual', requestID];
            this.Router.navigate(link);
          }

          this.Filter = function() {
            this.filteredRequests = [];
            filterString = new RegExp(this.filterText, "gi");
            for (var i = 0; i < this.instrumentHireRequests.length; i++) {
              var hireRequest = this.instrumentHireRequests[i];
              var name = hireRequest.firstname+" "+hireRequest.lastname;
              if (name.match(filterString)) {
                this.filteredRequests.push(hireRequest);
              }
            }
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
    app.ViewAllInstrumentHireRequestsComponent.prototype.ngOnInit = function() {
      this.GetInstrumentHireRequests();
    };
})(window.app || (window.app = {}));