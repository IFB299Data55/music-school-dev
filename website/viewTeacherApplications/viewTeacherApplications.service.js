(function(app) {
  app.ViewTeacherApplicationsService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        app.UserService,
        function(http, UserService) {
          this.http = http;
          this.UserService = UserService;
          this.shortlistResponseURL = '/management/teacherApplications/individual/shortlist/';
          this.rejectResponseURL = '/management/teacherApplications/individual/reject/';
          this.requestURL = '/management/teacherApplications/GetTeacherApplications/';
          this.requestAllURL = '/management/teacherApplications/GetTeacherApplications/all/';
          this.individualRequestURL = '/management/teacherApplications/GetTeacherApplication/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.ShortlistTeacherApplication = function(teacherApplicationID) {
            var params = {
              id: teacherApplicationID
            };
            return this.http.post(this.shortlistResponseURL, params, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return Promise.resolve(valid);
            })
            .catch(this.handleError);
          }

          this.RejectTeacherApplication = function(teacherApplicationID) {
            var params = {
              id: teacherApplicationID
            };
            return this.http.post(this.rejectResponseURL, params, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return Promise.resolve(valid);
            })
            .catch(this.handleError);
          }

          this.GetTeacherApplications = function() {
            return this.http.get(this.requestURL, this.headers).toPromise()
            .then(response => {
              var teacherApplications = JSON.parse(response._body);
              return Promise.resolve(teacherApplications);
            })
            .catch(this.handleError);
          }

          this.GetAllTeacherApplications = function() {
            return this.http.get(this.requestAllURL, this.headers).toPromise()
            .then(response => {
              var teacherApplications = JSON.parse(response._body);
              return Promise.resolve(teacherApplications);
            })
            .catch(this.handleError);
          }

          this.GetTeacherApplication = function(teacherApplicationID) {
            var url = this.individualRequestURL+"?id="+teacherApplicationID;
            return this.http.get(url, this.headers).toPromise()
            .then(response => {
              var result = JSON.parse(response._body);
              return Promise.resolve(result);
            })
            .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));