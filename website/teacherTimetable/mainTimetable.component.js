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
	      }
      ]
    });
})(window.app || (window.app = {}));