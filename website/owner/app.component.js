(function(app) {
	//Exports our AppComponent to the app
	//AppComponent can be renamed
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      template: `<h1>{{title}}</h1>
      		   <h2>{{hero.name}}</h2>
      		   <h3>Id: {{hero.id}}</h3>
      		   <h3>name: <input [(ngModel)]="hero.name" /></h3>`
    })
    .Class({
      constructor: function() {
      	this.title = 'Tour of Heroes';
      	this.hero = new hero(1,'Anneke');
      }
    });
})(window.app || (window.app = {}));

function hero(id, name) {
	return {'id':id, 'name':name};
}