import { Admin } from './admin';
import { AdminService } from './admin.service';
import MySQLConnection from '../database/mysql';
import crypto from 'crypto';
import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken';

export class AdminMySQLService implements AdminService {
    db = MySQLConnection.getInstance();
    async add(
        email: string,
        nom:string,
        prenom:string,
        mdp: string
    ): Promise<Admin | null> {
        const UserExists = await this.getByEmail(email);
        if(UserExists != null){
            return null;
        }
        try {
            const cliQuery = `INSERT INTO administrateur (
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
                1
            )`;
            const results = await this.db.asyncQuery(cliQuery);
            const insertedAdm = new Admin(
                results.insertId,
                results.email,
                results.nom,
                results.prenom,
                results.mdp,
                1
            );
            return(insertedAdm);
        } catch (error) {
            console.error('Erreur lors de la creation de l\'administrateur :', error);
            return null;
        }
    }

    async update(
        id: number,
        email: string | null,
        nom: string | null,
        prenom: string | null,
        droits: number | null
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
        if(droits){
            updates.push(`droits=${droits}`);
        }
        if(updates.length > 0)
        {
            const cliQuery = `UPDATE administrateur set ${updates.join(", ")} where id_adm=${id}`;
            try {
                const results = await this.db.asyncQuery(cliQuery);
                return true;
            } catch (error) {
                console.error('Erreur lors de la mise a jour de l\'administrateur :', error);
                return false;
            }
        }else{
            console.error('Aucune modification de l\'administrateur trouvé');
            return false;
        }
    }

    async updatePassword(
        id: number,
        oldMdp: string,
        newMdp: string
    ): Promise<boolean> {
        const cliQuery = `update administrateur set mdp = '${newMdp}' where id_adm = ${id} and mdp = '${oldMdp}'`;
        try {
            await this.db.asyncQuery(cliQuery);
            return true;
        } catch (error) {
            console.error('Erreur lors de la mise a jour du mot de passe de l\'administrateur :', error);
            return false;
        }
    }

    private async updateSecretKey(
        email: string,
        mdp: string,
        secretKey: string
    ): Promise<boolean> {
        const cliQuery = `update administrateur set secretkey = '${secretKey}' where email = '${email}' and mdp = '${mdp}'`;
        try {
            await this.db.asyncQuery(cliQuery);
            return true;
        } catch (error) {
            console.error('Erreur lors de la mise a jour de la secret key de l\'administrateur :', error);
            return false;
        }
    }

