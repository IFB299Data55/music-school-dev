(function(app) {
  app.AcceptStudentsService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.responseURL = '/teacher/studentApplications/individual/';
          this.requestURL = '/teacher/studentApplications/all/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.AcceptStudent = function(student) {
            return this.http.post(this.responseURL, student, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return valid;
            })
            .catch(this.handleError);
          }

          this.RejectStudent = function(student) {
            return this.http.post(this.responseURL, student, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return valid;
            })
            .catch(this.handleError);
          }

          this.GetStudents = function() {
            return this.http.get(this.requestURL, this.headers).toPromise()
            .then(response => {
              var students = JSON.parse(response._body);
              return students;
            })
            .catch(this.handleError);
          }

          this.GetStudent = function(studentID) {
            // return a student
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));