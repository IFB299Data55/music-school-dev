(function(app) {
  app.LessonInfoComponent =
    ng.core.Component({
      selector: 'teacher-individual-lesson' ,
      templateUrl: localPath+'views/lessonInfo.component.ejs',
      styleUrls: ['../..'+localPath+'css/lessonInfo.component.css']
    })
    .Class({
      constructor: [
        app.TimetableService,
        app.UserService,
        ng.router.Router,
        ng.router.ActivatedRoute,
	      function(TimetableService, UserService, Router, ActivatedRoute) {
          this.TimetableService = TimetableService;
          this.UserService = UserService;
          this.Router = Router;
          this.ActivatedRoute = ActivatedRoute;

          this.lesson = false;

          this.dayConversion = {
            Mon: "Monday",
            Tue: "Tuesday",
            Wed: "Wednesday",
            Thu: "Thursday",
            Fri: "Friday",
            Sat: "Saturday",
            Sun: "Sunday",
          }

          this.FormIsAvailable = function() {
          if(this.UserService.GetCurrentUser().type == 'teacher') {
                return true;
            }
            
            return false;
          }

          this.GetLesson = function(lessonId) {
            if(this.FormIsAvailable()) {
              this.TimetableService.GetLesson(lessonId)
              .then(response => {
                if (!response.error) {
                  this.lesson = response.lesson;
                } else {
                  this.error = response.error;
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later.';
              });
            }
          }

          this.ConvertToDisplayTime = function(time) {
            if(!time) return;

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

          this.GoBack = function() {
            window.history.back();
          }

	      }
      ]
    });
    app.LessonInfoComponent.prototype.ngOnInit = function() {
      var urlParams = this.ActivatedRoute.params._value;
      var id = +urlParams.id;

      this.GetLesson(id);
    };
})(window.app || (window.app = {}));