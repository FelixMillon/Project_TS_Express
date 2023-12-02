import { Admin } from './admin';

export interface AdminService{
    add(
        email: string,
        nom: string,
        prenom: string,
        mdp: string,
        droits: number
    ): Promise<Admin | null>;
    update(
        id: number,
        email: string,
        nom: string,
        prenom: string
    ): Promise<boolean>;
    updatePassword(id: number,oldMdp:string,newMdp: string): Promise<boolean>;
    updateRights(id: number,droits: number): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Admin | null>;
    getAll(): Promise<Admin[] | null>;
    getByEmail(email: string): Promise<Admin | null>;
}