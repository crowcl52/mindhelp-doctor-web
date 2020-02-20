import { Action } from '@ngrx/store';
import { VideoSettings } from './ui.reducer';

export const ACTIVATED_LOADING = '[UI Loading] Loading';
export const DEACTIVATED_LOADING = '[UI Loading] End';
export const CHANGE_TITLE_NAV = '[UI Change Title]';
export const SET_VIDEO_SETTINGS = '[VIDEO CAMERA]';

export class ActivateLoadingAction implements Action {
    readonly type = ACTIVATED_LOADING
}

export class DeactivateLoadingAction implements Action {
    readonly type = DEACTIVATED_LOADING;
}

export class ChangeTitleNav implements Action {
    readonly type = CHANGE_TITLE_NAV
    constructor( public title: string){}

}

export class SetVideoSettings implements Action{
    readonly type = SET_VIDEO_SETTINGS
    constructor( public video: VideoSettings){}
}


export type actions =  ActivateLoadingAction | DeactivateLoadingAction | ChangeTitleNav | SetVideoSettings;