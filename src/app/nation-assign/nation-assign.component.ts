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


  exit() { }

  save() { }
  // Kolumny do wyświetlenia
  displayedColumns: string[] = ['nation', 'person'];
}

