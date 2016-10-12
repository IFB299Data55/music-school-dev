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
        ng.router.Router,
	      function(RegistrationService, Router) {
          this.RegistrationService = RegistrationService;
          this.Router = Router;
	    	  this.student = new Student();
          this.submitted = false;
          this.isValid = {
            firstName:true,
            middleName:true,
            lastName:true,
            birthday:true,
            address:true,
            phoneNumber:true,
            email:true,
            password:true,
            gender:true,
            errorMessage:''
          };

          this.Register = function() {
            this.submitted = true;
            this.error = '';
            //Send to registration Service
            //then redirect
            this.RegistrationService.AttemptRegistration(this.student)
              .then(response => {
                if (response.status) {
                  var link = ['/Confirmation'];
                  this.Router.navigate(link);
                } else {
                  this.isValid = response.errorArray;
                  this.submitted = false;
                  this.error = this.isValid.errorMessage;
                }
              }).catch(() => {
                this.submitted = false;
                this.error = 'An error has occured. Please try again later';
            });
          }
          
          this.UpdateGenderSelect = function() {
            if (this.student.gender == 'Male' || this.student.gender == 'Female') {
              this.isValid.gender = true;
            } else {
              this.isValid.gender = false;
            }
          }
	      }
      ]
    });
})(window.app || (window.app = {}));