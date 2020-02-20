import * as fromUI from './ui.actions';

export interface State {
    isLoading: boolean;
    title: string;
    video: VideoSettings;
}

export interface VideoSettings {
    video: boolean;
    audio: boolean;
}

const initState: State = {
    isLoading: false,
    title: "",
    video: {
        video: true,
        audio: true
    }
}

export function uiReducer(state = initState, action: fromUI.actions): State {
    switch (action.type) {
        case fromUI.ACTIVATED_LOADING:
            return { ...state, isLoading: true };
        case fromUI.DEACTIVATED_LOADING:
            return { ...state, isLoading: false }
        case fromUI.CHANGE_TITLE_NAV:
            return { ...state, title: action.title }
        case fromUI.SET_VIDEO_SETTINGS:
            return { ...state, video: {...action.video} }
        default:
            return state;
    }
}