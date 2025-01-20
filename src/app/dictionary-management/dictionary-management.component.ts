import { Component, OnInit,Signal, signal, computed, effect } from '@angular/core';
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
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './confirmation-dialog/error-dialof.component';


@Component({
  selector: 'app-dictionary-management',
  imports:[MatTableModule, MatCheckbox, FormsModule, CommonModule],
  templateUrl: './dictionary-management.component.html',
  styleUrls: ['./dictionary-management.component.css']
})
export class DictionaryManagementComponent implements OnInit {
  // resources = new Observable<Resource[]>();
  // groups = new Observable<Group[]>();
  
  // religions =new Observable<Religion[]>();
  
  // cultures = new Observable<Culture[]>();
  resources = signal<Resource[]>([]);
  groups = signal<Group[]>([]);
  religions = signal<Religion[]>([]);
  cultures = signal<Culture[]>([]);

  
  displayedColumnsGroups: string[] = ['name', 'baseHappiness', 'volunteers'];
  displayedColumnsReligions: string[] = ['name'];
  displayedColumnsCultures: string[] = ['name'];
  displayedColumnsResources: string[] = [ 'name', 'mainResource'];

  selectedItems: any = null;
  type: string = "";
  constructor(private dictionaryService: DictionaryService, public dialog: MatDialog) {}
  



  ngOnInit(): void {
    this.loadData();
  }
    // loadData(): void {
    //   this.resources = this.dictionaryService.getResources();
    //   this.groups = this.dictionaryService.getGroups();
    //   this.cultures = this.dictionaryService.getCultures();
    //   this.religions = this.dictionaryService.getReligions();
    //   // Podobnie załaduj dane dla grup, religii, kultur
    // }
    loadData(): void {
      this.dictionaryService.getResources().subscribe((resources) => this.resources.set(resources));
      this.dictionaryService.getGroups().subscribe((groups) => this.groups.set(groups));
      this.dictionaryService.getCultures().subscribe((cultures) => this.cultures.set(cultures));
      this.dictionaryService.getReligions().subscribe((religions) => this.religions.set(religions));
    }
    


