import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferComponent } from './offer/offer.component';
import { PopulationManagementComponent } from './population-management/population-management.component';
import { DictionaryManagementComponent } from './dictionary-management/dictionary-management.component';
import { NationAssignComponent } from './nation-assign/nation-assign.component';

export const routes: Routes = [
  { path: 'offer', component: OfferComponent },
  { path: 'population-management', component: PopulationManagementComponent },
  { path: 'dictionary-management', component: DictionaryManagementComponent },
  { path: 'nation-asign', component: NationAssignComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