    async delete(id: number): Promise<boolean> {
        const cliQuery = `DELETE FROM administrateur where id_adm=${id}`;
        try {
            const results = await this.db.asyncQuery(cliQuery);
            return true;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'administrateur :', error);
            return false;
        }
    }

    async getById(id: number): Promise<Admin | null>{
        try {
            const cliQuery = `select * from administrateur where id_adm=${id}`;
            const results = await this.db.asyncQuery(cliQuery);
            const RowResult = results[0]
            const selectedAdm = new Admin(
                RowResult.id_adm,
                RowResult.email,
                RowResult.nom,
                RowResult.prenom,
                "*************",
                RowResult.droits
            );
            return(selectedAdm);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'administrateur :', error);
            return null;
        }
    }

    async getByEmail(email: string): Promise<Admin | null>{
        try {
            const cliQuery = `select * from administrateur where email='${email}'`;
            const results = await this.db.asyncQuery(cliQuery);
            const RowResult = results[0]
            const selectedAdm = new Admin(
                RowResult.id_adm,
                RowResult.email,
                RowResult.nom,
                RowResult.prenom,
                "*************",
                RowResult.droits
            );
            return(selectedAdm);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'administrateur :', error);
            return null;
        }
    }

    async getAll(): Promise<Admin[] | null> {
        try {
            const cliQuery = `select * from administrateur`;
            const results = await this.db.asyncQuery(cliQuery);
            let selectedClis = [];
            for( let i = 0; i< results.length; i++){
                selectedClis.push(
                    new Admin(
                        results[i].id_adm,
                        results[i].email,
                        results[i].nom,
                        results[i].prenom,
                        "*************",
                        results[i].droits
                    )
                );
            }
            return(selectedClis);
        } catch (error) {
            console.error('Erreur lors de la récupération des administrateurs :', error);
            return null;
        }
    }

    async getByRights(droits: number): Promise<Admin[] | null> {
        try {
            const admQuery = `select * from administrateur where droits = ${droits}`;
            const results = await this.db.asyncQuery(admQuery);
            let selectedAdms = [];
            for( let i = 0; i< results.length; i++){
                selectedAdms.push(
                    new Admin(
                        results[i].id_adm,
                        results[i].email,
                        results[i].nom,
                        results[i].prenom,
                        "*************",
                        results[i].droits
                    )
                );
            }
            return(selectedAdms);
        } catch (error) {
            console.error('Erreur lors de la récupération des administrateurs par droit :', error);
            return null;
        }
    }

    async getRights(username: string, password: string): Promise<number> {
        try {
            const admQuery = `select droits from administrateur where email = '${username}' and mdp = '${password}'`;
            const results = await this.db.asyncQuery(admQuery);
            const RowResult = results[0]
            const droits = RowResult.droits;
            return(droits);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'administrateur :', error);
            return 0;
        }
    }

    async getTokenRights(token: string): Promise<number | null> {
        try {
            if(!await this.verifyToken(token)){
                return null
            }
            const decodedPayload: any = jwt.decode(token);
            const droits = decodedPayload['droits'];
            return droits;
        } catch (error) {
            console.error('Erreur lors de la récupération des droits du token :', error);
            return null;
        }
    }

    async generateToken(email: string, password: string): Promise<string | null>{
        try {
            const droits = await this.getRights(email,password);
            if(droits == 0){
                return null;
            }
            const secretKey = crypto.randomBytes(32).toString('hex');
            const payload = {
                username: email,
                role: 'admin',
                droits: droits
            };
            const options = {
                expiresIn: '1h'
            };
            const token: string = jwt.sign(payload, secretKey, options);
            const updated = this.updateSecretKey(email,password, secretKey);
            if(!updated){
                return null;
            }
            return token;
            
        } catch (error) {
            console.error('Erreur lors de la création du token de l\'administrateur :', error);
            return null;
        }
    }

    async verifyToken(tokenToVerify: string): Promise<boolean> {
        try {

            const decodedPayload: any = jwt.decode(tokenToVerify);
            const email = decodedPayload['username'];
            const secretKey = await this.getSecretKey(email);

            const verifyOptions: VerifyOptions = {
                algorithms: ['HS256'],
            };

            if (secretKey !== null) {
                return new Promise<boolean>((resolve, reject) => {
                    jwt.verify(tokenToVerify, secretKey, verifyOptions, (err: VerifyErrors | null, decoded: any) => {
                        if (err) {
                            console.error('Erreur de vérification du JWT :', err);
                            resolve(false);
                        } else {
                            console.log('Token JWT valide. Contenu décodé :', decoded);
                            resolve(true);
                        }
                    });
                });
            } else {
                console.error('La clé secrète est null.');
                return Promise.resolve(false);
            }
        } catch (error) {
            console.error('Erreur de vérification du JWT :', error);
            return Promise.resolve(false);
        }
    }

    private async getSecretKey(email: string): Promise<string | null>{
        try {
            const admQuery = `select secretkey from administrateur where email = '${email}'`;
            const results = await this.db.asyncQuery(admQuery);
            const RowResult = results[0]
            const secretkey = RowResult.secretkey;
            return secretkey;
        } catch (error) {
            console.error('Erreur lors de la récupération de la secretkey de l\'administrateur :', error);
            return null;
        }
    }

}