export class Produit {

    constructor(
        public id: number,
        public libelle: string,
        public description: string,
        public prix: number,
        public date_achat: string,
        public date_peremption: string | null,
        public url_image: string,
        public id_cat: number
    ) {}

}