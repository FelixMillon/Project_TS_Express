import { Client } from './client';

export interface ClientService{
    add(
        email: string,
        nom: string,
        prenom: string,
        mdp: string,
        date_naiss: string,
        ville: string,
        cp: string,
        rue: string,
        numrue: string,
        complement: string | null
    ): Promise<Client | null>;
    update(
        id: number,
        email: string | null,
        nom: string | null,
        prenom: string | null,
        date_naiss: string | null,
        ville: string | null,
        cp: string | null,
        rue: string | null,
        numrue: string | null,
        complement: string | null
    ): Promise<boolean>;
    updatePassword(id: number,oldMdp:string,newMdp: string): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Client | null>;
    getAll(): Promise<Client[] | null>;
    getByEmail(email: string): Promise<Client | null>;
}