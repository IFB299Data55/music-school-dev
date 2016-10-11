(function(app) {
  app.LessonInfoComponent =
    ng.core.Component({
      selector: 'teacher-timetable' ,
      templateUrl: localPath+'views/lessonInfo.component.ejs',
      styleUrls: ['../..'+localPath+'css/lessonInfo.component.css']
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

          this.lessons = [];

          this.SelectStudentRequest = function(lessonId) {
            var link = ['/lesson', lessonId];
            this.Router.navigate(link);
          }

          this.FormIsAvailable = function() {
          if(this.UserService.GetCurrentUser().type == 'teacher') {
                return true;
            }
            
            return false;
          }

          this.GetLessons = function() {
            if(this.FormIsAvailable()) {
              this.TimetableService.GetLessons()
              .then(response => {
                if (!response.error) {
                  this.lessons = response.lessons;
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later.';
              });
            }
          }

	      }
      ]
    });
})(window.app || (window.app = {}));