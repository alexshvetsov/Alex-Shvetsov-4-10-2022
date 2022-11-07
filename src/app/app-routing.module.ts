import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'forecast',
    loadChildren: () =>
      import('./modules/weather-forecast/weather-forecast.module').then(
        (m) => m.WeatherForecastModule
      ),
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./modules/favorite-locations/favorite-locations.module').then(
        (m) => m.FavoriteLocationsModule
      ),
  },
  {
    path: '',
    redirectTo: 'forecast',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
