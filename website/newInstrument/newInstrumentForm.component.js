(function(app) {
  app.NewInstrumentFormComponent =
    ng.core.Component({
      selector: 'new-instrument-form' ,
      templateUrl: localPath+'views/newInstrumentForm.component.ejs',
      styleUrls: ['../..'+localPath+'css/newInstrumentForm.component.css']
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
            purchasePrice:true,
            hireFee:true,
            purchaseDate:true,
            description:true,
            errorMessage:''
          };

          this.typeList = [
              {id: 1, name:"Electric Guitar"}
            , {id: 2, name:"Acoustic Guitar"}
            , {id: 3, name:"Violin"}
            , {id: 4, name:"Viola"}
            , {id: 5, name:"Alto Saxophone"}
            , {id: 6, name:"Tenor Saxophone"}
            , {id: 7, name:"Keyboard"}
            , {id: 8, name:"Trumpet"}
            , {id: 9, name:"Bugle"}
            , {id: 10, name:"Triangle"}
          ];

          this.conditionList = [
              {id: 1, name:"Super Dodge"}
            , {id: 2, name:"Just Dodge"}
            , {id: 3, name:"Alrightish"}
            , {id: 4, name:"Pretty Solid"}
            , {id: 5, name:"Good As"}
          ];

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
                console.log(err);
                this.error = 'An error has occured. Please try again later';
            });
          }
	      }
      ]
    });
})(window.app || (window.app = {}));