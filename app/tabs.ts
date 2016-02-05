// based on:
// http://blog.thoughtram.io/angular/2015/04/09/developing-a-tabs-component-in-angular-2.html

import {Component, Input, provide} from 'angular2/core';

@Component({
  selector: 'tabs',
  template: `
    <ul class="nav nav-tabs">
      <li *ngFor="#tab of tabs" (click)="selectTab(tab)" [class.active]="tab.active">
        <a href="#">{{tab.title}}</a>
      </li>
    </ul>
    <ng-content></ng-content>
  `,
  providers: [provide(Tabs, {useValue: this})]
})
export class Tabs {

  tabs:Array<Tab> = [];

  selectTab(tab) {
    this.tabs.forEach((tab) => tab.active = false);
    tab.active = true;
  }

  addTab(tab: Tab) {
    if (this.tabs.length === 0) tab.active = true;
    this.tabs.push(tab);
  }
}

// !! it's very important for Tabs to come first in the file.
// Otherwise, you get dependency injection errors.
@Component ({
  selector: 'tab',
  template: `
    <div [hidden]="!active" class="pane">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {

  @Input('tab-title') title: string;
  active: boolean = false;

  constructor(tabs:Tabs) {
    console.log(`<tab> ${this.title}!`);
    tabs.addTab(this);
  }
}
