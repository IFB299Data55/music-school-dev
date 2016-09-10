var acceptStudentsRouting = [
	{
		path: 'all',
		component: app.ViewAllStudentsComponent
	}
	, {
		path: 'individual',
		component: app.ViewIndividualStudentComponent
	}
	, {
		path: '',
		redirectTo: 'all',
		pathMatch: 'full'
	}
];