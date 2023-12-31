import { Produit } from './produit';
import { ProduitService } from './produit.service';
import MySQLConnection from '../database/mysql';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../database/s3'
import multer from 'multer'
import sharp from 'sharp'

export class ProduitMySQLService implements ProduitService {
    db = MySQLConnection.getInstance();
    storage = multer.memoryStorage()
    upload = multer({ storage: this.storage })

    async getById(id: number): Promise<Produit | null>{
        try {
            const userQuery = `select * from produit where id_pro=${id}`;
            const results = await this.db.asyncQuery(userQuery);
            const RowResult = results[0]
            const url_image = await getObjectSignedUrl(RowResult.url_image);
            const selectedPro = new Produit(
                RowResult.id_pro,
                RowResult.libelle,
                RowResult.description,
                RowResult.prix,
                RowResult.date_achat,
                RowResult.date_peremption,
                url_image,
                RowResult.id_cat
            );
            return(selectedPro);
        } catch (error) {
            console.error('Erreur lors de la récupération du produit :', error);
            return null;
        }
    }

    async getAll(): Promise<Produit[] | null> {
        try {
            const userQuery = `select * from produit`;
            const results = await this.db.asyncQuery(userQuery);
            let selectedPros = [];
            for( let i = 0; i< results.length; i++){
                const url_image = await getObjectSignedUrl(results[i].url_image);
                selectedPros.push(new Produit(
                    results[i].id_pro,
                    results[i].libelle,
                    results[i].description,
                    results[i].prix,
                    results[i].date_achat,
                    results[i].date_peremption,
                    url_image,
                    results[i].id_cat
                ));
            }
            return(selectedPros);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits :', error);
            return null;
        }
    }

    async getByCat(id_cat: number): Promise<Produit[] | null> {
        try {
            const userQuery = `select * from produit where id_cat=${id_cat}`;
            const results = await this.db.asyncQuery(userQuery);
            let selectedPros = [];
            for( let i = 0; i< results.length; i++){
                const url_image = await getObjectSignedUrl(results[i].url_image);
                selectedPros.push(new Produit(
                    results[i].id_pro,
                    results[i].libelle,
                    results[i].description,
                    results[i].prix,
                    results[i].date_achat,
                    results[i].date_peremption,
                    url_image,
                    results[i].id_cat
                ));
            }
            return(selectedPros);
        } catch (error) {
            console.error('Erreur lors de la récupération des produits par categorie :', error);
            return null;
        }
    }

    async add(
        libelle: string,
        description:string,
        prix: number,
        date_achat: string,
        date_peremption: string | null,
        file: any,
        id_cat: number
    ): Promise<Produit | null> {
        let imageName = "default";
        let inserted_id = null;
        //insertion d'un produit sans image pour création ID
        try {
            const userQuery = `INSERT INTO produit (libelle, description, prix, date_achat, ${date_peremption != null ? 'date_peremption,' : ''} url_image, id_cat) VALUES ('${libelle}', '${description}', ${prix}, '${date_achat}', ${date_peremption != null ? date_peremption+',' : ''} '${imageName}', '${id_cat}')`;
            const results = await this.db.asyncQuery(userQuery);
            console.log(results)
            inserted_id = results.insertId;
        } catch (error) {
            console.error('Erreur lors de la creation du produit :', error);
            return null;
        }
        try{
            imageName = `produit_${inserted_id}`
            const fileBuffer = await sharp(file.buffer)
            .resize({ height: 1080, width: 1080, fit: "contain" })
            .toBuffer()
            await uploadFile(fileBuffer, imageName, file.mimetype)
            const Query = `UPDATE produit set url_image = '${imageName}' where id_pro=${inserted_id}`;
            try {
                const results = await this.db.asyncQuery(Query);
                const insertedPro = new Produit(
                    results.id_pro,
                    results.libelle,
                    results.description,
                    results.prix,
                    results.date_achat,
                    results.date_peremption,
                    results.url_image,
                    results.id_cat  
                );
                return insertedPro;
            } catch (error) {
                console.error('Erreur lors de la mise à jour du produit :', error);
                return null;
            }
        } catch (error) {
            console.error('Erreur lors de du dépot de l\'image :', error);
            return null;
        }
    }

    async update(
        id: number,
        libelle: string | null,
        description:string | null,
        prix: number | null,
        date_achat: string | null,
        date_peremption: string | null,
        file: any | null,
        id_cat: number | null
    ): Promise<boolean> {
        let updates = [];
        if(libelle){
            updates.push(`libelle='${libelle}'`);
        }
        if(description){
            updates.push(`description='${description}'`);
        }
        if(prix){
            updates.push(`prix='${prix}'`);
        }
        if(date_achat){
            updates.push(`date_achat='${date_achat}'`);
        }
        if(date_peremption){
            updates.push(`date_peremption='${date_peremption}'`);
        }
        if(file){
            const fileBuffer = await sharp(file.buffer)
                .resize({ height: 1080, width: 1080, fit: 'contain' })
                .toBuffer();

            // Utilise la fonction upload
            await uploadFile(fileBuffer, `produit_${id}`, file.mimetype);
        }
        if(id_cat){
            updates.push(`id_cat='${id_cat}'`);
        }
        if(updates.length > 0)
        {
            const Query = `UPDATE produit set ${updates.join(", ")} where id_pro=${id}`;
            try {
                const results = await this.db.asyncQuery(Query);
                return true;
            } catch (error) {
                console.error('Erreur lors de la mise à jour du produit :', error);
                return false;
            }
        }else{
            console.error('Aucune modification de produit trouvée');
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        const Query = `DELETE FROM produit where id_pro=${id}`;
        try {
            await this.db.asyncQuery(Query);
            await deleteFile(`produit_${id}`);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
            return false;
        }
    }


}