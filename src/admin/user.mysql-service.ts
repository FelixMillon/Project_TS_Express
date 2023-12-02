import { Admin } from './admin';
import { AdminService } from './admin.service';
import MySQLConnection from '../database/mysql';

export class AdminMySQLService implements AdminService {
    db = MySQLConnection.getInstance();
    async add(
        email: string,
        nom: string,
        mdp: string,
        prenom: string,
        droits: number
    ): Promise<Admin | null> {
        const UserExists = await this.getByEmail(email);
        if(UserExists != null){
            return null;
        }
        try {
            const cliQuery = `INSERT INTO client (
                    email,
                    nom,
                    prenom,
                    mdp,
                    droits
                ) VALUES (
                    '${email}',
                    '${nom}',
                    '${prenom}',
                    '${mdp}',
                    '${droits}'
                )`;
            const results = await this.db.asyncQuery(cliQuery);
            const insertedAdmin = new Admin(
                results.insertId,
                results.email,
                results.nom,
                results.prenom,
                results.mdp,
                results.droits
            );
            return(insertedAdmin);
        } catch (error) {
            console.error('Erreur lors de la creation du client :', error);
            return null;
        }
    }

    async update(
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
    ): Promise<boolean> {
        let updates = [];
        if(email){
            updates.push(`email='${email}'`);
        }
        if(nom){
            updates.push(`nom='${nom}'`);
        }
        if(prenom){
            updates.push(`prenom='${prenom}'`);
        }
        if(date_naiss){
            updates.push(`date_naiss='${date_naiss}'`);
        }
        if(ville){
            updates.push(`ville='${ville}'`);
        }
        if(cp){
            updates.push(`cp='${cp}'`);
        }
        if(rue){
            updates.push(`rue='${rue}'`);
        }
        if(numrue){
            updates.push(`numrue='${numrue}'`);
        }
        if(complement){
            updates.push(`complement='${complement}'`);
        }
        if(updates.length > 0)
        {
            const cliQuery = `UPDATE client set ${updates.join(", ")} where id_cli=${id}`;
            try {
                const results = await this.db.asyncQuery(cliQuery);
                return true;
            } catch (error) {
                console.error('Erreur lors de la mise a jour du client :', error);
                return false;
            }
        }else{
            console.error('Aucune modification du client trouvé');
            return false;
        }
    }

    async updatePassword(
        id: number,
        oldMdp: string,
        newMdp: string
    ): Promise<boolean> {
        const cliQuery = `update client set mdp = ${newMdp} where id_cli = ${id} and mdp = ${oldMdp}`;
        try {
            const results = await this.db.asyncQuery(cliQuery);
            return true;
        } catch (error) {
            console.error('Erreur lors de la mise a jour du mot de passe :', error);
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        const cliQuery = `DELETE FROM client where id_cli=${id}`;
        try {
            const results = await this.db.asyncQuery(cliQuery);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression du client :', error);
            return false;
        }
    }

    async getById(id: number): Promise<Client | null>{
        try {
            const cliQuery = `select * from client where id_cli=${id}`;
            const results = await this.db.asyncQuery(cliQuery);
            const RowResult = results[0]
            const selectedCli = new Client(
                RowResult.id_cli,
                RowResult.email,
                RowResult.nom,
                RowResult.prenom,
                "*************",
                RowResult.date_naiss,
                RowResult.ville,
                RowResult.cp,
                RowResult.rue,
                RowResult.numrue,
                RowResult.complement
            );
            return(selectedCli);
        } catch (error) {
            console.error('Erreur lors de la récupération du client :', error);
            return null;
        }
    }

    async getByEmail(email: string): Promise<Client | null>{
        try {
            const cliQuery = `select * from client where email='${email}'`;
            const results = await this.db.asyncQuery(cliQuery);
            const RowResult = results[0]
            const selectedCli = new Client(
                RowResult.id_cli,
                RowResult.email,
                RowResult.nom,
                RowResult.prenom,
                "*************",
                RowResult.date_naiss,
                RowResult.ville,
                RowResult.cp,
                RowResult.rue,
                RowResult.numrue,
                RowResult.complement
            );
            return(selectedCli);
        } catch (error) {
            console.error('Erreur lors de la récupération du client :', error);
            return null;
        }
    }

    async getAll(): Promise<Client[] | null> {
        try {
            const cliQuery = `select * from client`;
            const results = await this.db.asyncQuery(cliQuery);
            let selectedClis = [];
            for( let i = 0; i< results.length; i++){
                selectedClis.push(
                    new Client(
                        results[i].id_cli,
                        results[i].email,
                        results[i].nom,
                        results[i].prenom,
                        "*************",
                        results[i].date_naiss,
                        results[i].ville,
                        results[i].cp,
                        results[i].rue,
                        results[i].numrue,
                        results[i].complement
                    )
                );
            }
            return(selectedClis);
        } catch (error) {
            console.error('Erreur lors de la récupération des clients :', error);
            return null;
        }
    }
}