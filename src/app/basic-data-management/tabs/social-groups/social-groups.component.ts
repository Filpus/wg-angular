import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-social-groups',
  standalone: true,
  imports: [MatTableModule, MatButtonModule],
  template: `
    <div class="toolbar">
      <button mat-button [disabled]="!canEdit()">Edytuj</button>
      <button mat-button (click)="onAdd()">Dodaj</button>
      <button mat-button [disabled]="!canDelete()">Usuń</button>
    </div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nazwa</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>
      <ng-container matColumnDef="satisfaction">
        <th mat-header-cell *matHeaderCellDef>Bazowe zadowolenie</th>
        <td mat-cell *matCellDef="let element">{{ element.satisfaction }}</td>
      </ng-container>
      <ng-container matColumnDef="quota">
        <th mat-header-cell *matHeaderCellDef>Wielkość poboru</th>
        <td mat-cell *matCellDef="let element">{{ element.quota }}</td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styles: [
    `
      .toolbar {
        margin-bottom: 10px;
      }
    `
  ]
})
export class SocialGroupsComponent {
  displayedColumns: string[] = ['name', 'satisfaction', 'quota'];
  dataSource = [
    { name: 'Grupa A', satisfaction: 80, quota: 50 },
    { name: 'Grupa B', satisfaction: 60, quota: 30 }
  ];

  canEdit(): boolean {
    // Dodaj logikę warunków edycji
    return true;
  }

  canDelete(): boolean {
    // Dodaj logikę warunków usuwania
    return true;
  }

  onAdd(): void {
    console.log('Dodawanie nowej grupy społecznej');
  }
}
