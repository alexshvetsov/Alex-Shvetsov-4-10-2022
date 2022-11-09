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
  myControl = new FormControl('');
  filteredOptions$: Observable<LocationInterface[]> = of([]);
  currentCity:LocationInterface;
  @Input() label!: string;
  @Output() selectedCity = new EventEmitter<LocationInterface>();

  constructor(
    private weatherForecastService: WeatherForecastService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.filteredOptions$ = this.onSearchChanged();
  }

  onSearchChanged(): Observable<LocationInterface[]> {
    return this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(200),
      distinctUntilChanged(),
      switchMap((value) => {
        return this.weatherForecastService.getCityAPI(value || '').pipe(
          map((cities) => {
debugger
            if (cities && cities.length == 0 && this.myControl.value !== this.selectedCity.name) {
              this.snackBar.open('No Cities that match your term', 'close',{verticalPosition:'top',panelClass:'snackBar'});
            }
            if (cities && cities.length === 1 && this.myControl.value) {
              const selectedCity: LocationInterface = {
                id: cities[0].Key,
                name: cities[0].LocalizedName,
              };
              this.currentCity=selectedCity
              this.selectedCity.emit(selectedCity);
            }
            return (
              cities &&
              cities.map((city: any) => {
                return { id: city.Key, name: city.LocalizedName };
              })
            );
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
