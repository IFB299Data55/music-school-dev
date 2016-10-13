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
              if (response.valid) {
                this.lessons = response.lessons;
              } else {
                this.error = response.error;
              }
            }).catch(() => {
              this.error = 'An error has occured. Please try again later';
            });
          };

          this.GotoLesson = function(id) {
            var link = ['/lesson', id];
            this.Router.navigate(link);
          }

          this.ConvertToDisplayTime = function(time) {
            var dms = time.split(":");

            if(dms[0] > 12) {
              var hours = dms[0] - 12;
              return hours + ":" + dms[1] + "pm";
            } else if(dms[0] == 12) {
              return dms[0] + ":" + dms[1] + "pm";
            } else {
              var hours = parseInt(dms[0]);
              return hours + ":" + dms[1] + "am";
            }
          }
	      }
      ]
    });
    app.TeacherTimetableComponent.prototype.ngOnInit = function() {
      this.GetLessons();
    };
})(window.app || (window.app = {}));