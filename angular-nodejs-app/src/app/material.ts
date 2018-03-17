import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatToolbarModule, MatCardModule} from '@angular/material';
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
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule, 
    MatCardModule, 
    MatMenuModule, 
    MatIconModule, 
    MatFormFieldModule
  ]
})
export class Material { }