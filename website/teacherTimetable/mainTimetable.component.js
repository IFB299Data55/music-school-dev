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

          this.times = [];

          for(var time = 0; time < 13; time++) { //13 times
            var timeObj = {
              time: (time+5)%12 + 1,
              ampm: time > 5 ? 'pm':'am',
              days: []
            };

            for(var day = 0; day < this.days.length; day++) {
              var dayObj = {
                day: this.days[day],
                status: (time%2)==0 ? time>5 ? 'unavailable' : 'booked' :'available',
                student: ''
              };

              timeObj.days.push(dayObj);
            }

            this.times.push(timeObj);
          }

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