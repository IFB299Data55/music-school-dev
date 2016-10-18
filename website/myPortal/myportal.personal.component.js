(function(app) {
  app.MyPortalPersonalComponent =
    ng.core.Component({
      selector: 'my-portal-personal',
      templateUrl: localPath+'views/myportal.personal.component.ejs',
      styleUrls: ['..'+localPath+'css/myportal.personal.component.css']
    })
    .Class({
      constructor: [
	      app.MyPortalService,
        app.UserService,
        function(MyPortalService, UserService) {
          this.MyPortalService = MyPortalService;
          this.user = {
            first_name: '',
            middle_name: '',
            last_name: '',
            dob: '',
            address: '',
            phone_no: '',
            email: '',
            gender: ''
          };
          this.editing = false;

          this.toggleEdit = function() {
            this.editing = !this.editing;
          }

          this.GetUser = function() {
            this.MyPortalService.GetUserDetails()
            .then(response => {
              if (!response.error) {
                this.user = response.user;
                this.user.dob = this.user.dob.split('T')[0];
              } else {
                this.error = response.error;
              }
            }).catch(() => {
              this.error = 'An error has occured. Please try again later.';
            });
          }
        }
      ]
    });
    app.MyPortalPersonalComponent.prototype.ngOnInit = function() {
      this.GetUser();
    };
})(window.app || (window.app = {}));