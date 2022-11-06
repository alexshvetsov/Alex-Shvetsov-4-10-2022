import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteLocationsRoutingModule } from './favorite-locations-routing.module';
import { FavoriteLocationsComponent } from './favorite-locations/favorite-locations.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    FavoriteLocationsComponent
  ],
  imports: [
    CommonModule,
    FavoriteLocationsRoutingModule,
    CoreModule
  ]
})
export class FavoriteLocationsModule { }
