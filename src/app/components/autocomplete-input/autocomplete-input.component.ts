import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { LocationInterface } from 'src/app/utilitis/models/location.interface';
import { WeatherForecastService } from 'src/app/utilitis/services/weather-forecast.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
})
export class AutocompleteInputComponent implements OnInit {
  searchControl = new FormControl('');
  filteredOptions$: Observable<LocationInterface[]> = of([]);
  currentCity: LocationInterface;
  @Input() label!: string;
  @Output() selectedCity = new EventEmitter<LocationInterface>();

  constructor(private weatherForecastService: WeatherForecastService) {}

  ngOnInit() {
    this.filteredOptions$ = this.onSearchChanged();
  }

  onSearchChanged(): Observable<LocationInterface[]> {
    return this.searchControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((value) => {
        return this.weatherForecastService.getCityAPI(value || '').pipe(
          map((cities) => {
            debugger
            if (cities.length === 1) {
              this.selectedCity.emit(cities[0]);
            }
            return cities;
          })
        );
      })
    );
  }

  public displayFn(item: LocationInterface): string {
    return item.name;
  }

  public onValueSelected(value: MatAutocompleteSelectedEvent): void {
    const option = value.option && {
      id: value.option.value.id,
      name: value.option.value.name,
    };
    this.selectedCity.emit(option);
  }
}