  openAddDialog(type: string) {
    switch (type) {
      case 'culture':
        var dialogRef = this.dialog.open(AddEditCulturesDialogComponent, {
          data: { item: null }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addCultures([result]).subscribe({
              next: response => {
                var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: "Kultura została poprawnie dodana"}});
                this.cultures.update(cultures => [...cultures, result]);
              },
                error: error => {
                var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Bład w trakcie dodawania kultury: \n" + error.message}});
              }
              })
          }
        })


        break;
      case 'religion':
        var dialogRef = this.dialog.open(AddEditReligionsDialogComponent, {
          data: { item: null }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addReligions([result]).subscribe({
              next: response => {
                var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: "Religia została poprawnie dodana"}});
                this.cultures.update(cultures => [...cultures, result]);
              },
                error: error => {
                var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Bład w trakcie dodawania religii: \n" + error.message}});
              }
            })

          }
        })
        break;
      case 'group':
        var dialogRef = this.dialog.open(AddEditGroupsDialogComponent, {
          data: { item: null }
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addGroups([result]).subscribe({
              next: response => {
                var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: "Grupa została poprawnie dodana"}});
                this.groups.update(groups => [...groups, result]);  
              },
                error: error => {
                var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Bład w trakcie dodawania grupy: \n" + error.message}});
              }
            })
          }
        })
        this.dictionaryService.getGroups().subscribe((groups) => this.groups.set(groups));
        break;
      case 'resource':

        var resourceDialogRef = this.dialog.open(AddEditResoursesDialogComponent, {
          data: { item: null }
        })
        resourceDialogRef.afterClosed().subscribe(result => {
          if (result) {
            this.dictionaryService.addResources([result]).subscribe({
              next: response => {
                var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: "Zasób został poprawnie dodany"}});
                this.resources.update(resources => [...resources, result]);
              },
              error: error => {
                var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Bład w trakcie dodawania zasobu: \n" + error.message}});
              }
            })
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
            this.dictionaryService.updateCultures([result]).subscribe({
              next: response => {
              var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Kultura o ID ${this.selectedItems.id} została edytowana`}});
              this.cultures.update(cultures => cultures.map(culture => culture.id === result.id ? result : culture));
            },
              error: error => {
              var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: `Błąd podczas edycji kultury o ID ${this.selectedItems.id}`}});
            }
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
            this.dictionaryService.updateReligions([result]).subscribe({
              next: response => {
              var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Religia o ID ${this.selectedItems.id} została edytowana`}});
              this.religions.update(religions => religions.map(religion => religion.id === result.id ? result : religion));
            },
              error: error => {
              var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: `Błąd podczas edycji religii o ID ${this.selectedItems.id}`}});
            }
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
            this.dictionaryService.updateGroups([result]).subscribe({
              next: response => {
              var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Grupa o ID ${this.selectedItems.id} została edytowana`}});
              this.groups.update(groups => groups.map(group => group.id === result.id ? result : group));
            },
              error: error => {
              var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: `Błąd podczas edycji grupy o ID ${this.selectedItems.id}`}});
            }
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
            this.dictionaryService.updateResources([result]).subscribe({
              next: response => {
              var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Zasób o ID ${this.selectedItems.id} został edytowany`}});
              this.resources.update(resources => resources.map(resource => resource.id === result.id ? result : resource));
            },
              error: error => {
              var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: `Błąd podczas edycji zasobu o ID ${this.selectedItems.id}`}});
            }
          })
            this.dictionaryService.getResources().subscribe((resources) => this.resources.set(resources));
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
              this.dictionaryService.deleteCultures([this.selectedItems.id]).subscribe({
                next: response => {
                  var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Zasób o ID ${this.selectedItems.id} został poprawnie usunięty`}});
                  this.cultures.update(cultures => cultures.filter(culture => culture.id !== this.selectedItems.id));
                },
                error: error => {
                  var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message: "Bład w trakcie usuwania: \ Istnieją klucze obce powiązane z elementem" + error.message}});
                }
              
              }
              
              
                
              );
              this.dictionaryService.getCultures().subscribe((cultures) => this.cultures.set(cultures));
              break;
            case 'religion':
              this.dictionaryService.deleteReligions([this.selectedItems.id]).subscribe({
                next: response => {
                  var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Zasób o ID ${this.selectedItems.id} został poprawnie usunięty`}});
                  this.religions.update(religions => religions.filter(religion => religion.id !== this.selectedItems.id));
                },
                error: error => {
                  var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message:"Bład w trakcie usuwania: \ Istnieją klucze obce powiązane z elementem" + error.message}});
                }
             }
              );
              this.dictionaryService.getReligions().subscribe((religions) => this.religions.set(religions));
              break;
            case 'group':
              this.dictionaryService.deleteGroups([this.selectedItems.id]).subscribe({
                next: response => {
                  var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Zasób o ID ${this.selectedItems.id} został poprawnie usunięty`}});
                  this.groups.update(groups => groups.filter(group => group.id !== this.selectedItems.id));
                },
                error: error => {
                  var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message:"Bład w trakcie usuwania: \n Istnieją klucze obce powiązane z elementem" + error.message}});
                }
              }
              );
              this.dictionaryService.getGroups().subscribe((groups) => this.groups.set(groups));
              break;
            case 'resource':
              this.dictionaryService.deleteResources([this.selectedItems.id]).subscribe({
                next: response => {
                  var completeDialogRef = this.dialog.open(ConfirmationDialogComponent, {data: {message: `Zasób o ID ${this.selectedItems.id} został poprawnie usunięty`}});
                  this.resources.update(resources => resources.filter(resource => resource.id !== this.selectedItems.id));
                },
                error: error => {
                  var errorDialogRef = this.dialog.open(ErrorDialogComponent, {data: {message:"Bład w trakcie usuwania: \n Istnieją klucze obce powiązane z elementem" }});
                }
              }
              );
              this.dictionaryService.getResources().subscribe((resources) => this.resources.set(resources));
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
