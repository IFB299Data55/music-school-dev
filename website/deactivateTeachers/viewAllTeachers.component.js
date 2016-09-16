(function(app) {
  app.ViewAllTeachersComponent =
    ng.core.Component({
      selector: 'all-teachers' ,
      templateUrl: localPath+'views/viewAllTeachers.component.ejs',
      styleUrls: ['../..'+localPath+'css/viewAllTeachers.component.css']
    })
    .Class({
      constructor: [
        app.DeactivateTeachersService,
        ng.router.Router,
	      function(DeactivateTeachersService, Router) {
          this.DeactivateTeachersService = DeactivateTeachersService;
          this.Router = Router;
          
          this.teachers = [];
          this.filteredTeachers = [];

          this.GetTeachers = function() {
            this.DeactivateTeachersService.GetTeachers()
              .then(response => {
                if (!response.error) {
                  this.teachers = response.teachers;
                  this.filteredTeachers = this.teachers;
                } else {
                  this.error = 'An error has occured. Please contact administration for further assitance.';
                }
              }).catch(() => {
                this.error = 'An error has occured. Please try again later';
            });
          }

          this.SelectTeacher = function(teacherID) {
            var link = ['/individual', teacherID];
            this.Router.navigate(link);
          }

          this.Filter = function() {
            this.filteredTeachers = [];
            filterString = new RegExp(this.filterText, "gi");
            for (var i = 0; i < this.teachers.length; i++) {
              var teacher = this.teachers[i];
              var name = teacher.firstname+" "+teacher.lastname;
              if (name.match(filterString)) {
                this.filteredTeachers.push(teacher);
              }
            }
          }

	      }
      ]
    });
    app.ViewAllTeachersComponent.prototype.ngOnInit = function() {
      this.GetTeachers();
    };
})(window.app || (window.app = {}));