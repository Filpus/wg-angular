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
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule, MatSlideToggle} from '@angular/material/slide-toggle';
import { FormGroup } from '@angular/forms';
import { Resource } from '../model';
import { MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-add-edit-resourses-dialog',
  imports:[MatError,CommonModule,MatDialogTitle, MatDialogContent, MatFormField, MatDialogActions, FormsModule, MatLabel, MatSlideToggle, ReactiveFormsModule, MatInput],
  templateUrl: './add-edit-resourses-dialog.component.html',
  styleUrl: './add-edit-resourses-dialog.component.css'
})
export class AddEditResoursesDialogComponent {
  item:any;
  resourceForm: FormGroup;

  isEditing: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddEditResoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Przygotowanie danych dla dialogu

    if (data.item === null){
      this.item = {id: 0,name: "",isMain: false};
    } else {
      this.item = {id: data.id, name: data.name, isMain: data.isMain}
      this.isEditing = true;
    }
    this.resourceForm = new FormGroup({
      name: new FormControl(data.name || '', Validators.required),
      isMain: new FormControl(data.isMain || false)
    });

    
  }
  onCancel(): void {
    this.dialogRef.close();
  }

  // Zatwierdzenie i przekazanie danych
  onSubmit(): void {
    if (this.resourceForm.valid) {
      const resource: Resource = {
        id: this.item.id, // Możesz tu nadać ID np. 0 dla nowych zasobów
        name: this.resourceForm.value.name,
        isMain: this.resourceForm.value.isMain,
      };
      this.dialogRef.close(resource);
    }
  }
}
