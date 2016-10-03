(function(app) {
  app.ApplyFormComponent =
    ng.core.Component({
      selector: 'apply-form' ,
      templateUrl: localPath+'views/applyForm.component.ejs',
      styleUrls: ['../..'+localPath+'css/applyForm.component.css']
    })
    .Class({
      constructor: [
        app.ApplicationService,
        app.UserService,
        ng.router.Router,
	      function(ApplicationService, UserService, Router) {
          this.ApplicationService = ApplicationService;
          this.UserService = UserService;
          this.Router = Router;
	        this.teacherApplication = new TeacherApplication();
          this.submitted = false;
          this.isValid = {
            firstName:true,
            middleName:true,
            lastName:true,
            birthday:true,
            address:true,
            phoneNumber:true,
            email:true,
            dbError:false,
            dbErrorMessage:''
          };

          this.Apply = function() {
            this.submitted = true;
            this.error = '';
            //Send to application Service
            //then redirect
            this.ApplicationService.AttemptApplication(this.teacherApplication)
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

	      }
      ]
    });
})(window.app || (window.app = {}));