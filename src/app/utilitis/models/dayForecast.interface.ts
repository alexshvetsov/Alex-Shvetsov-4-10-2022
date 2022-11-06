export interface DayForecastInterface {
  id: number;
  date: string;
  day: forecastDetails;
  night:forecastDetails;  
}


export interface forecastDetails{
    temperature: number;
    description: string;
    iconNumber:number
  };