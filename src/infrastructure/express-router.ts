import { Router } from 'express';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';
import { CatProService } from '../catPro/catPro.service';
import { CatProController } from '../catPro/catPro.controller';
import { CatProRouter } from '../catPro/catPro.router';
import { ProduitService } from '../produit/produit.service';
import { ProduitController } from '../produit/produit.controller';
import { ProduitRouter } from '../produit/produit.router';


export class ExpressRouter {
    router = Router();

    private userController!: UserController;
    private userRouter!: UserRouter;
    private catProController!: CatProController;
    private catProRouter!: CatProRouter;
    private produitController!: ProduitController;
    private produitRouter!: ProduitRouter;

    constructor(private userService: UserService, private catProService: CatProService, private produitService: ProduitService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoute();
    }


    private configureControllers() {
        this.userController = new UserController(this.userService);
        this.catProController = new CatProController(this.catProService)
        this.produitController = new ProduitController(this.produitService)
    }
    
    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
        this.catProRouter = new CatProRouter(this.catProController);
        this.produitRouter = new ProduitRouter(this.produitController);
    }

    private configureRoute(): void {
        this.router.use('/user', this.userRouter.router);
        this.router.use('/categorie_produit', this.catProRouter.router);
        this.router.use('/produit', this.produitRouter.router);
    }
}