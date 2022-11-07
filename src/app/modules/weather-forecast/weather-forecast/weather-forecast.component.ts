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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  currentLocation: LocationInterface ={id:'215854',name:'Tel Aviv'} ;
  defaultLocation: LocationInterface ={id:'215854',name:'Tel Aviv'} ;
  futureForecast$: Observable<DayForecastInterface[]>
  futureForecast: DayForecastInterface[]
  currentForecast$:Observable<LocationForecastInterface>
  currentForecast:LocationForecastInterface
  isFavorite$: Observable<boolean>;
  isFavorite: boolean;

  constructor(
    private weatherForecastService: WeatherForecastService,
    private store: Store<FromApp.AppState>,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.currentLocation= this.route.snapshot.paramMap.get('id')?{id:this.route.snapshot.paramMap.get('id'),name:''} : this.currentLocation;
    this.isFavorite$=  this.fetchDataCheckIsFavorite()
  }
  selectedCityChanged(value: LocationInterface): void {
    this.currentLocation = value;
    this.isFavorite$=  this.fetchDataCheckIsFavorite()
  }

  updateFavorites() {
    this.store.dispatch(
      new AppStateActions.UpdateFavorites({...this.currentForecast})
    );
  }

  fetchDataCheckIsFavorite():Observable<boolean>{
    return this.store.select('appState').pipe(switchMap(appState=>{
        if(appState.favorites.some(loc=>loc.id===this.currentLocation.id) &&  !this.currentLocation.name){
          const location=appState.favorites.find(loc=>loc.id===this.currentLocation.id)
          this.currentLocation.id=location.id
          this.currentLocation.name=location.name
        }else{
          this.currentLocation= !!this.currentLocation.name?this.currentLocation :this.defaultLocation
        }

        return this.weatherForecastService.getFutureWeather(this.currentLocation.id).pipe(switchMap((forecast:DayForecastInterface[])=>{
          this.futureForecast=forecast
          return this.weatherForecastService.getCurrentWeather(this.currentLocation).pipe(switchMap((currentForecast:LocationForecastInterface)=>{
            this.currentForecast=currentForecast
            this.isFavorite=appState.favorites.some(loc=>loc.id===this.currentLocation.id)
            return of(this.isFavorite)
          }))
        }))
  
    }))
  }
}
