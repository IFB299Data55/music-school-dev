(function(app) {
  app.DeactivateTeachersService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.deactivateURL = '/management/teachers/individual/deactivate/';
          this.individualRequestURL = '/management/teachers/individual/';
          this.requestURL = '/management/teachers/all/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.DeactivateTeacher = function(teacherID) {
            return this.http.post(this.deactivateURL, teacherID, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return Promise.resolve(valid);
            })
            .catch(this.handleError);
          }

          this.GetTeachers = function() {
            return this.http.get(this.requestURL, this.headers).toPromise()
            .then(response => {
              var teachers = JSON.parse(response._body);
              return Promise.resolve(teachers);
            })
            .catch(this.handleError);
          }

          this.GetTeacher = function(teacherID) {
            var url = this.individualRequestURL+"?id="+teacherID;
            return this.http.get(url, this.headers).toPromise()
            .then(response => {
              var teacher = JSON.parse(response._body);
              return Promise.resolve(teacher);
            })
            .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));