import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  filter,
} from 'rxjs/operators';
import { LocationInterface } from 'src/app/utilitis/models/locationInterface';
import { WeatherForecastService } from 'src/app/utilitis/services/weather-forecast.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
})
export class AutocompleteInputComponent implements OnInit {
  myControl = new FormControl('');
  options: LocationInterface[] = [
    { id: 'dd', name: 'One' },
    { id: 'dd', name: 'One' },
    { id: 'dd', name: 'One' },
  ];
  filteredOptions$: Observable<LocationInterface[]>=of([]);
  @Input() label!: string;
  @Output() selectedCity = new EventEmitter<LocationInterface>();
  constructor(private weatherForecastService: WeatherForecastService) {}

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

            if( cities && cities.length==0){
              // snack abr
            }
            if ( cities && cities.length === 1 && this.myControl.value) {
              this.myControl.patchValue(cities[0])
              const selectedCity:LocationInterface={id:cities[0].Key, name:cities[0].LocalizedName}
              console.log( this.myControl.value);
              
              this.selectedCity.emit(selectedCity && selectedCity)
            }
            return (
              cities &&
              cities.map((city: any) => {
                return { key: city.Key, name: city.LocalizedName };
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
    const option = value.option && {id:value.option.value.key, name:value.option.value.name};
    this.selectedCity.emit(option);
  }
}
