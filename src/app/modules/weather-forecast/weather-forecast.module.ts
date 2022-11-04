import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherForecastRoutingModule } from './weather-forecast-routing.module';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';
import { CoreModule } from '../core/core.module';


@NgModule({
  declarations: [
    WeatherForecastComponent
  ],
  imports: [
    CommonModule,
    WeatherForecastRoutingModule,
    CoreModule
  ],
})
export class WeatherForecastModule { }
