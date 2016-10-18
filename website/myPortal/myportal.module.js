(function(app) {
  app.MyPortalModule =
    ng.core.NgModule({
      imports: [ 
	      ng.platformBrowser.BrowserModule
      , ng.forms.FormsModule
      , ng.http.HttpModule
      ],
      declarations: [ 
          app.MyPortalContainerComponent
      ],
      providers: [ app.MyPortalService, app.UserService, app.CookieService ],
      bootstrap: [ app.MyPortalContainerComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
