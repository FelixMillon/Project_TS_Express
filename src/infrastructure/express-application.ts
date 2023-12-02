import { ExpressServer } from './express-server';
import * as dotenv from 'dotenv';
import { ExpressRouter } from './express-router';
import { CatProService } from '../catPro/catPro.service';
import { CatProMySQLService } from '../catPro/catPro.mysql-service';
import { ProduitService } from '../produit/produit.service';
import { ProduitMySQLService } from '../produit/produit.mysql-service';
import { ClientService } from '../client/client.service';
import { ClientMySQLService } from '../client/client.mysql-service';

export class ExpressApplication {
    private allowedMainOrigin!: string;
    private expressRouter!: ExpressRouter;
    private port!: string;
    private server!: ExpressServer;
    private catProService!: CatProService;
    private produitService!: ProduitService;
    private clientService!: ClientService;

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

    private configureVariables(): void {
        this.configureAllowedMainOrigin();
        this.configureServerPort();
    }

    private configureAllowedMainOrigin(): void {
        this.allowedMainOrigin = this.getAllowedMainOrigin();
    }

    private getAllowedMainOrigin(): string {
        const allowedMainOrigin = process.env.ALLOWED_MAIN_ORIGIN;
        if (!allowedMainOrigin) {
            throw new Error('No allowed main origin was found in env file.');
        }

        return allowedMainOrigin;
    }

    private configureServerPort() {
        this.port = this.getPort();
    }

    private getPort(): string {
        const port = process.env.PORT;
        if (!port) {
            throw new Error('No port was found in env file.');
        }
        return port;
    }

    private configureServices(){
        this.catProService = new CatProMySQLService();
        this.produitService = new ProduitMySQLService();
        this.clientService = new ClientMySQLService();
    }

    private configureExpressRouter(){
        this.expressRouter = new ExpressRouter(this.catProService,this.produitService,this.clientService);
    }

    private configureServer() {
        this.server = new ExpressServer(
            this.allowedMainOrigin,
            this.expressRouter,
            this.port);
    }
}
