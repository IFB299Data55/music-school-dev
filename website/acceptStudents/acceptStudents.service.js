(function(app) {
  app.AcceptStudentsService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        app.UserService,
        function(http, UserService) {
          this.http = http;
          this.UserService = UserService;
          this.responseURL = '/teacher/studentApplications/individual/';
          this.requestURL = '/teacher/studentApplications/getStudents/';
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
            var url = this.requestURL+"?id=1"+UserService.GetCurrentUser().id;
            return this.http.get(url, this.headers).toPromise()
            .then(response => {
              var students = JSON.parse(response._body);
              return students;
            })
            .catch(this.handleError);
          }

          this.GetStudent = function(requestID) {
            var url = this.requestURL+"?request_id="+requestID;
            return this.http.get(url, this.headers).toPromise()
            .then(response => {
              var student = JSON.parse(response._body);
              return student;
            })
            .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));