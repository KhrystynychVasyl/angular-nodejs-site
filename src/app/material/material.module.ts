import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/';
import { MatBadgeModule } from '@angular/material/badge';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [
    MatIconModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    NgxPaginationModule,
    NgxSpinnerModule
  ]
})
export class MaterialModule {}
