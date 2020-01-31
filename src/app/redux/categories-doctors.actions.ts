import { Action } from '@ngrx/store';
import { CategoriesDoctors } from '../models/categorie-doctor.model';

export const ACTIVATED_CATEGORIE_DOCTORS = '[Categorie Doctors] Set';
export const DEACTIVATED_CATEGORIE_DOCTORS = '[Categorie Doctors] UnSet';

export class SetCategorieDoctorsAction implements Action {
    readonly type = ACTIVATED_CATEGORIE_DOCTORS;
    constructor( public doctors: CategoriesDoctors[]){}
}

export class UnsetCategorieDoctorsAction implements Action {
    readonly type = DEACTIVATED_CATEGORIE_DOCTORS;
}

export type actions =  SetCategorieDoctorsAction | UnsetCategorieDoctorsAction ;
