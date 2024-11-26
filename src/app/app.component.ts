import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopulationManagementComponent } from "./population-management/population-management.component";
import { BasicDataManagmentComponent } from "./basic-data-management/basic-data-management.component";
import { OfferComponent } from './offer/offer.component';

@Component({
  selector: 'app-root',
  imports: [OfferComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'study';
}
