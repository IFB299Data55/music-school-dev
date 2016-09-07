(function(app) {
  app.LoggedInComponent =
    ng.core.Component({
      selector: 'logged-in-app',
      outputs: ['logoutEmitter'],
      templateUrl: '/shared/views/loggedIn.ejs'
    })
    .Class({
      constructor: [
      app.UserService,
        function(UserService) {
          this.UserService = UserService;
          this.logoutEmitter = new ng.core.EventEmitter();
          this.user = this.UserService.GetCurrentUser();

          this.LogOut = function() {
            this.UserService.SignOutUser();
            this.logoutEmitter.emit();
          }
        }
      ]
    });
})(window.app || (window.app = {}));