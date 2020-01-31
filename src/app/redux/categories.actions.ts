import { Action } from '@ngrx/store';
import { Categorie } from '../models/categorie.model';

export const ACTIVATED_CATEGORIE = '[Categorie] Set';
export const DEACTIVATED_CATEGORIE = '[Categorie] UnSet';

export class SetCategorieAction implements Action {
    readonly type = ACTIVATED_CATEGORIE;
    constructor( public categorie: Categorie[]){}
}

export class UnsetCategorieAction implements Action {
    readonly type = DEACTIVATED_CATEGORIE;
}

export type actions =  SetCategorieAction | UnsetCategorieAction ;
