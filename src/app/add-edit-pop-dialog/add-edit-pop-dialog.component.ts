import { Component, Inject } from '@angular/core';
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

import { cultures, religions, groups, localisations, Population } from '../dictionary-management/model';

@Component({
  selector: 'app-add-edit-pop-dialog',
  imports: [MatInput, MatDialogTitle, MatDialogContent, MatFormField, MatDialogActions, FormsModule, ReactiveFormsModule, CommonModule, MatSelectModule],
  templateUrl: './add-edit-pop-dialog.component.html',
  styleUrl: './add-edit-pop-dialog.component.css'
})
export class AddEditPopDialogComponent {
  item: Population;
  isEditing: boolean = false;

  groups = groups
  religions = religions
  cultures = cultures
  localisations = localisations

  constructor(
    public dialogRef: MatDialogRef<AddEditPopDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Przygotowanie danych dla dialogu

    if (data.item === null) {
      this.item = { id: 0, socialGroup: groups[0], culture: cultures[0], religion: religions[0], localisation: localisations[0], satisfaction: 50, count: 100 };
    } else {
      this.item = {
        id: data.item.id, socialGroup: data.item.socialGroup, culture: data.item.culture, religion: data.item.religion,
        localisation: data.item.localisation, satisfaction: data.item.satisfaction, count: data.item.count
      }
      this.isEditing = true;
    }


  }
  onCancel(): void {
    this.dialogRef.close();
  }

  // Zatwierdzenie i przekazanie danych
  onSubmit(): void {
    this.dialogRef.close(this.item);
  }
}
