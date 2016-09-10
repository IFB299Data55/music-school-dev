(function(app) {
  app.LessonInformationComponent =
    ng.core.Component({
      selector: 'lesson-info-app',
      directives: [ng.router.ROUTER_DIRECTIVES],
      templateUrl: localPath+'views/lessonInfo.component.ejs',
      styleUrls: ['../..'+localPath+'css/lessonInfo.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  this.title = "Lesson Information";
	      }
      ]
    });
})(window.app || (window.app = {}));