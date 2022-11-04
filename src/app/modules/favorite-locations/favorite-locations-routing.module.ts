import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriteLocationsComponent } from './favorite-locations/favorite-locations.component';

const routes: Routes = [
  {path:'',component:FavoriteLocationsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoriteLocationsRoutingModule { }
