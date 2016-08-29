(function(app) {
  app.RegisterConfirmationComponent =
    ng.core.Component({
      selector: 'register-confirmation' ,
      templateUrl: localPath+'views/registerConfirmation.component.ejs'
      //styleUrls: ['main/app.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  
	      }
      ]
    });
})(window.app || (window.app = {}));