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

          this.username = this.CookieService.GetCookie('username');
        }
      ]
    });
})(window.app || (window.app = {}));