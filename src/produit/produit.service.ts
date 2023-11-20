import { Produit } from './produit';

export interface ProduitService{
    add(
        libelle: string,
        description:string,
        prix: number,
        date_achat: string,
        date_peremption: string | null,
        url_image: string,
        id_cat: number
    ): Promise<Produit | null>;
    update(
        id: number,
        libelle: string | null,
        description:string | null,
        prix: number | null,
        date_achat: string | null,
        date_peremption: string | null,
        url_image: string | null,
        id_cat: number | null
    ): Promise<boolean>;
    delete(id: number): Promise<boolean>;
    getById(id: number): Promise<Produit | null>;
    getByCat(id_cat: number): Promise<Produit[] | null>;
    getAll(): Promise<Produit[] | null>;
}