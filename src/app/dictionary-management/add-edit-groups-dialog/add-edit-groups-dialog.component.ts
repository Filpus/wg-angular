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
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-add-edit-groups-dialog',
  imports:[MatInput,MatDialogTitle, MatDialogContent, MatFormField, MatDialogActions, FormsModule],
  templateUrl: './add-edit-groups-dialog.component.html',
  styleUrl: './add-edit-groups-dialog.component.css'
})
export class AddEditGroupsDialogComponent {
  item:any;
  isEditing:boolean = false;
  constructor(
    public dialogRef: MatDialogRef<AddEditGroupsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Przygotowanie danych dla dialogu

    if (data.item === null){
      this.item = {id: 0, name: "",baseSatisfaction: 0.50, recruitmentSize: 500};
    } else {
      this.item = {id: data.item.id, baseSatisfaction: data.item.baseSatisfaction, recruitmentSize: data.item.recruitmentSize}
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
