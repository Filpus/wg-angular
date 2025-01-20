import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1 mat-dialog-title>Błąd</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Zamknij</button>
    </div>
  `,
  styles: [`
    mat-dialog-content {
      font-size: 16px;
      color: #f44336;
    }
    h1 {
      color: #f44336;
    }
  `]
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}