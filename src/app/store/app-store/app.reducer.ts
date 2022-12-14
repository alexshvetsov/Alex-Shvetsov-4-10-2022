import { LocationInterface } from 'src/app/utilitis/models/location.interface';
import { LocationForecastInterface } from 'src/app/utilitis/models/locationForecast.interface';
import * as AppActions from './app.actions';

export interface State {
  units: string;
  favorites: LocationForecastInterface[];
  currentLocation: LocationInterface;
}

const initialState: State = {
  units: 'F',
  favorites: [],
  currentLocation: { id: '215854', name: 'Tel Aviv' },
};

export function appStateReducer(
  state: State = initialState,
  action: AppActions.AppActions
) {
  switch (action.type) {
    case AppActions.TOGGLE_UNITS:
      return { ...state, units: state.units === 'C' ? 'F' : 'C' };

    case AppActions.CHANGE_CURRENT_LOCATION:
      return { ...state, currentLocation: action.payload };

    case AppActions.UPDATE_FAVORITES:
      const location = state.favorites.find(
        (loc) => loc.id === action.payload.id
      );
      let newFavorites: LocationForecastInterface[];
      if (location) {
        newFavorites = state.favorites.filter((loc) => loc.id !== location.id);
      } else {
        newFavorites = [...state.favorites, action.payload];
      }
      return { ...state, favorites: newFavorites };
    default:
      return state;
  }
}
