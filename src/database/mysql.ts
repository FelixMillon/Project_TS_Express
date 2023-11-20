import mysql from 'mysql';

class MySQLConnection {
    private static instance: MySQLConnection | null = null;
    private connection: mysql.Connection;

    private constructor() {
        const host = process.env.MYSQL_HOST;
        const user = process.env.MYSQL_USER;
        const password = process.env.MYSQL_PASSWORD;
        const database = process.env.MYSQL_DATABASE;

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
                    console.log('Connecté à MySQL');
                    resolve();
                }
            });
        });
    }

    query(sql: string, callback: (error: mysql.MysqlError | null, results: any) => void): void {
        this.connection.query(sql, callback);
    }

    async asyncQuery(query: string): Promise<any> {
        const db = MySQLConnection.getInstance();
        
        try {
            console.log("je vais ouvrir")
            await db.connect();
            console.log("j'ai ouvert")
            return new Promise((resolve, reject) => {
                db.query(query, (error: any, results: any) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                });
            });
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
            return null;
        } finally {
            console.log("je vais fermer")
            await db.close();
            console.log("j'ai fermé")
        }
    }

    close(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection.end((err) => {
                if (err) {
                    console.error('Erreur lors de la fermeture de la connexion :', err);
                    reject(err);
                } else {
                    console.log('Déconnecté de MySQL');
                    resolve();
                }
            });
        });
    }
}

export default MySQLConnection;