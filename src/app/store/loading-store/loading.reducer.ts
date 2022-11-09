import * as LoadingActions from './loading.actions';

export interface State {
  loading: boolean;

}

const initialState: State = {
  loading: false

};

export function appStateReducer(
  state: State = initialState,
  action: LoadingActions.LoadingActions
) {
  switch (action.type) {
    case LoadingActions.TOGGLE_LOADING:
      return { ...state, loading: action.payload };
    
    default:
      return state;
  }
}
