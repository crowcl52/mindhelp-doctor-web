import { ActionReducerMap } from '@ngrx/store';

// reducers
import * as fromUI from './redux/ui.reducer';
import * as fromUser from './redux/user.reducer';

export interface AppState {
    ui: fromUI.State,
    user: fromUser.USerState
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    user: fromUser.userReducer
}