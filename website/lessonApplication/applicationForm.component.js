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

          this.submitted = false;
          this.givenStartTime = '';
          this.isValid = {
            instrumentType: true,
            grade: true,
            hireType: true,
            instrumentId: true,
            day: true,
            startTime: true,
            endTime: true,
            errorMessage:''
          };

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

          this.FormIsAvailable = function() {
            if(this.UserService.IsSomeoneLoggedIn()) {
              var user = this.UserService.GetCurrentUser();
              if(user.type == 'student') {
                this.lesson.studentId = user.id;
                return true;
              }
            }
            
            return false;
          }

          this.UpdateInstrumentTypes = function() {
              this.LessonApplicationService.GetInstrumentTypes().then(response => {
                if(response.valid) {
                  this.instrumentTypeList = response.instrumentTypes;
                } else {
                  this.error = response.error;
                }
              })
              .catch(() => {
                this.error = 'Instrument Types were unable to be retrieved.';
              });
          }

          this.ResetInstrumentType = function() {
            this.lesson.hireType = '';
          }

          this.UpdateInstruments = function() {
            this.lesson.instrumentId = '';
              if(this.lesson.instrumentType) {
                this.LessonApplicationService.GetInstruments(this.lesson.instrumentType).then(response => {
                  if(response.valid) {
                    this.instrumentList = response.instruments;
                  } else {
                    this.error = response.error;
                  }
                })
                .catch(() => {
                  this.error = 'Instrument list was unable to be retrieved.';
                });
              }
          }

          this.SelectInstrument = function(id) {
              this.lesson.instrumentId = id;
          }
	      }
      ]
    });
    app.ApplicationFormComponent.prototype.ngOnInit = function() {
      this.UpdateInstrumentTypes();
    };
})(window.app || (window.app = {}));