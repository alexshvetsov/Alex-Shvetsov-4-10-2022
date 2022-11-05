import { ActionReducerMap } from '@ngrx/store';
import * as FromAppState from './app-store/app.reducer'
// import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';


export interface AppState {
  appState: FromAppState.State;

}

export const appReducer: ActionReducerMap<AppState> = {
  appState: FromAppState.appStateReducer,

};
