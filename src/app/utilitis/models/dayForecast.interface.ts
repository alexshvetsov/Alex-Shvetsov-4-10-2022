export interface DayForecastInterface {
  id: string;
  locationId:string;
  name: string;
  date: string;
  day: forecastDetails;
  night:forecastDetails;  
}


export interface forecastDetails{
    temperature: number;
    description: string;
    iconNumber:number
  };