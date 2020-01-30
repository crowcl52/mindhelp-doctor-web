import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const ACTIVATED_USER = '[User] Set';
export const DEACTIVATED_USER = '[User] UnSet';

export class SetUserAction implements Action {
    readonly type = ACTIVATED_USER;
    constructor( public user: User){}
}

export class DeactivateUserAction implements Action {
    readonly type = DEACTIVATED_USER;
}

export type actions =  SetUserAction | DeactivateUserAction ;
