import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PopulationManagementComponent } from "./population-management/population-management.component";
import { OfferComponent } from './offer/offer.component';
import { HttpClient } from '@angular/common/http';
import { NationAssignComponent } from './nation-assign/nation-assign.component';

import { DictionaryManagementComponent } from './dictionary-management/dictionary-management.component';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [CommonModule, RouterOutlet, NavigationComponent],
  styleUrl: './app.component.css',


})
export class AppComponent {
  title = 'study';
}
