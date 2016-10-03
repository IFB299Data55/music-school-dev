var teacherTTRouting = [
	{
		path: 'Timetable',
		component: app.TeacherTimetableComponent
	}
	, {
		path: 'lesson',
		component: app.LessonInfoComponent
	}
	, {
		path: '',
		redirectTo: 'Timetable',
		pathMatch: 'full'
	}
];