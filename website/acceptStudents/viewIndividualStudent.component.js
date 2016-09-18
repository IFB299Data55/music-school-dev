(function(app) {
  app.ViewIndividualStudentComponent =
    ng.core.Component({
      selector: 'individual-student' ,
      inputs: ['student'],
      templateUrl: localPath+'views/viewIndividualStudent.component.ejs',
      styleUrls: ["../.."+localPath+'css/viewIndividualStudent.component.css']
    })
    .Class({
      constructor: [
    	  app.AcceptStudentsService,
        ng.router.Router,
        ng.router.ActivatedRoute,
        app.UserService,
        function(AcceptStudentsService, Router, ActivatedRoute, UserService) {
          this.AcceptStudentsService = AcceptStudentsService;
          this.Router = Router;
          this.ActivatedRoute = ActivatedRoute;
          this.UserService = UserService;
          this.error;
          this.student = {};

          this.GoBack = function() {
            window.history.back();
          }

          this.AcceptStudent = function(requestID) {
            this.AcceptStudentsService.AcceptStudent(requestID)
              .then(response => {
                if (response.status) {
                  var link = ['/all'];
                  this.Router.navigate(link);
                } else {
                  this.error = 'There was an error';
                }
              });
          }

          this.RejectStudent = function(requestID) {
            this.AcceptStudentsService.RejectStudent(requestID)
              .then(response => {
                if (response.status) {
                  var link = ['/all'];
                  this.Router.navigate(link);
                } else {
                  this.error = 'There was an error';
                }
              });
          }

          this.PageIsAvailable = function() {
            if (this.UserService.GetCurrentUser().type == 'teacher') {
              return true;
            } else {
              return false;
            }
          }

	      }
      ]
    });
    app.ViewIndividualStudentComponent.prototype.ngOnInit = function() {

      var urlParams = this.ActivatedRoute.params._value;
      var id = +urlParams.id;

      this.AcceptStudentsService.GetStudent(id).then(response => {
        if (!response.error) {
          this.student = response.student[0];

          var dateOfBirth = this.student.dob.split('-');
          var d = new Date();
          var year = d.getFullYear();
          var yearDifference = year - dateOfBirth[0];
          var month = d.getMonth();
          var day = d.getDay();
          var preBirthday = false;
          if (month < dateOfBirth[1]) {
            preBirthday = true;
          } else if (month = dateOfBirth[1] && day < dateOfBirth[2]) {
            preBirthday = true;
          }
          if (preBirthday) {
            this.student.dob = (yearDifference - 1);
          } else {
            this.student.dob = yearDifference;
          }

          this.student.starttime = this.student.starttime.substr(0,5);
          this.student.endtime = this.student.endtime.substr(0,5);

        } else {
          this.error = 'An error has occured. Please contact administration for further assitance.';
        }
      }).catch(() => {
        this.error = 'An error has occured. Please try again later.';
      });
    };
})(window.app || (window.app = {}));