import { ActionReducerMap } from '@ngrx/store';

// reducers
import * as fromUI from './redux/ui.reducer';
import * as fromUser from './redux/user.reducer';
import * as fromCategories from './redux/categories.redcuer';
import * as fromCategoriesDoctors from './redux/categories-doctors.reducer';
import * as fromChatHistory from './redux/chat-history.reducer';

export interface AppState {
    ui: fromUI.State,
    user: fromUser.USerState,
    categories: fromCategories.CategorieState,
    cdoctors: fromCategoriesDoctors.DoctorsState,
    chatHistory: fromChatHistory.ChatHistoryState
}

export const appReducer: ActionReducerMap<AppState> = {
    ui: fromUI.uiReducer,
    user: fromUser.userReducer,
    categories: fromCategories.categoriesReducer,
    cdoctors: fromCategoriesDoctors.categoriesDoctorsReducer,
    chatHistory: fromChatHistory.categoriesDoctorsReducer
}