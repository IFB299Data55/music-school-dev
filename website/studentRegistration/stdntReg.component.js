(function(app) {
  app.StudentRegistrationRouterComponent =
    ng.core.Component({
      selector: 'student-registration-app',
      directives: [ng.router.ROUTER_DIRECTIVES],
      templateUrl: localPath+'views/stdntReg.component.ejs'
      //styleUrls: ['main/app.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  this.title = 'Registration';
	      }
      ]
    });
})(window.app || (window.app = {}));