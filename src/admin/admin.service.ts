import { Admin } from './admin';



export interface AdminService{
    add(
        email: string,
        nom:string,
        prenom:string,
        mdp: string
    ): Promise<Admin | null>;

    getById(id: number): Promise<Admin | null>;

    getByEmail(email: string): Promise<Admin | null>;

    getAll(): Promise<Admin[] | null>;

    getByRights(droits: number): Promise<Admin[] | null>;

    getRights(username: string, password: string): Promise<number>;

    getTokenRights(token: string): Promise<number | null>;

    delete(id: number): Promise<boolean>;

    update(
        id: number,
        email: string | null,
        nom:string | null,
        prenom:string | null,
        droits: number | null
    ): Promise<boolean>;

    updatePassword(id: number, oldMdp: string, newMdp: string): Promise<boolean>;

    generateToken(email: string, password: string): Promise<String | null>;

    verifyToken(token: string): Promise<Boolean>;
}