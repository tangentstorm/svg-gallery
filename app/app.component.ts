import 'rxjs/add/operator/map';
import {Component} from 'angular2/core';
import {HTTP_PROVIDERS, Http} from 'angular2/http';
import {Inject} from "angular2/core";
import {Tab, Tabs} from './tabs';

@Component({
  selector: 'my-app',
  providers: [HTTP_PROVIDERS],
  templateUrl: 'app/templates/gallery.html',
  directives: [Tab, Tabs]
})
export class AppComponent {
  categories = [];
  constructor(private http: Http) {
    http.get('gallery.json')
      .map(res => res.json())
      .subscribe(
        data => this.categories = data['categories'],
        error => console.error(error)
      );
  }
}
