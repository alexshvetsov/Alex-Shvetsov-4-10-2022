import { Pipe, PipeTransform } from '@angular/core';
export const IMG_URL = `https://apidev.accuweather.com/developers/Media/Default/WeatherIcons`;
@Pipe({
  name: 'weatherIcon'
})
export class WeatherIconPipe implements PipeTransform {


  transform(value: any): any {
    if(isNaN(+value)) return ''
    if (value < 10) {
      value = `0${value}`;
    }
    return `${IMG_URL}/${value}-s.png`;
  }

}