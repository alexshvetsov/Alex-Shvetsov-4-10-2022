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
  // [
  //   {
  //     id: 0,
  //     date: '2022-11-04T07:00:00.000Z',
  //     day: { iconNumber: 1, temperature: 55, description: 'Partly sunny' },
  //     night: { iconNumber: 12, temperature: 40, description: 'Mostly clear' },
  //   },
  //   {
  //     id: 1,
  //     date: '2022-11-05T07:00:00.000Z',
  //     day: { iconNumber: 2, temperature: 55, description: 'Showers' },
  //     night: { iconNumber: 12, temperature: 51, description: 'Rain' },
  //   },
  //   {
  //     id: 2,
  //     date: '2022-11-06T07:00:00.000Z',
  //     day: { iconNumber: 3, temperature: 56, description: 'Showers' },
  //     night: { iconNumber: 12, temperature: 51, description: 'Mostly cloudy' },
  //   },
  //   {
  //     id: 3,
  //     date: '2022-11-07T07:00:00.000Z',
  //     day: { iconNumber: 21, temperature: 58, description: 'Mostly cloudy' },
  //     night: { iconNumber: 12, temperature: 51, description: 'Showers' },
  //   },
  //   {
  //     id: 4,
  //     date: '2022-11-08T07:00:00.000Z',
  //     day: { iconNumber: 13, temperature: 57, description: 'Mostly cloudy' },
  //     night: { iconNumber: 12, temperature: 48, description: 'Mostly clear' },
  //   },
  // ]
  // );

  constructor(
    private weatherForecastService: WeatherForecastService,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit(): void {
      // this.weatherForecastService.getCurrentWeather(this.defaultLocation.id),
      // this.weatherForecastService.getFutureWeather(this.defaultLocation.id),
    this.isFavorite$=  this.fetchDataCheckIsFavorite()


  }

  // checkIsFavorite(): Observable<boolean> {
  // return  this.store.select('appState').pipe(map(appState=>{
    
  //     this.isFavorite=appState.favorites.some(loc=>this.currentForecast && loc.id==this.currentForecast.id)
  //     return appState.favorites.some(loc=>this.currentForecast && loc.id==this.currentForecast.id)}))
  // }

  selectedCityChanged(value: LocationInterface): void {
    this.defaultLocation = value;
    this.weatherForecastService
      .getFutureWeather(value.id)
      .pipe(switchMap(forecast=> this.weatherForecastService.getCurrentWeather(this.defaultLocation.id)))
      .subscribe((currentForecast) => {
        this.currentForecast=currentForecast
        this.isFavorite$= this.fetchDataCheckIsFavorite()
      });
  }

  updateFavorites() {
    console.log(this.currentForecast);
    
    this.store.dispatch(
      new AppStateActions.UpdateFavorites({...this.currentForecast, name:this.defaultLocation.name})
    );
  }

  fetchDataCheckIsFavorite():Observable<any>{
    return this.store.select('appState').pipe(switchMap(appState=>{
      console.log('asd');
      if(!appState.currentLocation && !this.currentForecast){
        
        return this.weatherForecastService.getFutureWeather(this.defaultLocation.id).pipe(switchMap((forecast:DayForecastInterface[])=>{
          this.futureForecast=forecast
          return this.weatherForecastService.getCurrentWeather(this.defaultLocation.id).pipe(switchMap((currentForecast:LocationForecastInterface)=>{
            this.currentForecast=currentForecast
            console.log(appState.favorites.some(loc=>loc.id===currentForecast.id));
            this.isFavorite=appState.favorites.some(loc=>loc.id===currentForecast.id)
            console.log('akkksd');
            
            return appState.favorites   
          }))
        }))
      }else{
        this.isFavorite=appState.favorites.some(loc=>loc.id===this.currentForecast.id)
        return of(false)}
    }))
  }
}
