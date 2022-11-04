import { Component, OnInit, Input } from '@angular/core';
import { forecastDetails } from 'src/app/utilitis/models/dayForecastModel.model';

@Component({
  selector: 'app-day-forecast-card',
  templateUrl: './day-forecast-card.component.html',
  styleUrls: ['./day-forecast-card.component.scss']
})
export class DayForecastCardComponent implements OnInit {

  @Input() date:string;
  @Input() location:string;
  @Input() forecast:forecastDetails;

  constructor() { }

  ngOnInit(): void {
  }

}
