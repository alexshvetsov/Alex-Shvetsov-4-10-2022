import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { forecastDetails } from 'src/app/utilitis/models/dayForecast.interface';
import { Store } from '@ngrx/store';
import * as FromApp from '../../store/app.reducer';
import { Subscription, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import * as AppStateActions from '../../store/app-store/app.actions';

@Component({
  selector: 'app-day-forecast-card',
  templateUrl: './day-forecast-card.component.html',
  styleUrls: ['./day-forecast-card.component.scss'],
})
export class DayForecastCardComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() date: string = new Date().toString();
  @Input() location: string;
  @Input() forecast: forecastDetails;
  @Input() night: forecastDetails;
  @Input() day: forecastDetails;
  subscription: Subscription;
  temperatureUnits: string;
  isDay: boolean = true;
  navigationUrl: string;

  constructor(private store: Store<FromApp.AppState>, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.store.select('appState').subscribe((stateData) => {
      this.temperatureUnits = stateData.units;
    });
    if (!this.forecast) {
      this.forecast = this.day;
    }
    this.navigationUrl = '/forecast/' + this.id;
  }

  isDayToggle() {
    this.isDay = !this.isDay;
    this.forecast = this.isDay ? this.day : this.night;
  }

  navigate(id: string) {
    this.store.dispatch(
      new AppStateActions.ChangeCurrentLocation({
        id: id,
        name: this.location,
      })
    );
    this.router.navigate(['forecast']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
