import { CatPro } from './catPro';
import { CatProService } from './catPro.service';
import MySQLConnection from '../database/mysql';

export class CatProMySQLService implements CatProService {
    db = MySQLConnection.getInstance();
    async add(libelle: string, description: string): Promise<CatPro | null> {
        try {
            const userQuery = `INSERT INTO categorie_produit (libelle, description) VALUES ('${libelle}', '${description}')`;
            const results = await this.db.asyncQuery(userQuery);
            const insertedCat = new CatPro(results.insertId,results.libelle,results.description);
            return(insertedCat);
        } catch (error) {
            console.error('Erreur lors de la creation de la categorie :', error);
            return null;
        }
    }

    async update(
        id: number,
        libelle: string | null,
        description: string | null
    ): Promise<boolean> {
        let updates = [];
        if(libelle){
            updates.push(`libelle='${libelle}'`);
        }
        if(description){
            updates.push(`description='${description}'`);
        }
        if(updates.length > 0)
        {
            const Query = `UPDATE categorie_produit set ${updates.join(", ")} where id_cat=${id}`;
            try {
                const results = await this.db.asyncQuery(Query);
                return true;
            } catch (error) {
                console.error('Erreur lors de la mise a jour de la categorie :', error);
                return false;
            }
        }else{
            console.error('Aucune modification de catégorie trouvée');
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        const Query = `DELETE FROM categorie_produit where id_cat=${id}`;
        try {
            const results = await this.db.asyncQuery(Query);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de la categorie :', error);
            return false;
        }
    }

    async getById(id: number): Promise<CatPro | null>{
        try {
            const userQuery = `select * from categorie_produit where id_cat=${id}`;
            const results = await this.db.asyncQuery(userQuery);
            const RowResult = results[0]
            const selectedCat = new CatPro(RowResult.id_cat,RowResult.libelle,RowResult.description);
            return(selectedCat);
        } catch (error) {
            console.error('Erreur lors de la récupération de la categorie :', error);
            return null;
        }
    }
    async getAll(): Promise<CatPro[] | null> {
        try {
            const userQuery = `select * from categorie_produit`;
            const results = await this.db.asyncQuery(userQuery);
            let selectedCats = [];
            for( let i = 0; i< results.length; i++){
                selectedCats.push(new CatPro(results[i].insertId,results[i].libelle,results[i].description));
            }
            return(selectedCats);
        } catch (error) {
            console.error('Erreur lors de la récupération des categorie :', error);
            return null;
        }
    }
}