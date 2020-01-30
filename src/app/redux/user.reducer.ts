import * as fromUser from './user.actions';
import { User } from '../models/user.model';

export interface USerState  {
    data: User;
}

const initState: USerState = {
    data: null
}

export function userReducer( state = initState, action: fromUser.actions ): USerState{
    switch(action.type){
        case fromUser.ACTIVATED_USER:
            return {data: {... action.user} };
        case fromUser.DEACTIVATED_USER:
            return initState;
        default:
            return state;
    }
}