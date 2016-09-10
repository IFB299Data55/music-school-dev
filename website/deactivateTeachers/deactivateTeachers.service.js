(function(app) {
  app.DeactivateTeachersService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.responseURL = '/management/teachers/individual/';
          this.requestURL = '/management/teachers/all/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.DeactivateTeacher = function(teacherID) {
            return this.http.post(this.responseURL, teacherID, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return valid;
            })
            .catch(this.handleError);
          }

          this.GetTeachers = function() {
            return this.http.get(this.requestURL, this.headers).toPromise()
            .then(response => {
              var teachers = JSON.parse(response._body);
              return teachers;
            })
            .catch(this.handleError);
          }

          this.GetTeacher = function(teacherID) {
            // return a teacher
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));