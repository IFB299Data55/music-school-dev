(function(app) {
  app.LessonApplicationModule =
    ng.core.NgModule({
      imports: [ 
	      ng.platformBrowser.BrowserModule
      , ng.forms.FormsModule
      , ng.router.RouterModule.forRoot(lessonAppRouting)
      , ng.http.HttpModule
      ],
      declarations: [ 
          app.LessonApplicationRouterComponent
        , app.ApplicationFormComponent
        , app.LessonConfirmationComponent
      ],
      providers: [ app.LessonApplicationService ],
      bootstrap: [ app.LessonApplicationRouterComponent ]
    })
    .Class({
      constructor: function() {}
    });
})(window.app || (window.app = {}));