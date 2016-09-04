(function(app) {
  app.LoginAppModule =
    ng.core.NgModule({
      imports: [ 
	      ng.platformBrowser.BrowserModule
      , ng.forms.FormsModule
      , ng.http.HttpModule
      ],
      declarations: [ app.LoginComponent, app.LoggedInComponent ],
      providers: [ app.LoginService, app.CookieService ],
      bootstrap: [ app.LoginComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));