(function(app) {
  app.ViewIndividualTeacherComponent =
    ng.core.Component({
      selector: 'individual-teacher' ,
      templateUrl: localPath+'views/viewIndividualTeacher.component.ejs',
      styleUrls: ["../.."+localPath+'css/viewIndividualTeacher.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  // do stuff here still. check the tour of heroes thing - dashboard.component & app.component & heroDetail.component
	      }
      ]
    });
})(window.app || (window.app = {}));