(function(app) {
  app.RegisterFormComponent =
    ng.core.Component({
      selector: 'register-form' ,
      templateUrl: localPath+'views/registerForm.component.ejs',
      styleUrls: ["../.."+localPath+'views/registerForm.component.css']
    })
    .Class({
      constructor: [
        app.RegistrationService,
        ng.router.Router,
	      function(RegistrationService, Router) {
          this.RegistrationService = RegistrationService;
          this.Router = Router;
	    	  this.student = new Student();
          this.submitted = false;

          this.Register = function() {
            this.submitted = true;
            //Send to registration Service
            //then redirect
            this.RegistrationService.AttemptRegistration(this.student).then(() => {
              var link = ['/Confirmation'];
              this.Router.navigate(link);
            }).catch(() => {
              this.submitted = false;
              this.error = 'An error has occured. Please try again later';
            });
          }
	      }
      ]
    });
})(window.app || (window.app = {}));