(function(app) {
  app.ApplicationFormComponent =
    ng.core.Component({
      selector: 'register-form' ,
      templateUrl: localPath+'views/applicationForm.component.ejs',
      styleUrls: [localPath+'css/applicationForm.component.css']
    })
    .Class({
      constructor: [
        app.LessonApplicationService,
        ng.router.Router,
	      function(LessonApplicationService,Router) {
          this.LessonApplicationService = LessonApplicationService;
          this.Router = Router;
          this.submitted = false;
          this.lesson = new Lesson();

          this.instrumentList = [
              {id: 1, name:"drums"}
            , {id: 2, name:"trumpet"}
            , {id: 3, name:"flute"}
          ];

          this.Register = function() {
            this.submitted = true;
            //Send to registration Service
            //then redirect
            /*this.RegistrationService.AttemptRegistration(this.student).then(() => {
              var link = ['/Confirmation'];
              this.Router.navigate(link);
            }).catch(() => {
              this.submitted = false;
              this.error = 'An error has occured. Please try again later';
            });*/
          }
	      }
      ]
    });
})(window.app || (window.app = {}));