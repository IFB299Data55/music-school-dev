(function(app) {
  app.TeacherRegistrationModule =
    ng.core.NgModule({
      imports: [ 
	      ng.platformBrowser.BrowserModule
      , ng.forms.FormsModule
      , ng.router.RouterModule.forRoot(teacherRegRouting)
      , ng.http.HttpModule
      ],
      declarations: [ 
          app.TeacherRegistrationRouterComponent
        , app.RegisterFormComponent
        , app.RegisterConfirmationComponent
      ],
      providers: [ app.RegistrationService ],
      bootstrap: [ app.TeacherRegistrationRouterComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));
