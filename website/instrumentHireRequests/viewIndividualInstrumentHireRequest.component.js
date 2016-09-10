(function(app) {
  app.ViewIndividualInstrumentHireRequestComponent =
    ng.core.Component({
      selector: 'individual-instrument-hire-request' ,
      templateUrl: localPath+'views/viewIndividualInstrumentHireRequest.component.ejs',
      styleUrls: ["../../.."+localPath+'css/viewIndividualInstrumentHireRequest.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  // do stuff here still. check the tour of heroes thing - dashboard.component & app.component & heroDetail.component
	      }
      ]
    });
})(window.app || (window.app = {}));