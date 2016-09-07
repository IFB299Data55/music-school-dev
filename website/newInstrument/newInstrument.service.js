(function(app) {
  app.NewInstrumentService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.addUrl = '/management/instrument/new';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.AttemptAdd = function(instrument) {
              console.log(instrument);
              return this.http.post(this.addUrl, instrument, this.headers).toPromise()
              .then(response => {
                var valid = JSON.parse(response._body);
                console.log(valid);
                return Promise.resolve(valid);
              })
              .catch(this.handleError);
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));