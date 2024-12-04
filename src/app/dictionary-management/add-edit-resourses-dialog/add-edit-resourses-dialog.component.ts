import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog'; 
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogActions } from '@angular/material/dialog';
import { FormsModule, Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

import { MatSlideToggleModule, MatSlideToggle} from '@angular/material/slide-toggle';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-edit-resourses-dialog',
  imports:[MatDialogTitle, MatDialogContent, MatFormField, MatDialogActions, FormsModule, MatLabel, MatSlideToggle, ReactiveFormsModule],
  templateUrl: './add-edit-resourses-dialog.component.html',
  styleUrl: './add-edit-resourses-dialog.component.css'
})
export class AddEditResoursesDialogComponent {
  item:any;
  Resource =  new FormGroup({
    name: new FormControl('', Validators.required),
    isMain: new FormControl(false),
  });
  constructor(
    public dialogRef: MatDialogRef<AddEditResoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Przygotowanie danych dla dialogu

    if (data.item === null){
      this.item = {name: "",mainResource: false};
    } else {
      this.item = {name: data.item.name}
    }

    
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  // Zatwierdzenie i przekazanie danych
  onSubmit(): void {
    this.dialogRef.close(this.item);
  }
  booleanControl = new FormControl(false); // Domyślna wartość to false

}
