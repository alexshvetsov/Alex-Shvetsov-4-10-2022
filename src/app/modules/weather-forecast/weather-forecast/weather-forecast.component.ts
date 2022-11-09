import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/utilitis/services/weather-forecast.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { take, tap, switchMap,map, } from 'rxjs/operators';
import { LocationInterface } from 'src/app/utilitis/models/location.interface';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import * as AppStateActions from '../../../store/app-store/app.actions';
import * as AppLoadingActions from '../../../store/loading-store/loading.actions';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';
import { DayForecastInterface } from 'src/app/utilitis/models/dayForecast.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  
  currentLocation: LocationInterface ;
  currentLocation$: Observable<LocationInterface> ;
  futureForecast: DayForecastInterface[]
  currentForecast:LocationForecastInterface
  isFavorite$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isLoading:boolean=false
  isFavorite:boolean=false

  constructor(
    private weatherForecastService: WeatherForecastService,
    private store: Store<FromApp.AppState>,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    // this.currentLocation= this.route.snapshot.paramMap.get('id')?{id:this.route.snapshot.paramMap.get('id'),name:''} : this.currentLocation;

    this.currentLocation$=this.getForecast()
    this.isLoading$=this.store.select('loadingState').pipe(map(value=>value.loading))
  }

  selectedCityChanged(value: LocationInterface): void {
    this.currentLocation = value;
    this.store.dispatch(
      new AppStateActions.ChangeCurrentLocation({
        id: value.id,
        name: value.name,
      })
    );
  }

  getForecast():Observable<LocationInterface>{
    return this.store.select('appState').pipe(switchMap((appState)=>{
      if(this.futureForecast && appState.currentLocation.id ===this.futureForecast[0].locationId){
        this.isFavorite=appState.favorites.some(loc=>loc.id===appState.currentLocation.id)
        return of(appState.currentLocation)
      }
      this.store.dispatch(new AppLoadingActions.ToggleLoading(true))
    return this.weatherForecastService.getCurrentWeather(appState.currentLocation).pipe(switchMap((currentForecast:LocationForecastInterface)=>{
      this.currentForecast=currentForecast
      return this.weatherForecastService.getFutureWeather(appState.currentLocation).pipe(switchMap((futureForecast:DayForecastInterface[])=>{
        this.futureForecast=futureForecast
        this.isFavorite=appState.favorites.some(loc=>loc.id===appState.currentLocation.id)
      this.store.dispatch(new AppLoadingActions.ToggleLoading(false))

        return of(appState.currentLocation)
      }))
    }))
   }))
  }

  updateFavorites() {
    this.store.dispatch(
      new AppStateActions.UpdateFavorites({...this.currentForecast})
    );
  }


}
