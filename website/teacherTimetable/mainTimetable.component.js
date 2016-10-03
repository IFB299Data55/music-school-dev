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
          this.days = [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday'
          ];

          this.times = [
            '6am',
            '7am',
            '8am',
            '9am',
            '10am',
            '11am',
            '12am',
            '1pm',
            '2pm',
            '3pm',
            '4pm',
            '5pm',
            '6pm',
          ];

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