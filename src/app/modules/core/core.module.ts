import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AutocompleteInputComponent } from 'src/app/components/autocomplete-input/autocomplete-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DayForecastCardComponent } from 'src/app/components/day-forecast-card/day-forecast-card.component';
import { WeatherIconPipe } from 'src/app/utilitis/pipes/weather-icon.pipe';
import { TemperatureUnitsPipe } from 'src/app/utilitis/pipes/temperature-units.pipe';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AutocompleteInputComponent,
    DayForecastCardComponent,
    WeatherIconPipe,
    TemperatureUnitsPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule
  ],
  exports: [
    MaterialModule,
    AutocompleteInputComponent,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    DayForecastCardComponent,
    WeatherIconPipe,
    TemperatureUnitsPipe,
    RouterModule

  ],
})
export class CoreModule {}
