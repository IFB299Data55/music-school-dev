(function(app) {
  app.LoginComponent =
    ng.core.Component({
      selector: 'login-app',
      templateUrl: '/shared/views/loginForm.ejs'
    })
    .Class({
      constructor: [
        app.CookieService,
        app.LoginService,
        function(CookieService, LoginService) {
          this.CookieService = CookieService;
          this.LoginService = LoginService;
          this.loggedIn = false;
          this.loggingIn = false;
          this.showForm = false;

          this.user = {
            email: '',
            password: ''
          };

          this.ShowForm = function() {
            this.showForm = true;
          }

          this.Login = function() {
            this.loggingIn = true;

            this.LoginService.AttemptLogin(this.user)
            .then(response => {
              if(response.valid != 'invalid') {
                this.loggedIn = true;
                this.loggingIn = false;
                this.showForm = false;
                this.LoginService.Login(response);
              } else {
                this.loggingIn = false;
                this.error = response.error;
              }
            })
            .catch(()=>{});
          }

          this.CheckLoggedIn = function() {
            if(this.CookieService.CookieExists('email')) {
              this.loggedIn = true;
            } else {
              this.loggedIn = false;
            }
          }

          this.Logout = function() {
            this.loggedIn = false;
          }
        }
      ]
    });

  app.LoginComponent.prototype.ngOnInit = function() {
    this.CheckLoggedIn();
  };
})(window.app || (window.app = {}));