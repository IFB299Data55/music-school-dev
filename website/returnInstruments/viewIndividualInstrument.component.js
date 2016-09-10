(function(app) {
  app.ViewIndividualInstrumentComponent =
    ng.core.Component({
      selector: 'individual-instrument' ,
      templateUrl: localPath+'views/viewIndividualInstrument.component.ejs',
      styleUrls: ["../../.."+localPath+'css/viewIndividualInstrument.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  // do stuff here still. check the tour of heroes thing - dashboard.component & app.component & heroDetail.component
	      }
      ]
    });
})(window.app || (window.app = {}));