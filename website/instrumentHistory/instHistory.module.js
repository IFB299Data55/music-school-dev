(function(app) {
  app.InstrumentHistoryModule =
    ng.core.NgModule({
      imports: [ 
	      ng.platformBrowser.BrowserModule
      , ng.forms.FormsModule
      , ng.http.HttpModule
      ],
      declarations: [ 
          app.InstrumentHistoryComponent
      ],
      providers: [ app.StudentInstrumentService ],
      bootstrap: [ app.InstrumentHistoryComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
