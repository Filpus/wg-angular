import { Component } from '@angular/core';
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
import { cultures, religions, groups, localisations, Population } from '../dictionary-management/model';


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
  displayedColumns: string[] = ['select', 'group', 'culture', 'religion', 'localisation', 'satisfaction', 'count'];
  dataSource = new MatTableDataSource<Population>([
    { id: 1, socialGroup: groups[0], culture: cultures[0], religion: religions[0], localisation: localisations[0], satisfaction: 75, count: 1000 },
    { id: 2, socialGroup: groups[1], culture: cultures[1], religion: religions[1], localisation: localisations[1], satisfaction: 60, count: 500 },
    { id: 3, socialGroup: groups[2], culture: cultures[2], religion: religions[2], localisation: localisations[2], satisfaction: 85, count: 200 }
  ]);

  selectedPopulations: Population[] = [];
  constructor(public dialog: MatDialog) { }

  toggleSelection(row: Population): void {
    console.log(row)
    const index = this.selectedPopulations.indexOf(row);
    if (index === -1) {
      this.selectedPopulations.push(row);
    } else {
      this.selectedPopulations.splice(index, 1);
    }
  }

  isSelected(row: Population): boolean {
    return this.selectedPopulations.includes(row);
  }

  isAllSelected(): boolean {
    return this.dataSource.data.length > 0 && this.selectedPopulations.length === this.dataSource.data.length;
  }

  isSomeSelected(): boolean {
    return this.selectedPopulations.length > 0 && !this.isAllSelected();
  }

  selectAllRows(): void {
    if (this.isAllSelected()) {
      this.selectedPopulations = [];
    } else {
      this.selectedPopulations = [...this.dataSource.data];
    }
  }

  addPopulation(): void {
    console.log('Dodaj populację');
  }

  editPopulation(): void {
    if (this.selectedPopulations.length === 1) {
      console.log('Edytuj populację:', this.selectedPopulations[0]);
    }
  }

  deletePopulation(): void {
    console.log('Usuń populacje:', this.selectedPopulations);
  }

  addFilter(): void {
    console.log('Dodaj filtr');
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(AddEditPopDialogComponent, {
      data: { item: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addPopulation();
        console.log('New item added:', result);
      }
    });

  }


  openEditDialog() {

    const dialogRef = this.dialog.open(AddEditPopDialogComponent, {
      data: { item: this.selectedPopulations[0] }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.editPopulation();
        console.log('New item added:', result);
      }
    });

  }

  openDeleteDialog() {
    if (this.selectedPopulations.length > 0) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
        data: { items: this.selectedPopulations }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          console.log('Items deleted');
        }
      });
    }
  }



}
