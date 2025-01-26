import { Component, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogActions } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select'; // Moduł dla mat-select
import { MatInput } from '@angular/material/input';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Wymagane przez Angular Material
import { MatTableModule } from '@angular/material/table'; // Moduł tabeli
import { MatFormFieldModule } from '@angular/material/form-field'; // Moduł pól formularza
import { MatInputModule } from '@angular/material/input'; // Dodatkowo dla innych pól tekstowych
import { CommonModule } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';

import { Culture, Religion, Group, Localisation, Population } from '../dictionary-management/model';
import { PopulationManagementService } from '../population-management/population-management.service';
import { DictionaryService } from '../dictionary-management/dictionary.service';

@Component({
  selector: 'app-add-edit-pop-dialog',
  imports: [MatInput, MatDialogTitle, MatDialogContent, MatFormField, MatDialogActions, FormsModule, ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './add-edit-pop-dialog.component.html',
  styleUrl: './add-edit-pop-dialog.component.css'
})
export class AddEditPopDialogComponent {
  item: Population;
  isEditing: boolean = false;

  groups = signal<Group[]>([]);
  religions = signal<Religion[]>([]);
  cultures = signal<Culture[]>([]);
  localisations = signal<Localisation[]>([]);

  constructor(private populationService: PopulationManagementService, private dictionaryService: DictionaryService,
    public dialogRef: MatDialogRef<AddEditPopDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Przygotowanie danych dla dialogu

    this.loadData()
    if (data.item === null) {
      console.log("dudu");
      this.item = { id: 0, socialGroupId: undefined, cultureId: undefined, religionId: undefined, locationId: undefined, happiness: 0 };
    } else {
      this.item = data.item;
      this.isEditing = true;
    }


  }

  loadData() {
    this.dictionaryService.getGroups().subscribe((groups) => this.groups.set(groups));
    this.dictionaryService.getCultures().subscribe((cultures) => this.cultures.set(cultures));
    this.dictionaryService.getReligions().subscribe((religions) => this.religions.set(religions));
    this.dictionaryService.getLocalisations().subscribe((localisations) => this.localisations.set(localisations));
  }

  getGroupName(id: number | undefined): string {
    if (id === undefined || id === null) {
      return "Brak";  // Jeśli id jest undefined lub null, zwróci "Brak"
    }

    return this.groups().find((g) => g.id === id)?.name ?? "Brak"
  }

  getReligionName(id?: number): string {
    return this.religions().find((r) => r.id === id)?.name ?? "Brak"
  }
  getCultureName(id?: number): string {
    return this.cultures().find((c) => c.id === id)?.name ?? "Brak"
  }

  getLocalisationName(id?: number): string {
    return this.localisations().find((c) => c.id === id)?.name ?? "Brak"
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  // Zatwierdzenie i przekazanie danych
  onSubmit(): void {
    this.dialogRef.close(this.item);
  }
}
