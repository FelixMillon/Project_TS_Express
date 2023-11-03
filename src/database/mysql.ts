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
        if (!MySQLConnection.instance) {
            MySQLConnection.instance = new MySQLConnection();
        }
        return MySQLConnection.instance;
    }

    async connect(): Promise<void> {
        this.connection.connect((err) => {
            if (err) {
                console.error('Erreur de connexion MySQL :', err);
            } else {
                console.log('Connecté à MySQL');
            }
        });
    }

    async query(sql: string, callback: (error: mysql.MysqlError | null, results: any) => void):  Promise<void> {
        this.connection.query(sql, callback);
    }

    async asyncQuery(query: string): Promise<any> {
        try {
            const db = MySQLConnection.getInstance();
            await db.connect();
            return new Promise((resolve, reject) => {
                db.query(query, (error: any, results: any) => {
                    resolve(results);
                });
            });
        } catch (error) {
            console.error('Erreur lors de la requete :', error);
            return null;
        }
    }

    async close(): Promise<void> {
        this.connection.end();
        console.log('Déconnecté de MySQL');
    }
}

export default MySQLConnection;
