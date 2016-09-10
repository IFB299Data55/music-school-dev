(function(app) {
  app.AcceptStudentsModule =
    ng.core.NgModule({
      imports: [ 
	      ng.platformBrowser.BrowserModule
      , ng.forms.FormsModule
      , ng.router.RouterModule.forRoot(acceptStudentsRouting)
      , ng.http.HttpModule
      ],
      declarations: [ 
          app.AcceptStudentsRouterComponent
        , app.ViewAllStudentsComponent
        , app.ViewIndividualStudentComponent
      ],
      providers: [ app.AcceptStudentsService ],
      bootstrap: [ app.AcceptStudentsRouterComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
