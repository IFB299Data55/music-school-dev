(function(app) {
  app.LoginService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        app.UserService,
        function(http, UserService) {
          this.http = http;
          this.UserService = UserService;
          this.loginUrl = '/login/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.AttemptLogin = function(user) {
              return this.http.post(this.loginUrl, user, this.headers).toPromise()
              .then(response => {
                var userCookie = JSON.parse(response._body);
                return Promise.resolve(userCookie);
              })
              .catch(this.handleError);
          }

          this.Login = function(user) {
            this.UserService.SetCurrentUser(user.id, user.email, user.validation);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));