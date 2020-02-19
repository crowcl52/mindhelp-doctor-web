import * as fromUI from './ui.actions';

export interface State  {
    isLoading: boolean;
    title: string;
}

const initState:State = {
    isLoading: false,
    title: "",
}

export function uiReducer( state = initState, action: fromUI.actions ): State{
    switch(action.type){
        case fromUI.ACTIVATED_LOADING:
            return {...state, isLoading:true};
        case fromUI.DEACTIVATED_LOADING:
            return {...state, isLoading: false}
        case fromUI.CHANGE_TITLE_NAV:
            return {...state, title: action.title}
        default:
            return state;
    }
}