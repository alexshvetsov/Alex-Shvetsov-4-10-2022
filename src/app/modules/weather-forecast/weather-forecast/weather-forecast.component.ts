import { Component, OnInit } from '@angular/core';
import { WeatherForecastService } from 'src/app/utilitis/services/weather-forecast.service';
import { of, BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { LocationInterface } from 'src/app/utilitis/models/locationInterface';
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
      day: {icon:1, temperature: 55, description: 'Partly sunny' },
      night: { icon:12,temperature: 40, description: 'Mostly clear' },
    },
    {
      id: 1,
      date: '2022-11-05T07:00:00.000Z',
      day: {icon:2, temperature: 55, description: 'Showers' },
      night: { icon:12,temperature: 51, description: 'Rain' },
    },
    {
      id: 2,
      date: '2022-11-06T07:00:00.000Z',
      day: {icon:3, temperature: 56, description: 'Showers' },
      night: { icon:12,temperature: 51, description: 'Mostly cloudy' },
    },
    {
      id: 3,
      date: '2022-11-07T07:00:00.000Z',
      day: {icon:21, temperature: 58, description: 'Mostly cloudy' },
      night: { icon:12,temperature: 51, description: 'Showers' },
    },
    {
      id: 4,
      date: '2022-11-08T07:00:00.000Z',
      day: {icon:13, temperature: 57, description: 'Mostly cloudy' },
      night: { icon:12,temperature: 48, description: 'Mostly clear' },
    },
  ]);
  currentLocaiton: LocationInterface={id:'215854',name:'Tel Aviv'}

  constructor(private weatherForecastService: WeatherForecastService) {}

  ngOnInit(): void {
    // this.weatherForecastService.getFutureWeather('318251').subscribe((value)=>console.log(value))
  }

  selectedCityChanged(value: LocationInterface): void {
    this.currentLocaiton=value
    this.weatherForecastService
      .getFutureWeather(value.id)
      .pipe(take(1))
      .subscribe((value) => {
        this.futureForecast$.next(value);
      });
  }
}
