import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import tego modułu
import { CommonModule, NgFor } from '@angular/common';
import { AbstractControl } from '@angular/forms';
import { OfferService } from './offer.service';
import { Observable } from 'rxjs';
import { Nation, OfferedResource, OwnedResource, WantedResource, TradeAgreement,  } from './model';
import { Resource } from '../dictionary-management/model';
import { DictionaryService } from '../dictionary-management/dictionary.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css'],
  imports:[
    ReactiveFormsModule,
    NgFor,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatInputModule
  ]

})
export class OfferComponent {

  offerForm: FormGroup;
  countries = new Observable<Nation[]>
  resourceTypes = new Observable<Resource[]>
  ownedResource$: Observable<OwnedResource[]> =  new Observable<OwnedResource[]>();;
  ownedResource: OwnedResource[] = []; 

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
    this.ownedResource$ = this.offerService.getOwnedResourceById(5);
    this.ownedResource$.subscribe((data) => {
      this.ownedResource = data;  // Przypisujemy dane do lokalnej tablicy
    });
    this.offerForm.get('destinationCountry')?.setValidators([
      control => this.validateDestinationCountry(control as FormControl),
    ]);
  }
  
  // Funkcja walidująca
  get offeredResources(): FormArray {
    return this.offerForm.get('offeredResources') as FormArray;
  }

  get requestedResources(): FormArray {
    return this.offerForm.get('requestedResources') as FormArray;
  }

  addOfferedResource() {
    const resourceGroup = this.fb.group({
      type: ['', [Validators.required, this.validateUniqueResource.bind(this)]], // Typ zasobu
      quantity: [0, [Validators.min(0), (control : AbstractControl) => this.validateOfferedQuantity(control)]],
    });


  
    this.offeredResources.push(resourceGroup);
  }
  
  addRequestedResource() {
    const resourceGroup = this.fb.group({
      type: ['', [Validators.required, this.validateUniqueResource.bind(this)]], // Typ zasobu
      quantity: [0, [Validators.min(0)]],
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


  // Walidacja: nie można wybrać własnego kraju
  validateDestinationCountry(control: FormControl): { [key: string]: boolean } | null {
    if (control.value === this.nationId) {
      return { invalidCountry: true };
    }
    return null;
  }

  getOwnedAmount(resourceId: string | null): number {
    if (!resourceId) return 0;
    const resource = this.ownedResource.find((r) => r.resourceId === Number(resourceId));
    return resource ? resource.amount : 0;
  }
  
  onResourceTypeChange(resourceId: string, index: number, type: 'offered' | 'requested') {
    const control = type === 'offered' ? this.offeredResources.at(index) : this.requestedResources.at(index);
    const ownedAmount = this.getOwnedAmount(resourceId);
  
    if (control) {
      const quantityControl = control.get('amount');
      if (quantityControl) {
        // Walidacja ilości względem posiadanych zasobów
        if (quantityControl.value > ownedAmount) {
          quantityControl.setValue(ownedAmount);
        }
      }
    }
  }
  

  hasExceededMaxError(resource: AbstractControl): boolean {
    return resource.get('quantity')?.hasError('maxExceeded') ?? false;
  }
  

  // Walidacja: nie można wybrać tego samego zasobu dwa razy
  validateUniqueResource(control: FormControl): { [key: string]: boolean } | null {
    const type = control.value;
    const allTypes = [
      ...this.offeredResources.controls.map((c) => c.get('type')?.value),
      ...this.requestedResources.controls.map((c) => c.get('type')?.value),
    ];
  
    const occurrences = allTypes.filter((t) => t === type).length;
  
    if (occurrences > 1) {
      return { duplicateResource: true };
    }
    return null;
  }
  // Walidacja: ilość nie może przekroczyć dostępnych zasobów w ownedResource
  validateOfferedQuantity(control: AbstractControl): { [key: string]: boolean } | null {
    const parent = control.parent as FormGroup;
    if (!parent) return null;
  
    const typeControl = parent.get('type');
    const typeId = typeControl?.value;
    const quantity = control.value;
  
    const ownedAmount = this.getOwnedAmount(typeId);
  
    if (quantity > ownedAmount) {
      return { maxExceeded: true }; // Walidator zwraca błąd, jeśli ilość jest większa niż posiadana
    }
    return null;
  }
  

  submitOffer() {
    if (this.offerForm.valid) {
      // Pobierz dane formularza
      const formData = this.offerForm.value;
      const destinationCountry = formData.destinationCountry;
  
      // Tworzymy umowę handlową
      const tradeAgreement: TradeAgreement = {
        oferingNationId: this.nationId, // Twoje ID państwa
        receivingNationId: destinationCountry, // ID wybranego kraju
        isAccepted: false, // Wstępnie nie zaakceptowana
        duration: 12, // Przykładowa długość umowy, może być dynamiczna
      };
  
      // Wyślij umowę handlową
      this.offerService.createTradeAgreement(tradeAgreement).subscribe(
        (response: TradeAgreement) => {
          // Umowa została utworzona, otrzymaliśmy jej ID
          const tradeAgreementId = response.id;
          if (tradeAgreementId !== undefined)
          // Teraz przygotuj dane do wysłania: oferowane i chciane zasoby
            this.createResources(tradeAgreementId);
        },
        (error) => {
          console.error("Błąd podczas tworzenia umowy:", error);
        }
      );
    }
  }
  
  createResources(tradeAgreementId: number) {
    // Przygotuj listy oferowanych i chcianych zasobów
    const offeredResources = this.offeredResources.controls.map((control) => {
      const resourceTypeId = control.get('type')?.value;
      const quantity = control.get('quantity')?.value;
  
      return {
        resourceId: resourceTypeId,
        tradeAgreementId: tradeAgreementId,
        amount: quantity,
      };
    });
  
    const wantedResources = this.requestedResources.controls.map((control) => {
      const resourceTypeId = control.get('type')?.value;
      const quantity = control.get('quantity')?.value;
  
      return {
        resourceId: resourceTypeId,
        tradeAgreementId: tradeAgreementId,
        amount: quantity,
      };
    });
  
    // Wyślij obie listy zasobów jednocześnie
    if (offeredResources.length > 0){
      this.offerService.createOfferedResources(offeredResources).subscribe(
        (response) => {
          console.log("Zasoby oferowane utworzone:", response);
        },
        (error) => {
          console.error("Błąd podczas tworzenia zasobów oferowanych:", error);
        }
      );
    }
  
    if (wantedResources.length > 0) {
      this.offerService.createWantedResources(wantedResources).subscribe(
        (response) => {
          console.log("Zasoby chciane utworzone:", response);
        },
        (error) => {
          console.error("Błąd podczas tworzenia zasobów chcianych:", error);
        }
      );
    }
  }
  
  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }
  
}
