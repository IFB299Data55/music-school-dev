(function(app) {
  app.InstrumentHireRequestsModule =
    ng.core.NgModule({
      imports: [ 
	      ng.platformBrowser.BrowserModule
      , ng.forms.FormsModule
      , ng.router.RouterModule.forRoot(instrumentHireRequestsRouting)
      , ng.http.HttpModule
      ],
      declarations: [ 
          app.InstrumentHireRequestsRouterComponent
        , app.ViewAllInstrumentHireRequestsComponent
        , app.ViewIndividualInstrumentHireRequestComponent
      ],
      providers: [ app.InstrumentHireRequestsService ],
      bootstrap: [ app.InstrumentHireRequestsRouterComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
