(function(app) {
  app.LoginService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.loginUrl = '/login/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.AttemptLogin = function(user) {
              return this.http.post(this.loginUrl, user, this.headers).toPromise()
              .then(response => {
                var userCookie = JSON.parse(response._body);
                console.log(userCookie);
                return Promise.resolve(userCookie);
              })
              .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));