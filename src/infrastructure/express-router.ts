import { Router } from 'express';
import { CatProService } from '../catPro/catPro.service';
import { CatProController } from '../catPro/catPro.controller';
import { CatProRouter } from '../catPro/catPro.router';
import { ProduitService } from '../produit/produit.service';
import { ProduitController } from '../produit/produit.controller';
import { ProduitRouter } from '../produit/produit.router';
import { ClientService } from '../client/client.service';
import { ClientController } from '../client/client.controller';
import { ClientRouter } from '../client/client.router';


export class ExpressRouter {
    router = Router();

    private catProController!: CatProController;
    private catProRouter!: CatProRouter;
    private produitController!: ProduitController;
    private produitRouter!: ProduitRouter;
    private clientController!: ClientController;
    private clientRouter!: ClientRouter;

    constructor(private catProService: CatProService, private produitService: ProduitService, private clientService: ClientService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoute();
    }


    private configureControllers() {
        this.catProController = new CatProController(this.catProService)
        this.produitController = new ProduitController(this.produitService)
        this.clientController = new ClientController(this.clientService)
    }
    
    private configureRouters(): void {
        this.catProRouter = new CatProRouter(this.catProController);
        this.produitRouter = new ProduitRouter(this.produitController);
        this.clientRouter = new ClientRouter(this.clientController);
    }

    private configureRoute(): void {
        this.router.use('/categorie_produit', this.catProRouter.router);
        this.router.use('/produit', this.produitRouter.router);
        this.router.use('/client', this.clientRouter.router);
    }
}