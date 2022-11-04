import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DayForecastInterface } from '../models/dayForecastModel.model';

@Injectable({
  providedIn: 'root',
})
export class WeatherForecastService {
  constructor(private http: HttpClient) {}

  private API_KEY = environment.API_KEY;
  private autocompleteURL =
    'http://dataservice.accuweather.com/locations/v1/cities/autocomplete';
  private currentWeatherURL =
    'http://dataservice.accuweather.com/currentconditions/v1';
  private futureWeatherURL =
    'http://dataservice.accuweather.com/forecasts/v1/daily/5day';
  private locationURL =
    'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search';

  getCityAPI(city: string): Observable<any> {
    return this.http.get(
      `${this.autocompleteURL}?apikey=${this.API_KEY}&q=${city}`
    );
  }

  getCurrentWeather(cityKey: string): Observable<any> {
    return this.http.get(
      `${this.currentWeatherURL}/${cityKey}?apikey=${this.API_KEY}`
    );
  }

  getFutureWeather(cityKey: string): Observable<DayForecastInterface> {
    return this.http
      .get(`${this.futureWeatherURL}/${cityKey}?apikey=${this.API_KEY}`)
      .pipe(
        map((value) => {
          return value['DailyForecasts'].map((value, index) => {
            return {
              id: index,
              date: new Date(value.Date),
              day: {
                temperature: value.Temperature.Maximum.Value,
                description: value.Day.IconPhrase,
                icon: value.Day.Icon,
              },
              night: {
                temperature: value.Temperature.Minimum.Value,
                description: value.Night.IconPhrase,
                icon: value.Night.Icon,
              },
            };
          });
        })
      );
  }

  getByLocation(lat: number, long: number) {
    return this.http.get(
      `${this.locationURL}?apikey=${this.API_KEY}q=${lat}%${long}`
    );
  }
}
