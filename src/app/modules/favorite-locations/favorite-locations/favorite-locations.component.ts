import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.scss']
})
export class FavoriteLocationsComponent implements OnInit {
  favoritesForecasts$:Observable<LocationForecastInterface[]>
  constructor(private store: Store<FromApp.AppState>) { }

  ngOnInit(): void {
    this.favoritesForecasts$ = this.store.select('appState').pipe(map(stateData => {
      return stateData.favorites
    }))
  }

}
