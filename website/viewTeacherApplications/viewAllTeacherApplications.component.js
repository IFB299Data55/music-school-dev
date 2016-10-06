(function(app) {
  app.ViewAllTeacherApplicationsComponent =
    ng.core.Component({
      selector: 'all-teacher-applications' ,
      templateUrl: localPath+'views/viewAllTeacherApplications.component.ejs',
      styleUrls: ['../..'+localPath+'css/viewAllTeacherApplications.component.css']
    })
    .Class({
      constructor: [
        app.ViewTeacherApplicationsService,
        ng.router.Router,
	      function(ViewTeacherApplicationsService, Router) {
          this.ViewTeacherApplicationsService = ViewTeacherApplicationsService;
          this.Router = Router;
          
          this.teacherApplications = [];

          this.SelectTeacherApplication = function(teacherApplicationID) {
            var link = ['/individual', teacherApplicationID];
            this.Router.navigate(link);
          }

          this.GetTeacherApplications = function() {
            this.ViewTeacherApplicationsService.GetTeacherApplications()
              .then(response => {
                if (!response.error) {
                  this.teacherApplications = response.teacherApplications;
                  for (var i = 0; i < this.teacherApplications.length; i++) {
                    var dateOfBirth = this.teacherApplications[i].dob.split('-');
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
                      this.teacherApplications[i].dob = (yearDifference - 1);
                    } else {
                      this.teacherApplications[i].dob = yearDifference;
                    }
                  }
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later.';
              });
          }
	      }
      ]
    });
    app.ViewAllTeacherApplicationsComponent.prototype.ngOnInit = function() {
      this.GetTeacherApplications();
    };
})(window.app || (window.app = {}));