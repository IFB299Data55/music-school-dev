(function(app) {
  app.InstrumentHireRequestsService =
  	ng.core.Class({
  		constructor: [
        ng.http.Http,
        function(http) {
          this.http = http;
          this.responseURL = '/management/instrument/individual/';
          this.requestURL = '/management/instrument/all/';
          this.headers = new Headers({'Content-Type': 'application/json'});

          this.AcceptInstrumentHireRequest = function(requestID) {
            return this.http.post(this.responseURL, requestID, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return Promise.resolve(valid);
            })
            .catch(this.handleError);
          }

          this.RejectInstrumentHireRequest = function(requestID) {
            return this.http.post(this.responseURL, requestID, this.headers).toPromise()
            .then(response => {
              var valid = JSON.parse(response._body);
              return Promise.resolve(valid);
            })
            .catch(this.handleError);
          }

          this.GetInstrumentHireRequests = function() {
            return this.http.get(this.requestURL, this.headers).toPromise()
            .then(response => {
              var instrumentHireRequests = JSON.parse(response._body);
              return Promise.resolve(instrumentHireRequests);
            })
            .catch(this.handleError);
          }

          this.GetInstrumentHireRequest = function(studentID) {
            // return a student
          }

          this.handleError = function(error) {
            return Promise.reject(error.message || error);
          }
    		}//End of constructor
  	]});
})(window.app || (window.app = {}));