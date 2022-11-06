import { Action } from '@ngrx/store';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';

export const UPDATE_FAVORITES='[app] Update Favorites'
export const TOGGLE_UNITS='[app] Toggle Units'

export class UpdateFavorites implements Action {
    readonly type = UPDATE_FAVORITES;
  
    constructor(public payload: LocationForecastInterface) {}
  }
  
  export class ToggleUnits implements Action {
    readonly type = TOGGLE_UNITS;
  }
  
  export type AppActions =
  | UpdateFavorites
  | ToggleUnits