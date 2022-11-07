import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { forecastDetails } from 'src/app/utilitis/models/dayForecast.interface';
import { Store } from '@ngrx/store';
import * as FromApp from '../../store/app.reducer';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-day-forecast-card',
  templateUrl: './day-forecast-card.component.html',
  styleUrls: ['./day-forecast-card.component.scss'],
})
export class DayForecastCardComponent implements OnInit, OnDestroy {
  @Input() id:string
  @Input() date: string = new Date().toString();
  @Input() location: string;
  @Input() forecast: forecastDetails;
  @Input() night: forecastDetails;
  @Input() day: forecastDetails;
  subscription: Subscription;
  temperatureUnits: string;
  isDay: boolean = true;

  constructor(private store: Store<FromApp.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store.select('appState').subscribe((stateData) => {
      this.temperatureUnits = stateData.units;
    });
    if (!this.forecast) {
      this.forecast = this.day;
    }
  }

  isDayToggle() {
    this.isDay = !this.isDay;
    this.forecast = this.isDay ? this.day : this.night;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
