import { Router } from 'express';
import { AdminController } from './admin.controller';
export class AdminRouter {
    router = Router();
    constructor(private adminController: AdminController) {
        this.configureRoutes();
    }
    private configureRoutes(): void {
        this.router.get('/get-by-id/:id', async (req, res, next) => {
            try {
                const result = await this.adminController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-by-email/:email', async (req, res, next) => {
            try {
                const result = await this.adminController.getByEmail(req.params.email);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-all/', async (req, res, next) => {
            try {
                const result = await this.adminController.getAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-by-rights/:droits', async (req, res, next) => {
            try {
                const result = await this.adminController.getByRights(parseInt(req.params.droits));
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add/', async (req, res, next) => {
            try {
                const {
                    email,
                    nom,
                    prenom,
                    mdp,
                    droits
                } = req.body;
                const result = await this.adminController.add(
                    email,
                    nom,
                    prenom,
                    mdp,
                    droits
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update', async (req, res, next) => {
            try {
                const {
                    id,
                    email,
                    nom,
                    prenom,
                    droits
                } = req.body;
                const result = await this.adminController.update(
                    id,
                    email,
                    nom,
                    prenom,
                    droits
                )
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update-password', async (req, res, next) => {
            try {
                const {
                    id,
                    oldMdp,
                    newMdp
                } = req.body;
                const result = await this.adminController.updatePassword(
                    id,
                    oldMdp,
                    newMdp
                )
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.delete('/delete/:id', async (req, res, next) => {
            try {
                const result = await this.adminController.delete(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/generateToken/', async (req, res, next) => {
            try {
                const {
                    email,
                    mdp
                }= req.headers;
                if(typeof(email) == 'string' && typeof(mdp) == 'string'){
                    const result = await this.adminController.generateToken(
                        email,
                        mdp
                    );
                    res.status(200).json(result);
                }else{
                    res.status(200).json(null);
                }
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/loggin/', async (req, res, next) => {
            try {
                const {
                    token
                }= req.headers;
                if(typeof(token) == 'string'){
                    const result = await this.adminController.verifyToken(
                        token
                    );
                    res.status(200).json(result);
                }
                else{
                    res.status(200).json(false);
                }
            } catch (error: unknown) {
                next(error);
            }
        });
    }
}