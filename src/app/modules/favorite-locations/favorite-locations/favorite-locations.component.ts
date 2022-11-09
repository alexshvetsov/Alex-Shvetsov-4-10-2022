import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import {Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorite-locations',
  templateUrl: './favorite-locations.component.html',
  styleUrls: ['./favorite-locations.component.scss']
})
export class FavoriteLocationsComponent implements OnInit {
  favoritesForecasts$:Observable<LocationForecastInterface[]>
  constructor(private store: Store<FromApp.AppState>,
    private router:Router) { }

  ngOnInit(): void {
    this.favoritesForecasts$ = this.store.select('appState').pipe(map(stateData => {
      if(stateData.favorites.length===0) this.router.navigate(['/forecast'])
      return stateData.favorites
    }))
  }

}
