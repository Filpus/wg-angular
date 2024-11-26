import { Component } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import tego modułu
import { NgFor } from '@angular/common';
import { AbstractControl } from '@angular/forms';


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
  countries = ['Polska', 'Niemcy', 'Francja', 'Hiszpania'];
  resourceTypes = ['Produkt A', 'Produkt B', 'Usługa C', 'Usługa D'];

  constructor(private fb: FormBuilder) {
    this.offerForm = this.fb.group({
      destinationCountry: [''],
      offeredResources: this.fb.array([]),
      requestedResources: this.fb.array([]),
    });
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
