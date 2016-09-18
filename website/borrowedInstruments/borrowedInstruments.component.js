(function(app) {
  app.BorrowedInstrumentsComponent =
    ng.core.Component({
      selector: 'lesson-info-app',
      directives: [ng.router.ROUTER_DIRECTIVES],
      templateUrl: localPath+'views/borrowedInstruments.component.ejs',
      styleUrls: ['../../..'+localPath+'css/borrowedInstruments.component.css']
    })
    .Class({
      constructor: [
	      app.BorrowHistoryService,
        app.UserService,
        function(BorrowHistoryService, UserService) {
	    	  this.title = "Borrowed Instruments";
          this.BorrowHistoryService = BorrowHistoryService;
          this.UserService = UserService;

          this.instruments = [];
          this.empty = false;
          this.error = false;

          this.GetInstruments = function() {
            this.BorrowHistoryService.GetInstruments()
              .then(response => {
                if (!response.error) {
                  this.instruments = response.instruments;
                  if (this.instruments.length == 0) {
                    this.empty = true;
                  }
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later.';
              });
          }

          this.PageIsAvailable = function() {
            if (this.UserService.GetCurrentUser().type == 'student') {
              return true;
            } else {
              return false;
            }
          }

        }
      ]
    });
    app.BorrowedInstrumentsComponent.prototype.ngOnInit = function() {
      this.GetInstruments();
    };
})(window.app || (window.app = {}));