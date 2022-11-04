import { Action } from '@ngrx/store';
import { LocationInterface } from 'src/app/utilitis/models/locationInterface';

export const UPDATE_FAVORITES='[app] Update Favorites'
export const TOGGLE_UNITS='[app] Toggle Units'

export class UpdateFavorites implements Action {
    readonly type = UPDATE_FAVORITES;
  
    constructor(public payload: LocationInterface) {}
  }
  
  export class ToggleUnits implements Action {
    readonly type = TOGGLE_UNITS;
  }
  
  export type AppActions =
  | UpdateFavorites
  | ToggleUnits