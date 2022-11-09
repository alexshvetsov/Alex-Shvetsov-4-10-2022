import { Action } from '@ngrx/store';
import { LocationInterface } from 'src/app/utilitis/models/location.interface';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';

export const UPDATE_FAVORITES='[app] Update Favorites'
export const TOGGLE_UNITS='[app] Toggle Units'
export const CHANGE_CURRENT_LOCATION='[app] Change Current Location'

export class UpdateFavorites implements Action {
    readonly type = UPDATE_FAVORITES;
  
    constructor(public payload: LocationForecastInterface) {}
  }
  
  export class ToggleUnits implements Action {
    readonly type = TOGGLE_UNITS;
  }

  export class ChangeCurrentLocation implements Action {
    readonly type = CHANGE_CURRENT_LOCATION;
    constructor(public payload: LocationInterface) {}

  }
  
  export type AppActions =
  | UpdateFavorites
  | ToggleUnits
  | ChangeCurrentLocation