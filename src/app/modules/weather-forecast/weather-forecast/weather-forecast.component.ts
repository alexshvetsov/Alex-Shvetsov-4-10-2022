import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/utilitis/services/weather-forecast.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { take, tap, switchMap,map, } from 'rxjs/operators';
import { LocationInterface } from 'src/app/utilitis/models/location.interface';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import * as AppStateActions from '../../../store/app-store/app.actions';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';
import { DayForecastInterface } from 'src/app/utilitis/models/dayForecast.interface';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  defaultLocation: LocationInterface = { id: '215854', name: 'Tel Aviv' };
  futureForecast$: Observable<DayForecastInterface[]>
  futureForecast: DayForecastInterface[]
  currentForecast$:Observable<LocationForecastInterface>
  currentForecast:LocationForecastInterface
  isFavorite$: Observable<any>;
  isFavorite: boolean;

  constructor(
    private weatherForecastService: WeatherForecastService,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.isFavorite$=  this.fetchDataCheckIsFavorite()
  }
  selectedCityChanged(value: LocationInterface): void {
    this.defaultLocation = value;
    this.weatherForecastService.getFutureWeather(value.id).pipe(
      switchMap(forecast=> this.weatherForecastService.getCurrentWeather(this.defaultLocation.id)))
      .subscribe((currentForecast) => {
        this.currentForecast=currentForecast
        this.isFavorite$= this.fetchDataCheckIsFavorite()
      });
  }

  updateFavorites() {
    this.store.dispatch(
      new AppStateActions.UpdateFavorites({...this.currentForecast, name:this.defaultLocation.name})
    );
  }

  fetchDataCheckIsFavorite():Observable<any>{
    return this.store.select('appState').pipe(switchMap(appState=>{
      
      if(!appState.currentLocation && !this.currentForecast){
        console.log('if',appState);
        return this.weatherForecastService.getFutureWeather(this.defaultLocation.id).pipe(switchMap((forecast:DayForecastInterface[])=>{
          this.futureForecast=forecast
          return this.weatherForecastService.getCurrentWeather(this.defaultLocation.id).pipe(switchMap((currentForecast:LocationForecastInterface)=>{
            this.currentForecast=currentForecast
            this.isFavorite=appState.favorites.some(loc=>loc.id===currentForecast.id)
            return appState.favorites   
          }))
        }))
      }else{
        console.log('else');
        console.log(appState);
        
        this.isFavorite=appState.favorites.some(loc=>loc.id===(appState.currentLocation.id ||this.currentForecast.id))
        console.log(appState.favorites.some(loc=>loc.id===(appState.currentLocation.id ||this.currentForecast.id)));

        return of(false)}
    }))
  }
}
