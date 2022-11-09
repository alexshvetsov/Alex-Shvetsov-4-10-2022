import { ActionReducerMap } from '@ngrx/store';
import * as FromAppState from './app-store/app.reducer';
import * as FromLoadingState from './loading-store/loading.reducer';

export interface AppState {
  appState: FromAppState.State;
  loadingState: FromLoadingState.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  appState: FromAppState.appStateReducer,
  loadingState: FromLoadingState.appStateReducer,
};
