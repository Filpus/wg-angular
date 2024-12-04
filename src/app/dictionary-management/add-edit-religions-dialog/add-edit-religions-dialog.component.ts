import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog'; 
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatDialogActions } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms'; 
@Component({
  selector: 'app-add-edit-religions-dialog',
  imports:[MatDialogTitle, MatDialogContent, MatFormField, MatDialogActions, FormsModule],
  templateUrl: './add-edit-religions-dialog.component.html',
  styleUrl: './add-edit-religions-dialog.component.css'
})
export class AddEditReligionsDialogComponent {
  item:any;

  constructor(
    public dialogRef: MatDialogRef<AddEditReligionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Przygotowanie danych dla dialogu

    if (data.item === null){
      this.item = {name: ""};
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
}
