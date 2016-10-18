(function(app) {
  app.MyPortalService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        app.UserService,
        function(http, UserService) {
          this.http = http;
          this.UserService = UserService;
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.GetUserDetails = function() {
            var userId = this.UserService.GetCurrentUser().id;
            var userType = this.UserService.GetCurrentUser().type;
            var url = '/database/getUserDetails?id='+userId+'&type='+userType;
            return this.http.get(url, this.headers).toPromise()
                   .then(response => {
                     var user = JSON.parse(response._body);
                     return Promise.resolve(user);
                   })
                   .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));