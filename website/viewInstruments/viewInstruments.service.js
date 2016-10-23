(function(app) {
  app.ViewInstrumentsService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.individualRequestURL = '/management/instruments/getIndividualInstrument/';
          this.deleteURL = '/management/instruments/getIndividualInstrument/delete/';
          this.requestURL = '/management/instruments/getAllInstruments/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.GetInstruments = function() {
            return this.http.get(this.requestURL, this.headers).toPromise()
            .then(response => {
              var instruments = JSON.parse(response._body);
              return Promise.resolve(instruments);
            })
            .catch(this.handleError);
          }

          this.GetInstrument = function(instrumentID) {
            var url = this.individualRequestURL+"?id="+instrumentID;
            return this.http.get(url, this.headers).toPromise()
            .then(response => {
              var instrument = JSON.parse(response._body);
              return Promise.resolve(instrument);
            })
            .catch(this.handleError);
          }

          this.DeleteInstrument = function(instrumentID) {
            var params = {
              id: instrumentID
            };
            return this.http.post(this.deleteURL, params, this.headers).toPromise()
            .then(response => {
              var instrument = JSON.parse(response._body);
              return Promise.resolve(instrument);
            })
            .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));