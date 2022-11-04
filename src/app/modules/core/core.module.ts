import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { AutocompleteInputComponent } from 'src/app/components/autocomplete-input/autocomplete-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DayForecastCardComponent } from 'src/app/components/day-forecast-card/day-forecast-card.component';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { WeatherIconPipe } from 'src/app/utilitis/pipes/weather-icon.pipe';

@NgModule({
  declarations: [
    AutocompleteInputComponent,
    ToolbarComponent,
    DayForecastCardComponent,
    WeatherIconPipe
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    MaterialModule,
    AutocompleteInputComponent,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ToolbarComponent,
    DayForecastCardComponent,
    WeatherIconPipe
  ],
})
export class CoreModule {}
