(function(app) {
  app.LessonApplicationService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.CheckAvailability = function(availabilityCheck) {
              var url = '/database/checkAvailability/';
              return this.http.post(url, availabilityCheck, this.headers).toPromise()
              .then(response => {console.log(response);})
              .catch(this.handleError);
          }

          this.AttemptLessonBooking = function(lesson) {
              var url = '/lessons/application/';
              return this.http.post(url, lesson, this.headers).toPromise()
              .then(response => {console.log(response);})
              .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]})
})(window.app || (window.app = {}));