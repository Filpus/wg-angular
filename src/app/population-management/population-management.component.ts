import { Component, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddEditPopDialogComponent } from '../add-edit-pop-dialog/add-edit-pop-dialog.component';
import { DeleteDialogComponent } from '../dictionary-management/delete-dialog/delete-dialog.component';
import { Culture, Religion, Group, Localisation, Population } from '../dictionary-management/model';
import { PopulationManagementService } from './population-management.service';
import { DictionaryService } from '../dictionary-management/dictionary.service';

@Component({
  selector: 'app-population-management',
  imports: [
    CommonModule,  // Wymagany do podstawowych dyrektyw Angulara (ngIf, ngFor itd.)
    MatTableModule, // Wymagany dla mat-table
    MatPaginatorModule, // Wymagany dla paginacji
    MatButtonModule, // Dla przycisków
    MatCheckboxModule, // Dla checkboxów
    MatSortModule, // Dla sortowania w tabeli
  ],
  templateUrl: './population-management.component.html',
  styleUrls: ['./population-management.component.css'],
})
export class PopulationManagementComponent {
  displayedColumns: string[] = ['select', 'group', 'culture', 'religion', 'localisation', 'satisfaction'];
  //dataSource = new MatTableDataSource<Population>([
  //  { id: 1, socialGroup: groups[0], culture: cultures[0], religion: religions[0], localisation: localisations[0], satisfaction: 75, count: 1000 },
  //  { id: 2, socialGroup: groups[1], culture: cultures[1], religion: religions[1], localisation: localisations[1], satisfaction: 60, count: 500 },
  //  { id: 3, socialGroup: groups[2], culture: cultures[2], religion: religions[2], localisation: localisations[2], satisfaction: 85, count: 200 }
  //]);

  dataSource = signal<Population[]>([]);
  groups = signal<Group[]>([]);
  religions = signal<Religion[]>([]);
  cultures = signal<Culture[]>([]);
  localisations = signal<Localisation[]>([]);
  selectedPopulations: Population[] = [];
  constructor(private populationService: PopulationManagementService, private dictionaryService: DictionaryService, public dialog: MatDialog) {
    this.loadData()
  }

  toggleSelection(row: Population): void {
    console.log(row)
    const index = this.selectedPopulations.indexOf(row);
    if (index === -1) {
      this.selectedPopulations.push(row);
    } else {
      this.selectedPopulations.splice(index, 1);
    }
  }

  loadData() {
    this.populationService.getPopulation().subscribe((populations) => this.dataSource.set(populations))
    this.dictionaryService.getGroups().subscribe((groups) => this.groups.set(groups));
    this.dictionaryService.getCultures().subscribe((cultures) => this.cultures.set(cultures));
    this.dictionaryService.getReligions().subscribe((religions) => this.religions.set(religions));
    this.dictionaryService.getLocalisations().subscribe((localisations) => this.localisations.set(localisations));
  }

  getGroupName(id: number): string {
    return this.groups().find((g) => g.id === id)?.name ?? "Brak"
  }

  getReligionName(id: number): string {
    return this.religions().find((r) => r.id === id)?.name ?? "Brak"
  }
  getCultureName(id: number): string {
    return this.cultures().find((c) => c.id === id)?.name ?? "Brak"
  }

  getLocalisationName(id: number): string {
    return this.localisations().find((c) => c.id === id)?.name ?? "Brak"
  }

  isSelected(row: Population): boolean {
    return this.selectedPopulations.includes(row);
  }

  isAllSelected(): boolean {
    return this.dataSource.length > 0 && this.selectedPopulations.length === this.dataSource.length;
  }

  isSomeSelected(): boolean {
    return this.selectedPopulations.length > 0 && !this.isAllSelected();
  }

  selectAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedPopulations = [];
    } else {
      this.selectedPopulations = [...this.dataSource()];
    }
  }

  editPopulation(editedPop: Population): void {
    this.populationService.updatePopulations([editedPop]);
    console.log('Item edited:');
    this.loadData();
  }

  deletePopulation(pops: Population[]): void {
    this.dictionaryService.deleteCultures(pops.map(p => p.id));
    console.log('Usuń populacje');
    this.loadData();
  }

  addFilter(): void {
    console.log('Dodaj filtr');
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditPopDialogComponent, {
      data: { item: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      const { item: newPopulation, count } = result;
      if (newPopulation && count > 0) {
        for (let i = 0; i < count; i++) {
          this.populationService.addPopulation(newPopulation,).subscribe({
            next: response => {
              this.dataSource.update(pops => [...pops, newPopulation,]);
            },
            error: error => {
              console.log('error');
            }
          })
        }
      }
    })

  }


  openEditDialog() {

    const dialogRef = this.dialog.open(AddEditPopDialogComponent, {
      data: { item: this.selectedPopulations[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      const { item: editedPopulation, count } = result;
      if (editedPopulation) {
        this.populationService.updatePopulations([editedPopulation]).subscribe({
          next: response => {
            this.dataSource.update(pops => pops.map(pop => pop.id === editedPopulation.id ? editedPopulation : pop));
          },
          error: error => {
            console.log('error');
          }
        })
      }
    })
  }

  openDeleteDialog() {
    if (this.selectedPopulations.length > 0) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: { items: this.selectedPopulations }
      });

      dialogRef.afterClosed().subscribe(result => {
        var dudu = this.populationService.deletePopulations(this.selectedPopulations.map(pop => pop.id))
        console.log(dudu);
        dudu.subscribe({
          next: response => {
            this.dataSource.update(currentPops =>
              currentPops.filter(pop =>
                !this.selectedPopulations.some(selected => selected.id === pop.id)
              )
            );
          },
          error: error => {
            console.log('error');
          }

        })


      })

    }
  }

}


