import mysql from 'mysql';

class MySQLConnection {
    private static instance: MySQLConnection | null = null;
    private connection: mysql.Connection;

    private constructor() {
        const os = require('os');
        const isMacOS = os.platform() === 'darwin';
        const host = isMacOS ? process.env.MYSQL_HOST_MAC : process.env.MYSQL_HOST;
        const password = isMacOS ? process.env.MYSQL_PASSWORD_MAC : process.env.MYSQL_PASSWORD;
        const database = process.env.MYSQL_DATABASE;
        const user = process.env.MYSQL_USER;
        this.connection = mysql.createConnection({
            host,
            user,
            password,
            database,
        });
    }
    
    static getInstance(): MySQLConnection {
        MySQLConnection.instance = new MySQLConnection();
        return MySQLConnection.instance;
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.connect((err) => {
                if (err) {
                    console.error('Erreur de connexion MySQL :', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    query(sqlQuery: string, callback: (error: mysql.MysqlError | null, results: any) => void): void {
        this.connection.query(sqlQuery, callback);
    }

    async asyncQuery(sqlQuery: string): Promise<any> {
        const db = MySQLConnection.getInstance();
        
        try {
            await db.connect();
            return new Promise((resolve, reject) => {
                db.query(sqlQuery, (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            console.log(sqlQuery);
            console.error('Erreur lors de la requête :', error);
            return null;
        } finally {
            await db.close();
        }
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    console.error('Erreur lors de la fermeture de la connexion :', err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}

export default MySQLConnection;