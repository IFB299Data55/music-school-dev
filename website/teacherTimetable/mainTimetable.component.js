(function(app) {
  app.TeacherTimetableComponent =
    ng.core.Component({
      selector: 'teacher-timetable' ,
      templateUrl: localPath+'views/mainTimetable.component.ejs',
      styleUrls: ['../..'+localPath+'css/mainTimetable.component.css']
    })
    .Class({
      constructor: [
        app.TimetableService,
        app.UserService,
        ng.router.Router,
	      function(TimetableService, UserService, Router) {
          this.TimetableService = TimetableService;
          this.UserService = UserService;
          this.Router = Router;

          this.FormIsAvailable = function() {
            if(this.UserService.GetCurrentUser().type == 'teacher') {
                return true;
            }
            
            return false;
          }

          this.GetLessons = function() {
            this.TimetableService.GetLessons()
            .then(response => {
              console.log(response);
              if (response.valid) {
                this.lessons = response.lessons;
              } else {
                this.error = response.error;
              }
            }).catch(() => {
              this.error = 'An error has occured. Please try again later';
            });
          };
	      }
      ]
    });
    app.TeacherTimetableComponent.prototype.ngOnInit = function() {
      this.GetLessons();
    };
})(window.app || (window.app = {}));