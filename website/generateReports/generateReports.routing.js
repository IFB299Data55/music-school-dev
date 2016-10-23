var generateReportsRouting = [
	{
		path: 'all',
		component: app.ViewAllReportsComponent
	}
	, {
		path: 'individual/:id',
		component: app.ViewIndividualReportComponent
	}
	, {
		path: 'individual/popular-instruments-report',
		component: app.PopularInstrumentsReportComponent
	}
	, {
		path: '',
		redirectTo: 'all',
		pathMatch: 'full'
	}
];