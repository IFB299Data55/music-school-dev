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

          this.SavePersonalData = function(user) {
            var url = '/myportal/SavePersonalData/';
            user.id = this.UserService.GetCurrentUser().id;
            user.type = this.UserService.GetCurrentUser().type;
            return this.http.post(url, user, this.headers).toPromise()
                   .then(response => {
                     var res = JSON.parse(response._body);
                     return Promise.resolve(res);
                   })
                   .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));