import { LocationInterface } from 'src/app/utilitis/models/locationInterface';
import * as AppActions from './app.actions';

export interface State {
  units: string;
  favorites: LocationInterface[];
}

const initialState: State = {
  units: 'C',
  favorites: [],
};

export function shoppingListReducer(
  state: State = initialState,
  action: AppActions.AppActions
) {
  switch (action.type) {
    case AppActions.TOGGLE_UNITS:
      return { ...state,
        units:state.units ==='C'?'F':'C'
    };
    case AppActions.UPDATE_FAVORITES:
        const location=state.favorites.find(loc=>loc.id===action.payload.id)
        let newFavorites:LocationInterface[]
        if(location){
             newFavorites=state.favorites.filter(loc=>loc.id===location.id)
        }else{
             newFavorites=[...state.favorites,action.payload]
        }
        return{...state, favorites:newFavorites}
    default:
        return state;
  }
}
