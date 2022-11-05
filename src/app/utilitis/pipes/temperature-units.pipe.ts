import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperatureUnitsPipe'
})
export class TemperatureUnitsPipe implements PipeTransform {
 

  transform(value: number, unit: string): unknown {
    return (unit==="F"? value:Math.floor((value-32)*5/9)) + ' ' +  unit;
  }

}
