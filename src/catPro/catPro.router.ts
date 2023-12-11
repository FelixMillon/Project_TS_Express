import { Router } from 'express';
import { CatProController } from './catPro.controller';
import { AdminController } from '../admin/admin.controller';
export class CatProRouter {
    router = Router();
    constructor(
        private catProController: CatProController,
        private adminController: AdminController
        ) {
        this.configureRoutes();
    }
    private configureRoutes(): void {
        this.router.get('/get-by-id/:id', async (req, res, next) => {
            try {
                const result = await this.catProController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-all/', async (req, res, next) => {
            try {
                const result = await this.catProController.getAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add/', async (req, res, next) => {
            try {
                const { username, password } = req.headers;
                let droits = 0;
                if(typeof(username) == 'string' && typeof(password) == 'string'){
                    droits = await this.adminController.getRights(
                        username,
                        password
                    )
                }
                if(droits > 0){
                    const { libelle, description } = req.body;
                    const result = await this.catProController.add(libelle, description);
                    res.status(200).json(result);
                }else{
                    res.status(401).json({"message": "Vous n'avez pas les droits necessaires"});
                }

            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update/', async (req, res, next) => {
            try {
                const { username, password } = req.headers;
                let droits = 0;
                if(typeof(username) == 'string' && typeof(password) == 'string'){
                    droits = await this.adminController.getRights(
                        username,
                        password
                    )
                }
                console.log(droits)
                if(droits > 0){
                    const { id, libelle, description } = req.body;
                    const result = await this.catProController.update(id,libelle,description)
                    res.status(200).json(result);
                }else{
                    res.status(401).json({"message": "Vous n'avez pas les droits necessaires"});
                }
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.delete('/delete/:id', async (req, res, next) => {
            try {
                const { username, password } = req.headers;
                console.log(username, password)
                let droits = 0;
                if(typeof(username) == 'string' && typeof(password) == 'string'){
                    droits = await this.adminController.getRights(
                        username,
                        password
                    )
                }
                if(droits > 1){
                    const result = await this.catProController.delete(
                        parseInt(req.params.id)
                    );
                    res.status(200).json(result);
                }else{
                    res.status(401).json({"message": "Vous n'avez pas les droits necessaires"});
                }
            } catch (error: unknown) {
                next(error);
            }
        });
        // other routes...
    }
}