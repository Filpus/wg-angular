import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Wymagane przez Angular Material
import { MatTableModule } from '@angular/material/table'; // Moduł tabeli
import { MatFormFieldModule } from '@angular/material/form-field'; // Moduł pól formularza
import { MatSelectModule } from '@angular/material/select'; // Moduł dla mat-select
import { MatInputModule } from '@angular/material/input'; // Dodatkowo dla innych pól tekstowych
import { CommonModule } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-nation-assign',
  templateUrl: './nation-assign.component.html',
  styleUrls: ['./nation-assign.component.css'],
  imports: [
    CommonModule,
    FormsModule, // Wymagane do użycia [(ngModel)]
    MatTableModule, // Dla tabeli
    MatFormFieldModule, // Dla mat-form-field
    MatSelectModule, // Dla mat-select
    MatInputModule // Opcjonalnie, jeśli używasz inputów
  ]
})
export class NationAssignComponent {
  // Lista krajów
  nations = [
    { name: 'Polska', selectedPerson: '' },
    { name: 'Niemcy', selectedPerson: '' },
    { name: 'Francja', selectedPerson: '' },
    { name: 'Hiszpania', selectedPerson: '' }
  ];

  // Lista osób
  users = ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Maria Lewandowska'];
  usedUsers: Set<string> = new Set<string>();


  updateOptions(usedOption: string) {

    this.usedUsers = new Set(
      this.nations
        .map(nation => nation.selectedPerson) // Pobierz wartości `selectedPerson`
        .filter(person => person !== '')     // Usuń puste wartości
    );
  }

  removeElement<T>(array: T[], value: T): T[] {
    return array.filter(item => item !== value);
  }


  disjointPart<T>(list1: T[], list2: T[]): T[] {

    const uniqueInList1 = list1.filter(item => !list2.includes(item));// Filtruj elementy, które są tylko w pierwszej liście    
    const uniqueInList2 = list2.filter(item => !list1.includes(item)); // Filtruj elementy, które są tylko w drugiej liście
    return [...uniqueInList1, ...uniqueInList2];  // Połącz obie części rozłączne
  }

  // Kolumny do wyświetlenia
  displayedColumns: string[] = ['nation', 'person'];
}

