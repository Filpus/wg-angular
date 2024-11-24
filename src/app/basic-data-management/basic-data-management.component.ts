import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { SocialGroupsComponent } from './tabs/social-groups/social-groups.component';
import { ReligionsComponent } from './tabs/religions/religions.component';
import { CulturesComponent } from './tabs/cultures/cultures.component';
import { ResourcesComponent } from './tabs/resources/resources.component';

@Component({
  selector: 'basic-data-management',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    SocialGroupsComponent,
    ReligionsComponent,
    CulturesComponent,
    ResourcesComponent
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="Grupy społeczne">
        <app-social-groups></app-social-groups>
      </mat-tab>
      <mat-tab label="Religie">
        <app-religions></app-religions>
      </mat-tab>
      <mat-tab label="Kultury">
        <app-cultures></app-cultures>
      </mat-tab>
      <mat-tab label="Zasoby">
        <app-resources></app-resources>
      </mat-tab>
    </mat-tab-group>
  `,
  styles: [
    `
      mat-tab-group {
        margin: 20px;
      }
    `
  ]
})
export class BasicDataManagmentComponent {}
