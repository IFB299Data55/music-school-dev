(function(app) {
  app.ApplicationFormComponent =
    ng.core.Component({
      selector: 'register-form' ,
      templateUrl: localPath+'views/applicationForm.component.ejs',
      styleUrls: ['../..'+localPath+'css/applicationForm.component.css'],
    })
    .Class({
      constructor: [
        app.LessonApplicationService,
        ng.router.Router,
	      function(LessonApplicationService,Router) {
          this.LessonApplicationService = LessonApplicationService;
          this.Router = Router;
          this.submitted = false;
          this.available = false;
          this.lesson = new Lesson();
          this.error = '';

          this.instrumentList = [
              {id: 1, name:"drums"}
            , {id: 2, name:"trumpet"}
            , {id: 3, name:"flute"}
          ];

          this.dayList = [
              {short: "mon", name:"Monday"}
            , {short: "tue", name:"Tuesday"}
            , {short: "wed", name:"Wednesday"}
            , {short: "thu", name:"Thursday"}
            , {short: "fri", name:"Friday"}
          ];

          this.ProcessStartTime = function() {
            if(this.lesson.startTime.search(":") == -1) {
              if(this.lesson.startTime.search("pm") == -1) {
                var hours = parseInt(this.lesson.startTime);
                if (hours < 10) hours = "0" + hours.toString();
                this.lesson.startTime = hours + ":00";
              } else {
                var hours = parseInt(this.lesson.startTime) + 12;
                this.lesson.startTime = hours + ":00";
              }
            } else if(this.lesson.startTime.search("pm") == -1) {
              var hours = parseInt(this.lesson.startTime);
              if (hours < 10) hours = "0" + hours.toString();
              this.lesson.startTime = hours + ":30";
            } else {
              var hours = parseInt(this.lesson.startTime) + 12;
              this.lesson.startTime = hours + ":30";
            }
          }

          this.Register = function() {
            this.submitted = true;
            //Fix startTime
            this.ProcessStartTime();
            //Send to registration Service
            //then redirect
            var availabilityCheck = {
                                      studentId: 1,
                                      startTime: this.lesson.startTime,
                                      duration:  this.lesson.duration,
                                      day:       this.lesson.day
                                    };
            this.LessonApplicationService.CheckAvailability(availabilityCheck).then(response => {
              if(response._body == 'Available') {
                this.LessonApplicationService.AttemptLessonBooking(this.lesson).then(() => {
                  var link = ['/Confirmation'];
                  this.Router.navigate(link);
                }).catch(() => {
                  this.submitted = false;
                  this.error = 'An error has occured. Please try again later';
                });
              } else {
                this.submitted = false;
                this.error = 'Timeslot not Available.'
              }
            })
            .catch(() => {
              this.submitted = false;
              this.error = 'Timeslot not available.';
            });
          }
	      }
      ]
    });
})(window.app || (window.app = {}));