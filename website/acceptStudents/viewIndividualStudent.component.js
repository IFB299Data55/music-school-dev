(function(app) {
  app.ViewIndividualStudentComponent =
    ng.core.Component({
      selector: 'individual-student' ,
      templateUrl: localPath+'views/viewIndividualStudent.component.ejs',
      styleUrls: ["../.."+localPath+'css/viewIndividualStudent.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  // do stuff here still. check the tour of heroes thing - dashboard.component & app.component & heroDetail.component
	      }
      ]
    });
})(window.app || (window.app = {}));