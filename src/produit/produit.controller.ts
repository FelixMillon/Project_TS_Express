import { Produit } from './produit';
import { ProduitService } from './produit.service';
export class ProduitController {
    constructor(private produitService: ProduitService) {}

    async add(
        libelle: string,
        description:string,
        prix: number,
        date_achat: string,
        date_peremption: string | null,
        url_image: string,
        id_cat: number
    ): Promise<Produit | null> {
        this.checkID(id_cat);
        this.checkString(libelle, "libelle");
        this.checkString(description, "description");
        this.checkString(url_image, "url_image");
        this.checkDate(date_achat, "date_achat");
        this.checkPrice(prix);
        if(date_peremption != null){
            this.checkDate(date_peremption, "date_peremption");
        }
        return this.produitService.add(
            libelle,
            description,
            prix,
            date_achat,
            date_peremption,
            url_image,
            id_cat
        );
    }

    async update(
        id: number,
        libelle: string,
        description:string,
        prix: number,
        date_achat: string,
        date_peremption: string | null,
        url_image: string,
        id_cat: number
    ): Promise<boolean> {
        this.checkID(id);
        this.checkID(id_cat);
        this.checkString(libelle, "libelle");
        this.checkString(description, "description");
        this.checkString(url_image, "url_image");
        this.checkDate(date_achat, "date_achat");
        this.checkPrice(prix);
        if(date_peremption != null){
            this.checkDate(date_peremption, "date_peremption");
        }
        return this.produitService.update(
            id,
            libelle,
            description,
            prix,
            date_achat,
            date_peremption,
            url_image,
            id_cat
        );
    }
    
    async delete(id: number): Promise<boolean> {
        this.checkID(id);
        return await this.produitService.delete(id);
    }

    async getById(id: number): Promise<Produit | null> {
        this.checkID(id);
        return await this.produitService.getById(id);
    }

    async getAll(): Promise<Produit[] | null> {
        return await this.produitService.getAll();
    }

    async getByCat(id: number): Promise<Produit[] | null> {
        this.checkID(id);
        return await this.produitService.getByCat(id);
    }

    private checkID(id: number) {
        // is the id a decimal ?
        if (this.isDecimal(id)) {
            throw new Error('Id is not decimal');
        }
        // is the id a negative number ?
        if (id < 0) {
            throw new Error('Id is negative');
        }
        // other checks
    }

    private checkString(testedString: string,key: string) {
        // is the string empty ?
        if (testedString.length < 1) {
            throw new Error(`${key} is empty`);
        }
        // is the string whitespaced ?
        if (testedString.includes(" ")) {
            throw new Error(`${key} is whitespaced`);
        }
        // other checks
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }

    private checkDate(testedDate: string, key: string){
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexDate.test(testedDate)) {
            throw new Error(`${key} is not in the correct format`);
        }
    }

    private checkPrice(testedPrice: number)
    {
        const partieEntiere = Math.abs(Math.trunc(testedPrice));
        const partieDecimale = Math.abs(testedPrice - Math.trunc(testedPrice));
        const decimaleEnChaine = partieDecimale.toString().split('.')[1];
        if (decimaleEnChaine.length >= 2) {
            throw new Error(`price must have only 2 numbers after "."`);
        }
        if (partieEntiere >= 1000) {
            throw new Error(`price is to high`);
        }
    }

}