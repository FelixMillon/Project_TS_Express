import { Router } from 'express';
//import client
import { ClientService } from '../client/client.service';
import { ClientController } from '../client/client.controller';
import { ClientRouter } from '../client/client.router';
//import administrateur
import { AdminService } from '../admin/admin.service';
import { AdminController } from '../admin/admin.controller';
import { AdminRouter } from '../admin/admin.router';
//import categorie produit
import { CatProService } from '../catPro/catPro.service';
import { CatProController } from '../catPro/catPro.controller';
import { CatProRouter } from '../catPro/catPro.router';
//import produit
import { ProduitService } from '../produit/produit.service';
import { ProduitController } from '../produit/produit.controller';
import { ProduitRouter } from '../produit/produit.router';


export class ExpressRouter {
    router = Router();

    private clientController!: ClientController;
    private clientRouter!: ClientRouter;
    private adminController!: AdminController;
    private adminRouter!: AdminRouter;
    private catProController!: CatProController;
    private catProRouter!: CatProRouter;
    private produitController!: ProduitController;
    private produitRouter!: ProduitRouter;

    constructor(
        private clientService: ClientService,
        private adminService: AdminService,
        private catProService: CatProService,
        private produitService: ProduitService
    ) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoute();
    }


    private configureControllers() {
        this.clientController = new ClientController(this.clientService);
        this.adminController = new AdminController(this.adminService);
        this.catProController = new CatProController(this.catProService)
        this.produitController = new ProduitController(this.produitService)
    }
    
    private configureRouters(): void {
        this.clientRouter = new ClientRouter(this.clientController);
        this.adminRouter = new AdminRouter(this.adminController);
        this.catProRouter = new CatProRouter(this.catProController);
        this.produitRouter = new ProduitRouter(this.produitController);
    }

    private configureRoute(): void {
        this.router.use('/client', this.clientRouter.router);
        this.router.use('/admin', this.adminRouter.router);
        this.router.use('/categorie_produit', this.catProRouter.router);
        this.router.use('/produit', this.produitRouter.router);
    }
}