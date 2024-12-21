import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopulationManagementComponent } from "./population-management/population-management.component";
import { BasicDataManagmentComponent } from "./basic-data-management/basic-data-management.component";
import { NationAssignComponent } from './nation-assign/nation-assign.component';

import { DictionaryManagementComponent } from './dictionary-management/dictionary-management.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [NationAssignComponent],
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'study';
}
