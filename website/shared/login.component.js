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
              this.loggedIn = true;
              this.loggingIn = false;
              this.showForm = false;
              this.CookieService.SetCookie('userId', response.id);
              this.CookieService.SetCookie('email', response.email);
              this.CookieService.SetCookie('validation', response.validation);
            })
            .catch(()=>{});
          }
        	
        }
      ]
    });

  app.LoginComponent.prototype.ngOnInit = function() {
    if(this.CookieService.CookieExists('email')) {
      this.loggedIn = true;
    }
  };
})(window.app || (window.app = {}));