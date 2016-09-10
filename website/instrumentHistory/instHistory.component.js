(function(app) {
  app.InstrumentHistoryComponent =
    ng.core.Component({
      selector: 'instrument-history-app',
      directives: [ng.router.ROUTER_DIRECTIVES],
      templateUrl: localPath+'views/instHistory.component.ejs',
      styleUrls: ['../../..'+localPath+'css/instHistory.component.css']
    })
    .Class({
      constructor: [
	      function() {
	    	  this.title = "Instrument History";
	      }
      ]
    });
})(window.app || (window.app = {}));