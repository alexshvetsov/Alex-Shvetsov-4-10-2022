import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [],
  imports: [MatToolbarModule, MatIconModule,MatButtonModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatCardModule],
  exports: [MatToolbarModule, MatIconModule,MatButtonModule,MatAutocompleteModule,MatFormFieldModule,MatInputModule,MatCardModule],
})
export class MaterialModule {}
