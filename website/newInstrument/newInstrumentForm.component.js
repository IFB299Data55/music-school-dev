(function(app) {
  app.NewInstrumentFormComponent =
    ng.core.Component({
      selector: 'new-instrument-form' ,
      templateUrl: localPath+'views/newInstrumentForm.component.ejs',
      styleUrls: ['../../..'+localPath+'css/newInstrumentForm.component.css']
    })
    .Class({
      constructor: [
        app.NewInstrumentService,
        ng.router.Router,
	      function(NewInstrumentService, Router) {
          this.NewInstrumentService = NewInstrumentService;
          this.Router = Router;
	    	  this.instrument = new Instrument();
          this.submitted = false;
          this.isValid = {
            type:true,
            condition:true,
            serialNumber:true,
            model:true,
            purchasePrice:true,
            hireFee:true,
            purchaseDate:true,
            description:true,
            errorMessage:''
          };

          this.typeList = [];
          this.conditionList = [];

          this.Add = function() {
            this.submitted = true;

            this.NewInstrumentService.AttemptAdd(this.instrument)
              .then(response => {
                if (response.status) {
                  var link = ['/Confirmation'];
                  this.Router.navigate(link);
                } else {
                  this.isValid = response.errorArray;
                  this.submitted = false;
                  this.error = this.isValid.errorMessage;
                }
              }).catch(err => {
                this.submitted = false;
                this.error = 'An error has occured. Please try again later';
            });
          }
	      }
      ]
    });
    app.NewInstrumentFormComponent.prototype.ngOnInit = function() {
      this.NewInstrumentService.GetTypeList()
      .then(response => {
        if(response.valid) {
          this.typeList = response.instrumentTypes;
        } else {
          this.error = "Unable to connect to the database. Please try again later."
        }
      })
      .catch(err => {
        this.error = "Unable to connect to the database. Please try again later."
      });

      this.NewInstrumentService.GetConditionList()
      .then(response => {
        if(response.valid) {
          this.conditionList = response.conditions;
        } else {
          this.error = "Unable to connect to the database. Please try again later."
        }
      })
      .catch(err => {
        this.error = "Unable to connect to the database. Please try again later."
      });
    };
})(window.app || (window.app = {}));