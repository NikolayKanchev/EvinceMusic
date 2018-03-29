import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatToolbarModule, MatCardModule, MatSelectModule} from '@angular/material';
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
    MatSelectModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class Material { }