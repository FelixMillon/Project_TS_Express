import { CatPro } from './catPro';

export interface CatProService{
    add(libelle: string, description:string): Promise<CatPro | null>;
    update(id: number,libelle: string | null,description: string | null): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<CatPro | null>;
    getAll(): Promise<CatPro[] | null>;
}