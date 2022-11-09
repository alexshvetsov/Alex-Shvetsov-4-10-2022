import { Action } from '@ngrx/store';

export const TOGGLE_LOADING = '[app] Toggle Loading';

export class ToggleLoading implements Action {
  readonly type = TOGGLE_LOADING;
  constructor(public payload: boolean) {}
}

export type LoadingActions = ToggleLoading;
