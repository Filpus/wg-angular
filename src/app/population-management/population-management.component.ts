import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSortModule } from '@angular/material/sort';


export interface Population {
  group: string;
  culture: string;
  religion: string;
  location: string;
  satisfaction: number;
  count: number;
}

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
  displayedColumns: string[] = ['select', 'group', 'culture', 'religion', 'location', 'satisfaction', 'count'];
  dataSource = new MatTableDataSource<Population>([
    { group: 'Grupa A', culture: 'Kultura A', religion: 'Religia A', location: 'Miasto X', satisfaction: 85, count: 100 },
    { group: 'Grupa B', culture: 'Kultura B', religion: 'Religia B', location: 'Miasto Y', satisfaction: 70, count: 150 },
  ]);
  selectedPopulations: Population[] = [];

  toggleSelection(row: Population): void {
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
  
}
