import { Action } from '@ngrx/store';

export const ACTIVATED_LOADING = '[UI Loading] Loading';
export const DEACTIVATED_LOADING = '[UI Loading] End';
export const CHANGE_TITLE_NAV = '[UI Change Title]';

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

export type actions =  ActivateLoadingAction | DeactivateLoadingAction | ChangeTitleNav;