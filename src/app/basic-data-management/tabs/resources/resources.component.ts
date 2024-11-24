import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
  selector: 'app-resources',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule],
  template: `
    <div class="toolbar">
      <button mat-button disabled>Usuń</button>
    </div>
    <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Nazwa</th>
        <td mat-cell *matCellDef="let element">{{ element.name }}</td>
      </ng-container>
      <ng-container matColumnDef="isMain">
        <th mat-header-cell *matHeaderCellDef>Główny zasób</th>
        <td mat-cell *matCellDef="let element">
          <mat-checkbox [checked]="element.isMain"></mat-checkbox>
        </td>
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
export class ResourcesComponent {
  displayedColumns: string[] = ['name', 'isMain'];
  dataSource = [
    { name: 'Zasób 1', isMain: true },
    { name: 'Zasób 2', isMain: false }
  ];
}
