import { Component, OnInit } from '@angular/core';
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
import { MatPaginator } from '@angular/material/paginator'; 
import { DictionaryService } from './dictionary.service';
import { Observable } from 'rxjs';
import { Resource, Group, Religion, Culture } from './model';


@Component({
  selector: 'app-dictionary-management',
  imports:[MatTableModule, MatCheckbox, FormsModule, CommonModule],
  templateUrl: './dictionary-management.component.html',
  styleUrls: ['./dictionary-management.component.css']
})
export class DictionaryManagementComponent implements OnInit {
  resources = new Observable<Resource[]>();
  groups = new Observable<Group[]>();
  
  religions =new Observable<Religion[]>();
  
  cultures = new Observable<Culture[]>();
  
  
  displayedColumnsGroups: string[] = ['name', 'baseSatisfaction', 'recruitmentSize'];
  displayedColumnsReligions: string[] = ['name'];
  displayedColumnsCultures: string[] = ['name'];
  displayedColumnsResources: string[] = [ 'name', 'mainResource'];

  selectedItems: any = null;
  type: string = "";
  constructor(private dictionaryService: DictionaryService, public dialog: MatDialog) {}
  



  ngOnInit(): void {
    this.loadData();
  }
  loadData(): void {
    this.resources = this.dictionaryService.getResources();
    this.groups = this.dictionaryService.getGroups();
    this.cultures = this.dictionaryService.getCultures();
    this.religions = this.dictionaryService.getReligions();
    // Podobnie załaduj dane dla grup, religii, kultur
  }



  openAddDialog(type: string) {
    switch (type) {
      case 'culture':
        var dialogRef = this.dialog.open(AddEditCulturesDialogComponent, {
          data: { item: null }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addCultures([result]).subscribe(response =>{
              console.log(`Kultura ${result} została dodana:`, response);
            })
            this.cultures = this.dictionaryService.getCultures();
          }
        })


        break;
      case 'religion':
        var dialogRef = this.dialog.open(AddEditReligionsDialogComponent, {
          data: { item: null }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addReligions([result]).subscribe(response =>{
              console.log(`Religia o ID ${result} został dodany:`, response);
            })

            this.religions = this.dictionaryService.getReligions();
          }
        })
        break;
      case 'group':
        var dialogRef = this.dialog.open(AddEditGroupsDialogComponent, {
          data: { item: null }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addGroups([result]).subscribe(response =>{
              console.log(`Grupa o ID ${result} został dodany:`, response);
            })
          }
        })
        this.groups = this.dictionaryService.getGroups();
        break;
      case 'resource':

        var resourceDialogRef = this.dialog.open(AddEditResoursesDialogComponent, {
          data: { item: null }
        })
        resourceDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addResources([result]).subscribe(response =>{
              console.log(`Zasób o ID ${result} został dodany:`, response);
            })
            this.resources = this.dictionaryService.getResources();
          }

        })
      
        break;
      default:
        return;
    }
  

  }
  
  openEditDialog() {

    switch (this.type) {
      case 'culture':
        var dialogRef = this.dialog.open(AddEditCulturesDialogComponent, {
          data: { item: this.selectedItems }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.updateCultures([result]).subscribe(response =>{
              console.log(`Kultura o ID ${this.selectedItems.id} został edytowany:`, response);
            })
          }
        })
        break;
      case 'religion':
        var dialogRef = this.dialog.open(AddEditReligionsDialogComponent, {
          data: { item: this.selectedItems }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.updateReligions([result]).subscribe(response =>{
              console.log(`Religia o ID ${this.selectedItems.id} został edytowany:`, response);
            })
          }
        })
        break;
      case 'group':
        var dialogRef = this.dialog.open(AddEditGroupsDialogComponent, {
          data: { item: this.selectedItems }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.updateResources([result]).subscribe(response =>{
              console.log(`Grupa o ID ${this.selectedItems.id} został edytowany:`, response);
            })
          }
        })
        break;
      case 'resource':

        var resourceDialogRef = this.dialog.open(AddEditResoursesDialogComponent, {
          data: this.selectedItems
        })
        resourceDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.updateResources([result]).subscribe(response =>{
              console.log(`Zasób o ID ${this.selectedItems.id} został edytowany:`, response);
            })
          }
        })
      
        break;
      default:
        return;
    }
  

  }
 
  
  openDeleteDialog() {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {autoFocus: true});
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          switch (this.type) {
            case 'culture':
              this.dictionaryService.deleteCultures([this.selectedItems.id]).subscribe(response =>
                {
                  console.log(`Zasób o ID ${this.selectedItems.id} został usunięty:`, response);
                }
              
                
              );
              break;
            case 'religion':
              this.dictionaryService.deleteReligions([this.selectedItems.id]).subscribe(response =>
                {
                  console.log(`Zasób o ID ${this.selectedItems.id} został usunięty:`, response);
                }
              );
              break;
            case 'group':
              this.dictionaryService.deleteGroups([this.selectedItems.id]).subscribe(response =>
                {
                  console.log(`Zasób o ID ${this.selectedItems.id} został usunięty:`, response);
                }
              );
              break;
            case 'resource':
              this.dictionaryService.deleteResources([this.selectedItems.id]).subscribe(response =>
                {
                  console.log(`Zasób o ID ${this.selectedItems.id} został usunięty:`, response);
                }
              );
              break;
            default:
              return;
          }
        }
      });
    
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
