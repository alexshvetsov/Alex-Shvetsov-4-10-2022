import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteLocationsRoutingModule } from './favorite-locations-routing.module';
import { FavoriteLocationsComponent } from './favorite-locations/favorite-locations.component';


@NgModule({
  declarations: [
    FavoriteLocationsComponent
  ],
  imports: [
    CommonModule,
    FavoriteLocationsRoutingModule
  ]
})
export class FavoriteLocationsModule { }
