import { User } from './user';
import { UserService } from './user.service';
import MySQLConnection from '../database/mysql';

export class UserMySQLService implements UserService {

    async add(username: string, email:string, password:string): Promise<User | null> {
        try {
            const db = MySQLConnection.getInstance();
            await db.connect();
            const userQuery = `INSERT INTO user (email_user, username_user, password_user) VALUES ('${email}', '${username}', '${password}')`;
            return new Promise((resolve, reject) => {
                db.query(userQuery, (error: any, results: any) => {
                    if (error) {
                        console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
                        db.close();
                        resolve(null);
                    } else {
                        const newUser = new User(results.insertId,email, username, password)
                        db.close();
                        resolve(newUser);
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            return null;
        }
    }

    async getById(id: number): Promise<User | null>{
        try {
            const userQuery = `SELECT * FROM user where id_user = ${id}`;
            
            const db = MySQLConnection.getInstance();
            await db.connect();
            return new Promise((resolve, reject) => {
                db.query(userQuery, (error: any, results: any) => {
                    if (error) {
                        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
                        db.close();
                        resolve(null);
                    } else if (results.length > 0) {
                        const userData = results[0];
                        const selectedUser = new User(id, userData.email_user, userData.username_user, userData.password_user);
                        db.close();
                        resolve(selectedUser);
                    } else {
                        db.close();
                        resolve(null);
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            return null;
        }
    }

    async updateUser(id: number, username: string, email: string): Promise<boolean> {
        try {
            const db = MySQLConnection.getInstance();
            await db.connect();
            let updates = [];
            if(username != "null"){
                updates.push(`username_user='${username}'`);
            }
            if(email != "null"){
                updates.push(`email_user='${email}'`);
            }
            if(updates.length > 0)
            {
                const userQuery = `UPDATE user set ${updates.join(", ")} where id_user=${id}`;
                console.log(userQuery);
                return new Promise((resolve, reject) => {
                    db.query(userQuery, (error: any, results: any) => {
                        if (error) {
                            console.error('Erreur lors de l\'insertion de l\'utilisateur :', error);
                            db.close();
                            resolve(false);
                        } else {
                            const newUser = new User(results.insertId,email, username,"")
                            db.close();
                            resolve(true);
                        }
                    });
                });
            }
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            return false;
        }
        return false;
    }

    async delete(id: number):  Promise<boolean> {
        try {
            const userQuery = `DELETE FROM user where id_user = ${id}`;
            const db = MySQLConnection.getInstance();
            await db.connect();
            return new Promise((resolve, reject) => {
                db.query(userQuery, (error: any, results: any) => {
                    if (error) {
                        console.error('Erreur lors de la suppression de l\'utilisateur :', error);
                        resolve(false);
                    } else {
                        console.error('Utilisateur supprimé', error);
                        resolve(true);
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            return false;
        }
    }

    async getByEmail(email: string): Promise<User | null> {
        try {
            const userQuery = `SELECT * FROM user where email_user = '${email}'`;
            const db = await MySQLConnection.getInstance();
            await db.connect();
            return new Promise((resolve, reject) => {
                db.query(userQuery, (error: any, results: any) => {
                    if (error) {
                        console.error('Erreur lors de la récupération de l\'utilisateur :', error);
                        resolve(null);
                    } else if (results.length > 0) {
                        const userData = results[0];
                        const selectedUser = new User(userData.id_user, email, userData.username_user, userData.password_user);
                        resolve(selectedUser);
                    } else {
                        resolve(null);
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'utilisateur :', error);
            return null;
        }
    }

    async updatePassword(id: number, password: string): Promise<boolean> {
        const newUser = new User(id,'test@example.com', 'utilisateur_test', password)
        return(true);
    }
}