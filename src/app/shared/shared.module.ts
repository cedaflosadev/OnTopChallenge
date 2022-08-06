import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    SearchFilterComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule

  ],
  exports: [SearchFilterComponent]
})
export class SharedModule { }
