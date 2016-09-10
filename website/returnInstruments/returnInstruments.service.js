(function(app) {
  app.ReturnInstrumentsService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.responseURL = '/management/instruments/return/';
          this.requestURL = '/management/instruments/all/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.ReturnInstrument = function(instrument) {
            return this.http.post(this.responseURL, instrument, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return valid;
            })
            .catch(this.handleError);
          }

          this.GetInstruments = function() {
            return this.http.get(this.requestURL, this.headers).toPromise()
            .then(response => {
              var instruments = JSON.parse(response._body);
              return instruments;
            })
            .catch(this.handleError);
          }

          this.GetInstrument = function(instrumentID) {
            // return a instrument
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));