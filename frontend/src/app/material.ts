import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatToolbarModule, MatCardModule, MatSelectModule, MatTableModule, MatListModule, MatDividerModule} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [
    MatButtonModule,
    MatToolbarModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatTableModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule,
    MatTableModule
  ]
})
export class Material { }