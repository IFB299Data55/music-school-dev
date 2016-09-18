(function(app) {
  app.LoggedInComponent =
    ng.core.Component({
      selector: 'logged-in-app',
      templateUrl: '/shared/views/nav.ejs'
    })
    .Class({
      constructor: [
        app.UserService,
        function(UserService) {
          this.UserService = UserService;
          this.loggedIn = false;
          this.user  = {
            email: ''
          };

          /*this.Login = function() {
            this.loggingIn = true;

            this.LoginService.AttemptLogin(this.user)
            .then(response => {
              if(response.valid != 'invalid') {
                this.loggedIn = true;
                this.loggingIn = false;
                this.LoginService.Login(response);
              } else {
                this.loggingIn = false;
                this.error = response.error;
              }
            })
            .catch(()=>{});
          }*/

          this.CheckLoggedIn = function() {
            if(this.UserService.IsSomeoneLoggedIn()) {
              this.loggedIn = true;
              this.user = this.UserService.GetCurrentUser();
            } else {
              this.loggedIn = false;
            }
          }

          this.LogOut = function() {
            this.UserService.SignOutUser();
            location.reload();
          }
        }
      ]
    });
  app.LoggedInComponent.prototype.ngOnInit = function() {
    this.CheckLoggedIn();
  };
})(window.app || (window.app = {}));