import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Wymagane przez Angular Material
import { MatColumnDef, MatTableModule } from '@angular/material/table'; // Moduł tabeli
import { MatFormFieldModule } from '@angular/material/form-field'; // Moduł pól formularza
import { MatSelectModule } from '@angular/material/select'; // Moduł dla mat-select
import { MatInputModule } from '@angular/material/input'; // Dodatkowo dla innych pól tekstowych
import { CommonModule } from '@angular/common';
import { MatSelectChange } from '@angular/material/select';
import { NationAssignService } from './nation-assign.service';
import { MatDialog } from '@angular/material/dialog';
import { Nation, User, AccessToNation } from './nation-model';
import { forkJoin } from 'rxjs';

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

  nations = signal<Nation[]>([]);
  users = signal<User[]>([]);
  acces = signal<AccessToNation[]>([]);
  assignedUsers: { [nationId: number]: number | null } = {};
  newUsers: { [nationId: number]: number | null } = {};


  usedUsers: Set<string> = new Set<string>();

  constructor(private nationService: NationAssignService, public dialog: MatDialog) {
    this.loadData()
  }

  getAssignedUser(nationId: number) {
    const accessRecord = this.acces().find(
      (record) => record.nationId === nationId && record.isActive
    );
    return accessRecord ? accessRecord.userId : null;

  }

  getUserNameOfNation(nationRowId: number) {
    var nation = this.nations()[nationRowId]
    const accessRecord = this.acces().find(
      (record) => record.nationId === nation.id && record.isActive
    );

    if (accessRecord != null) {
      return this.users().filter((u) => u.id === accessRecord?.userId)[0].name
    }
    else {
      return ""
    }
  }

  updateOptions(selectedUserId: number, nationId: number): void {
    if (selectedUserId != -1) {
      this.assignedUsers[nationId] = selectedUserId;
    }
    this.newUsers[nationId] = selectedUserId;

    // Aktualizacja listy użytych użytkowników lokalnie
    this.usedUsers = new Set(
      Object.values(this.assignedUsers)
        .map(userId => this.users().find(user => user.id === userId)?.name ?? '')
    );

    console.log(this.usedUsers)
  }

  getRecordsToHandle(assignedUsers: { [nationId: number]: number | null }) {
    const filteredRecords: { [nationId: number]: number } = {};

    // Iterujemy po wszystkich kluczach w obiekcie assignedUsers
    for (const nationId in assignedUsers) {
      if (assignedUsers[nationId] !== null) {
        // Jeśli wartość nie jest null, dodajemy ją do filteredRecords
        filteredRecords[nationId] = assignedUsers[nationId];
      }
    }

    return filteredRecords;
  }

  getReplacementRecords(assignedUsers: { [nationId: number]: number }) {
    const records: { [nationId: number]: number } = {}

    for (const nationId in assignedUsers) {
      if (this.acces().find(a => a.nationId == parseInt(nationId) && a.isActive == true)) {
        records[nationId] = assignedUsers[nationId]
      }
    }

    return records
  }

  getRecordsNotInSmaller(largeDict: { [nationId: number]: number }, smallDict: { [nationId: number]: number }) {
    const result: { [nationId: number]: number } = {};

    // Iterujemy po kluczach większego słownika
    for (const key in largeDict) {
      // Sprawdzamy, czy dany klucz nie istnieje w małym słowniku lub ma inną wartość
      if (!(key in smallDict)) {
        result[key] = largeDict[key]; // Dodajemy rekord do wynikowego obiektu
      }
    }

    return result;
  }


  saveChanges() {
    var recordsToHandle = this.getRecordsToHandle(this.newUsers);
    var recordsToReplace = this.getReplacementRecords(recordsToHandle);
    var recordsToPost = this.getRecordsNotInSmaller(recordsToHandle, recordsToReplace);

    const keysOfRecordsToPost = Object.keys(recordsToPost).map(key => parseInt(key));

    var assignmentsToPost: AccessToNation[] = [];

    for (var i = 0; i < keysOfRecordsToPost.length; i++) {
      const natId = keysOfRecordsToPost[i];  // Bezpośredni dostęp do klucza
      var Nid = natId;
      var userId = this.users()[recordsToPost[natId] - 1].id;
      var isActive = true;
      var dateAcquired = new Date();

      assignmentsToPost.push({
        id: 0, // Nowe przypisanie (id będzie generowane przez backend)
        nationId: Nid,
        userId: userId,
        isActive: isActive,
        dateAcquired: dateAcquired
      });
    }


    var assignmentsToReplace: AccessToNation[] = [];
    const keysOfRecordsToReplace = Object.keys(recordsToReplace).map(key => parseInt(key));

    for (var i = 0; i < keysOfRecordsToReplace.length; i++) {

      const natId = keysOfRecordsToReplace[i];
      if (recordsToReplace[natId] != -1) {  // Bezpośredni dostęp do klucza
        var Nid = natId;
        var userId = this.users()[recordsToReplace[natId] - 1].id;
        var isActive = true;
        var dateAcquired = new Date();

        assignmentsToReplace.push({
          id: 0, // Nowe przypisanie (id będzie generowane przez backend)
          nationId: Nid,
          userId: userId,
          isActive: isActive,
          dateAcquired: dateAcquired
        });
      }
    }

    const assignmentsToPut: AccessToNation[] = [];

    for (const nationId in recordsToReplace) {
      const activeAccessRecord = this.acces().find(
        (record) => record.nationId === parseInt(nationId) && record.isActive
      );

      if (activeAccessRecord) {
        // Jeśli taki rekord istnieje, tworzymy nowy obiekt z isActive ustawionym na false
        assignmentsToPut.push({
          ...activeAccessRecord,  // Kopiujemy wszystkie właściwości
          isActive: false,        // Zmieniamy isActive na false
        });
      }
    }


    if (assignmentsToPut.length > 0) {
      this.nationService.updateAccessToNations(assignmentsToPut).subscribe({
        next: (response) => {
          this.acces.set([...this.acces(), ...assignmentsToPut]);
          console.log('Put dpowiedz bazy:', response);
        },
        error: (err) => {
          console.error('Błąd podczas zapisywania zmian:', err);
        }
      });
    }

    if (assignmentsToPost.length > 0) {
      this.nationService.addAccessToNations(assignmentsToPost).subscribe({
        next: (response) => {
          this.acces.update(acces => [...acces, ...assignmentsToPost]);
          console.log('Post odpowiedz bazy:', response);
        },
        error: (err) => {
          console.error('Błąd podczas zapisywania zmian:', err);
        }
      });
    }

    if (assignmentsToReplace.length > 0) {
      this.nationService.addAccessToNations(assignmentsToReplace).subscribe({
        next: (response) => {
          this.acces.update(acces => [...acces, ...assignmentsToReplace]);
          console.log('Replace odpowiedz bazy:', response);
        },
        error: (err) => {
          console.error('Błąd podczas zapisywania zmian:', err);
        }
      });
    }


    this.loadData();
  }




  loadData() {
    forkJoin({
      nations: this.nationService.getNations(),
      access: this.nationService.getAccessToNation(),
      users: this.nationService.getUsers(),
    }).subscribe(({ nations, access, users }) => {
      this.nations.set(nations);
      this.acces.set(access);
      this.users.set(users);

      // Inicjalizacja przypisanych użytkowników
      nations.forEach((nation) => {
        const accessRecord = access.find(
          (record) => record.nationId === nation.id && record.isActive
        );
        this.assignedUsers[nation.id] = accessRecord ? accessRecord.userId : null;
      });

      this.usedUsers = new Set(
        Object.values(this.assignedUsers)
          .map(userId => this.users().find(user => user.id === userId)?.name ?? '')
      );
    });
  }

  getUsersWithNationAccess(): User[] {
    this.loadData();
    const allAccess = this.acces();
    const allUsers = this.users();

    // Filtracja użytkowników z dostępem do co najmniej jednego państwa
    return allUsers.filter(user => {
      return allAccess.some(access => access.userId === user.id && access.isActive);
    });
  }

  exit() { }

  save() { }
  // Kolumny do wyświetlenia
  displayedColumns: string[] = ['nation', 'person'];
}

