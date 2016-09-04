(function(app) {
  app.TeacherRegistrationRouterComponent =
    ng.core.Component({
      selector: 'teacher-registration-app',
      directives: [ng.router.ROUTER_DIRECTIVES],
      templateUrl: localPath+'views/teacherReg.component.ejs',
      styleUrls: [localPath+'views/teacherReg.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  this.title = 'Registration';
	      }
      ]
    });
})(window.app || (window.app = {}));