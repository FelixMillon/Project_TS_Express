import { ExpressServer } from './express-server';
import * as dotenv from 'dotenv';
import { ExpressRouter } from './express-router';
import { UserService } from '../user/user.service';
import { CatProService } from '../catPro/catPro.service';
import { ProduitService } from '../produit/produit.service';
import { UserMySQLService } from '../user/user.mysql-service';
import { CatProMySQLService } from '../catPro/catPro.mysql-service';
import { ProduitMySQLService } from '../produit/produit.mysql-service';

export class ExpressApplication {
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private userService!: UserService;
    private catProService!: CatProService;
    private produitService!: ProduitService;

    constructor() {
        this.configureApplication();
    }

    bootstrap(): void {
        this.server.bootstrap();
    }

    private configureApplication() {
        this.configureEnvironment();
        this.configureServerPort();
        this.configureServices();
        this.configureExpressRouter();
        this.configureServer();
    }

    private configureEnvironment(): void {
        dotenv.config({
            path: '.env',
        });
    }

    private configureServerPort() {
        this.port = this.getPort();
    }

    private configureServices(){
        this.userService = new UserMySQLService();
        this.catProService = new CatProMySQLService();
        this.produitService = new ProduitMySQLService();
    }

    private configureExpressRouter(){
        this.expressRouter = new ExpressRouter(this.userService,this.catProService,this.produitService );
    }

    private configureServer() {
        this.server = new ExpressServer(this.expressRouter, this.port);
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }
        return port;
    }
}
