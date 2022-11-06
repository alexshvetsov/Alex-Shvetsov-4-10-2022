import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/utilitis/services/weather-forecast.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { take, tap, switchMap,map } from 'rxjs/operators';
import { LocationInterface } from 'src/app/utilitis/models/location.interface';
import { Store } from '@ngrx/store';
import * as FromApp from '../../../store/app.reducer';
import * as AppStateActions from '../../../store/app-store/app.actions';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss'],
})
export class WeatherForecastComponent implements OnInit {
  futureForecast$: BehaviorSubject<any> = new BehaviorSubject([
    {
      id: 0,
      date: '2022-11-04T07:00:00.000Z',
      day: { iconNumber: 1, temperature: 55, description: 'Partly sunny' },
      night: { iconNumber: 12, temperature: 40, description: 'Mostly clear' },
    },
    {
      id: 1,
      date: '2022-11-05T07:00:00.000Z',
      day: { iconNumber: 2, temperature: 55, description: 'Showers' },
      night: { iconNumber: 12, temperature: 51, description: 'Rain' },
    },
    {
      id: 2,
      date: '2022-11-06T07:00:00.000Z',
      day: { iconNumber: 3, temperature: 56, description: 'Showers' },
      night: { iconNumber: 12, temperature: 51, description: 'Mostly cloudy' },
    },
    {
      id: 3,
      date: '2022-11-07T07:00:00.000Z',
      day: { iconNumber: 21, temperature: 58, description: 'Mostly cloudy' },
      night: { iconNumber: 12, temperature: 51, description: 'Showers' },
    },
    {
      id: 4,
      date: '2022-11-08T07:00:00.000Z',
      day: { iconNumber: 13, temperature: 57, description: 'Mostly cloudy' },
      night: { iconNumber: 12, temperature: 48, description: 'Mostly clear' },
    },
  ]);
  currentLocaiton: LocationInterface = { id: '215854', name: 'Tel Aviv' };
  currentForecast$:Observable<LocationForecastInterface>
  currentForecast:LocationForecastInterface
  isFavorite$!: Observable<boolean>;
  isFavorite!: boolean;
  constructor(
    private weatherForecastService: WeatherForecastService,
    private store: Store<FromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.weatherForecastService.getCurrentWeather(this.currentLocaiton.id).pipe().subscribe(value=>this.currentForecast=value)
    this.weatherForecastService.getFutureWeather('318251').subscribe((value)=>console.log(value))
    this.checkIsFavorite();
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log('asds')
    //     const {latitude, longitude} = position.coords;
    //     this.weatherForecastService.getByLocation(latitude, longitude).subscribe((data: LocationInterface) => {
    //      console.log(data);

    //       this.selectedCityChanged(data);
    //     });
    //   });
    // }
  }

  checkIsFavorite(): void {
    this.store.select('appState').subscribe((appState=>{
      this.isFavorite=appState.favorites.some(loc=>this.currentForecast && loc.id==this.currentForecast.id)}))
  }

  selectedCityChanged(value: LocationInterface): void {
    this.currentLocaiton = value;
    this.weatherForecastService
      .getFutureWeather(value.id)
      .pipe(map((forecast=>this.futureForecast$.next(forecast))),
      switchMap(forecast=> this.weatherForecastService.getCurrentWeather(this.currentLocaiton.id)))
      .subscribe((currentForecast) => {
        this.currentForecast=currentForecast
        this.checkIsFavorite()
      });
  }

  updateFavorites() {
    console.log(this.currentForecast);
    
    this.store.dispatch(
      new AppStateActions.UpdateFavorites(this.currentForecast)
    );
  }
}
