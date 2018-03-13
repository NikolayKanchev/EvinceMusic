import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule, MatToolbarModule, MatCardModule} from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule, MatMenuModule, MatIconModule]
})
export class Material { }