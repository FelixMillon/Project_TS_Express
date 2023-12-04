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
                    id_adm,
                    email,
                    nom,
                    prenom,
                    droits
                } = req.body;
                const result = await this.adminController.update(
                    id_adm,
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
                    id_adm,
                    oldMdp,
                    newMdp
                } = req.body;
                const result = await this.adminController.updatePassword(
                    id_adm,
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
        // other routes...
    }
}