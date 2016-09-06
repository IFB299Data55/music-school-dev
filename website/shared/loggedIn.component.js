(function(app) {
  app.LoggedInComponent =
    ng.core.Component({
      selector: 'logged-in-app',
      templateUrl: '/shared/views/loggedIn.ejs'
    })
    .Class({
      constructor: [
      app.CookieService,
        function(CookieService) {
          this.CookieService = CookieService;

          this.email = this.CookieService.GetCookie('email');

          this.LogOut = function() {
            this.parent.LoginComponent.loggedIn = false;
            this.CookieService.ClearCookie('email');
            this.CookieService.ClearCookie('validation');
          }
        }
      ]
    });
})(window.app || (window.app = {}));