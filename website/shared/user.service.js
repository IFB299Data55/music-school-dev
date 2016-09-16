(function(app) {
  app.UserService =
  	ng.core.Class({
  		constructor: [
        app.CookieService,
        function(CookieService) {
          this.CookieService = CookieService;

          this.SetCurrentUser = function(id, email, validation, userType = '') {
            this.CookieService.SetCookie('id', id);
            this.CookieService.SetCookie('email', email);
            this.CookieService.SetCookie('validation', validation);
            this.CookieService.SetCookie('userType', userType);
          }

          this.GetCurrentUser = function() {
            var user = {
              id: this.CookieService.GetCookie('id'),
              email: this.CookieService.GetCookie('email'),
              validation: this.CookieService.GetCookie('validation'),
              userType: this.CookieService.GetCookie('userType')
            }
            return user;
          }

          this.SignOutUser = function() {
            this.CookieService.ClearCookie('id');
            this.CookieService.ClearCookie('email');
            this.CookieService.ClearCookie('validation');
            this.CookieService.ClearCookie('userType');
          }

          this.IsSomeoneLoggedIn = function() {
            var user = this.GetCurrentUser();
            if(user.id != '')
              return true;
            return false;
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));