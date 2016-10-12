(function(app) {
  app.TimetableService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        app.UserService,
        function(http, UserService) {
          this.http = http;
          this.UserService = UserService;
          this.headers = new Headers({'Content-Type': 'application/json'});

          /*this.AttemptRegistration = function(student) {
              return this.http.post(this.registerUrl, student, this.headers).toPromise()
              .then(response => {
                var valid = JSON.parse(response._body);
                return valid;
              })
              .catch(this.handleError);
          }*/

          this.GetLessons = function() {
            var url = "/teacher/timetable/getLessons/?id="+UserService.GetCurrentUser().id;
            return this.http.get(url, this.headers).toPromise()
            .then(response => {
              var lessons = JSON.parse(response._body);
              return Promise.resolve(lessons);
            })
            .catch(this.handleError);
          }

          this.GetLesson = function(lessonId) {
            var url = "/teacher/timetable/getLesson/?teacherId="+UserService.GetCurrentUser().id +"&lessonId=" + lessonId;
            return this.http.get(url, this.headers).toPromise()
            .then(response => {
              var lesson = JSON.parse(response._body);
              return Promise.resolve(lesson);
            })
            .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));