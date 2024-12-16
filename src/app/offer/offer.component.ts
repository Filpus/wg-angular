import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import tego modułu
import { NgFor } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { OfferService } from './offer.service';
import { Observable } from 'rxjs';
import { Nation, OfferedResource, OwnedResource, WantedResource, TradeAgreement,  } from './model';
import { Resource } from '../dictionary-management/model';
import { DictionaryService } from '../dictionary-management/dictionary.service';
@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  imports:[
    ReactiveFormsModule,
    NgFor
  ]

})
export class OfferComponent {

  offerForm: FormGroup;
  countries = new Observable<Nation[]>
  resourceTypes = new Observable<Resource[]>
  ownedResource = new Observable<OwnedResource[]>
  nationId = 5
  constructor(private offerService: OfferService, private dictionaryService: DictionaryService ,private fb: FormBuilder) {
    this.offerForm = this.fb.group({
      destinationCountry: [''],
      offeredResources: this.fb.array([]),
      requestedResources: this.fb.array([]),
    });
  }

  ngOnInit(){
    this.resourceTypes = this.dictionaryService.getResources()
    this.countries = this.offerService.getAllNations()
    this.ownedResource = this.offerService.getOwnedResourceById(this.nationId)
  }
  get offeredResources(): FormArray {
    return this.offerForm.get('offeredResources') as FormArray;
  }

  get requestedResources(): FormArray {
    return this.offerForm.get('requestedResources') as FormArray;
  }

  addOfferedResource() {
    const resourceGroup = this.fb.group({
      type: [''], // Typ zasobu
      quantity: [0], // Ilość
    });
    this.offeredResources.push(resourceGroup);
  }

  addRequestedResource() {
    const resourceGroup = this.fb.group({
      type: [''],
      quantity: [0],
    });
    this.requestedResources.push(resourceGroup);
  }

  removeResource(index: number, type: 'offered' | 'requested') {
    if (type === 'offered') {
      this.offeredResources.removeAt(index);
    } else if (type === 'requested') {
      this.requestedResources.removeAt(index);
    }
  }

  submitOffer() {
    console.log('Oferta:', this.offerForm.value);
  }
  
  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
}
