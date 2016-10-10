(function(app) {
  app.RegisterFormComponent =
    ng.core.Component({
      selector: 'register-form' ,
      templateUrl: localPath+'views/registerForm.component.ejs',
      styleUrls: ['../..'+localPath+'css/registerForm.component.css']
    })
    .Class({
      constructor: [
        app.RegistrationService,
        app.UserService,
        ng.router.Router,
	      function(RegistrationService, UserService, Router) {
          this.RegistrationService = RegistrationService;
          this.UserService = UserService;
          this.Router = Router;
	        this.teacher = new Teacher();
          this.submitted = false;
          this.isValid = {
            firstName:      true,
            middleName:     true,
            lastName:       true,
            birthday:       true,
            address:        true,
            phoneNumber:    true,
            email:          true,
            dbError:        false,
            dbErrorMessage: ''
          };

          this.Register = function() {
            this.submitted = true;
            this.error = '';
            //Send to registration Service
            //then redirect
            this.RegistrationService.AttemptRegistration(this.teacher)
              .then(response => {
                if (response.status) {
                  var link = ['/Confirmation'];
                  this.Router.navigate(link);
                } else {
                  if (response.errorArray.dbError) {
                    this.error = response.errorArray.dbErrorMessage;
                  } else {
                    this.isValid = response.errorArray;
                  }
                  this.submitted = false;
                }
              }).catch(error => {
                this.submitted = false;
                this.error = 'An error has occured. Please try again later';
            });
          }

          this.test = function() {
            console.log(this.teacher.languages);
          }

          this.FormIsAvailable = function() {
            if(this.UserService.GetCurrentUser().type == 'manager') {
                return true;
            }
            
            return false;
          }
	      }
      ]
    });
})(window.app || (window.app = {}));