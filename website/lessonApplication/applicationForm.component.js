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
        app.UserService,
	      function(LessonApplicationService, Router, UserService) {
          this.LessonApplicationService = LessonApplicationService;
          this.Router = Router;
          this.UserService = UserService;
          this.lesson = new Lesson();

          this.available = false;

          if(this.UserService.IsSomeoneLoggedIn()) {
            this.available = true;
            this.lesson.studentId = this.UserService.GetCurrentUser().id;
          }

          this.submitted = false;
          this.givenStartTime = '';
          this.isValid = {
            instrumentType: true,
            hireType: true,
            instrumentId: true,
            day: true,
            startTime: true,
            endTime: true,
            errorMessage:''
          };

          this.instrumentTypeList = [
              {id: 1, name:"Drums"}
            , {id: 2, name:"Trumpet"}
            , {id: 3, name:"Flute"}
          ];

          this.CalcEndTimeInHours = function() {
            this.ProcessStartTime();
            var d = new Date(1,1,1,this.lesson.startTime + 1);
            this.lesson.endTime = d.getHours();
          }

          this.DisplayEndTime = function() {
            this.CalcEndTimeInHours();

            var format = '';
            if(this.givenStartTime.search(":") != -1) format = ':00';

            if(this.givenStartTime.search("am") != -1 || this.givenStartTime.search("pm") != -1) {
              if(this.lesson.endTime > 12){
                return ((this.lesson.endTime - 12) + format + 'pm');
              } else if (this.lesson.endTime == 12) {
                return (this.lesson.endTime + format + 'pm');
              } else {
                return (this.lesson.endTime + format + 'am');
              }
            } else {
              if(this.lesson.endTime > 10)
                return (this.lesson.endTime + format);
              else 
                return (0 + this.lesson.endTime.toString() + format);
            }
          }


          this.instrumentList = [
              {id: 1, description: "Red", type: "Drums", serial: "#123123", hireFee: "$10"}
            , {id: 2, description: "Blue", type: "Drums", serial: "#123123", hireFee: "$12"}
            , {id: 3, description: "Yellow", type: "Drums", serial: "#54354", hireFee: "$5"}
          ];

          this.UpdateInstrumentSelect = function() {
            if(this.lesson.hireType == 'Hire' && this.lesson.instrumentId == '')
              this.isValid.instrumentId = false;
            else
              this.isValid.instrumentId = true;
          }

          this.dayList = [
              {short: "Mon", name:"Monday"}
            , {short: "Tue", name:"Tuesday"}
            , {short: "Wed", name:"Wednesday"}
            , {short: "Thu", name:"Thursday"}
            , {short: "Fri", name:"Friday"}
          ];

          this.ProcessStartTime = function() {
            var hours;
            if(this.givenStartTime.search(":") == -1) {
              if(this.givenStartTime.search("pm") == -1) {
                hours = parseInt(this.givenStartTime);
              } else {
                hours = parseInt(this.givenStartTime) + 12;
              }
            } else if(this.givenStartTime.search("pm") == -1) {
              hours = parseInt(this.givenStartTime);
            } else {
              hours = parseInt(this.givenStartTime) + 12;
            }
            this.lesson.startTime = hours;
          }

          this.Register = function() {
            this.submitted = true;
            //Fix startTime
            this.CalcEndTimeInHours();
            //Send to registration Service
            //then redirect
            var availabilityCheck = {
                                      studentId: this.lesson.studentId,
                                      startTime: this.lesson.startTime,
                                      duration:  this.lesson.duration,
                                      day:       this.lesson.day
                                    };
            this.LessonApplicationService.CheckAvailability(availabilityCheck).then(response => {
              if(response._body == 'Available') {
                console.log(this.lesson);
                this.LessonApplicationService.AttemptLessonBooking(this.lesson).then(response => {
                  console.log(response);
                  if(response.status) {
                    var link = ['/Confirmation'];
                    this.Router.navigate(link);
                  } else {
                    this.isValid = response.errorArray;
                    this.submitted = false;
                    this.error = this.isValid.errorMessage;
                  }
                }).catch(() => {
                  this.submitted = false;
                  this.error = 'An error has occured. Please try again later';
                });
              } else {
                this.submitted = false;
                this.error = 'Timeslot not Available.';
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