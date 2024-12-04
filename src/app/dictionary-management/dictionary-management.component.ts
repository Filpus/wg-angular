import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCulturesDialogComponent } from './add-edit-cultures-dialog/add-edit-cultures-dialog.component';
import { AddEditGroupsDialogComponent } from './add-edit-groups-dialog/add-edit-groups-dialog.component';
import { AddEditReligionsDialogComponent } from './add-edit-religions-dialog/add-edit-religions-dialog.component';
import { AddEditResoursesDialogComponent } from './add-edit-resourses-dialog/add-edit-resourses-dialog.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatCheckbox } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
interface Group {
  name: string;
  baseSatisfaction: number;
  recruitmentSize: number;
}

interface Religion {
  name: string;
}

interface Culture {
  name: string;
}

interface Resource {
  name: string;
  mainResource: boolean;
}

@Component({
  selector: 'app-dictionary-management',
  imports:[MatTableModule, MatCheckbox, FormsModule, CommonModule],
  templateUrl: './dictionary-management.component.html',
  styleUrls: ['./dictionary-management.component.css']
})
export class DictionaryManagementComponent {
  groups = new MatTableDataSource<Group>([
    { name: 'Group 1', baseSatisfaction: 80, recruitmentSize: 100 },
    { name: 'Group 2', baseSatisfaction: 90, recruitmentSize: 150 }
  ]);
  
  religions = new MatTableDataSource<Religion>([
    { name: 'Religion 1' },
    { name: 'Religion 2' }
  ]);
  
  cultures = new MatTableDataSource<Culture>([
    { name: 'Culture 1' },
    { name: 'Culture 2' }
  ]);
  
  resources = new MatTableDataSource<Resource>([
    { name: 'Resource 1', mainResource: true },
    { name: 'Resource 2', mainResource: false }
  ]);

  displayedColumnsGroups: string[] = ['name', 'baseSatisfaction', 'recruitmentSize'];
  displayedColumnsReligions: string[] = ['name'];
  displayedColumnsCultures: string[] = ['name'];
  displayedColumnsResources: string[] = [ 'name', 'mainResource'];

  selectedItems: any = null;
  type: string = "";
  constructor(public dialog: MatDialog) {}

  openAddDialog(type: string) {
  

    if(type === 'culture'){
      const dialogRef = this.dialog.open(AddEditCulturesDialogComponent, {
        data: { item: null}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Add item logic here based on the column type
          console.log('New item added:', result);
        }
      });
    }
  }


  openEditDialog() {
    if(this.type === 'culture'){
      const dialogRef = this.dialog.open(AddEditCulturesDialogComponent, {
        data: { item: this.selectedItems}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Add item logic here based on the column type
          console.log('New item added:', result);
        }
      });
    } else if (this.type === 'religion'){
        const dialogRef = this.dialog.open(AddEditReligionsDialogComponent, {
          data: { item: this.selectedItems}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Add item logic here based on the column type
            console.log('New item added:', result);
          }
        });
    } else if (this.type === 'group'){
        const dialogRef = this.dialog.open(AddEditGroupsDialogComponent, {
          data: { item: this.selectedItems}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Add item logic here based on the column type
            console.log('New item added:', result);
          }
        });
    }else if (this.type === 'resource'){
        const dialogRef = this.dialog.open(AddEditResoursesDialogComponent, {
          data: { item: this.selectedItems}
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Add item logic here based on the column type
            console.log('New item added:', result);
          }
        });
    }
  }

  openDeleteDialog( ) {
    if (this.selectedItems.length > 0) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: { items: this.selectedItems }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Items deleted');
        }
      });
    }
  }

  
  toggleSelection(item: any) {
    const index = this.selectedItems.indexOf(item);
    if (index === null) {
      this.selectedItems.push(item);
    } else {
      this.selectedItems.splice(index, 1);
    }
  }


  selectRow(row: any, type: string) {
    if (this.selectedItems === row ) {
      this.selectedItems = null;
      this.type = "";
    } else {
    this.selectedItems = row;
    this.type = type;
    }
  }


  getRowColor(row: any){
    if (this.isSelected(row)){
      return "Aqua";
    } else {
      return "white";
    }
  }
  isSelected(item: any): boolean {
    return this.selectedItems === item;
  }
}
