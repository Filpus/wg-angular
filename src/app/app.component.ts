import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopulationManagementComponent } from "./population-management/population-management.component";
import { OfferComponent } from './offer/offer.component';
import { HttpClient  } from '@angular/common/http';
import { DictionaryManagementComponent } from './dictionary-management/dictionary-management.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports:[OfferComponent],
  styleUrl: './app.component.css',

})
export class AppComponent {
  title = 'study';
}
