(function(app) {
  app.ViewAllStudentsComponent =
    ng.core.Component({
      selector: 'all-students' ,
      templateUrl: localPath+'views/viewAllStudents.component.ejs',
      styleUrls: ['../..'+localPath+'css/viewAllStudents.component.css']
    })
    .Class({
      constructor: [
        app.AcceptStudentsService,
        ng.router.Router,
	      function(AcceptStudentsService, Router) {
          this.AcceptStudentsService = AcceptStudentsService;
          this.Router = Router;
          
          this.students = ['asdfasdf'];

          this.GetStudents = function() {
            this.AcceptStudentsService.GetStudents()
              .then(response => {
                if (!response.error) {
                  this.students = response.students;
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later';
            });
          }

          this.SelectStudent = function(studentID) {
            // select the student
          }
	      }
      ]
    });
})(window.app || (window.app = {}));