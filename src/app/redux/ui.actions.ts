import { Action } from '@ngrx/store';

export const ACTIVATED_LOADING = '[UI Loading] Loading';
export const DEACTIVATED_LOADING = '[UI Loading] End';

export class ActivateLoadingAction implements Action {
    readonly type = ACTIVATED_LOADING
}

export class DeactivateLoadingAction implements Action {
    readonly type = DEACTIVATED_LOADING;
}

export type actions =  ActivateLoadingAction | DeactivateLoadingAction;