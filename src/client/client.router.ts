import { Router } from 'express';
import { ClientController } from './client.controller';
export class ClientRouter {
    router = Router();
    constructor(private clientController: ClientController) {
        this.configureRoutes();
    }
    private configureRoutes(): void {
        this.router.get('/get-by-id/:id', async (req, res, next) => {
            try {
                const result = await this.clientController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-by-email/:email', async (req, res, next) => {
            try {
                const result = await this.clientController.getByEmail(req.params.email);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-all/', async (req, res, next) => {
            try {
                const result = await this.clientController.getAll();
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
                    date_naiss,
                    ville,
                    cp,
                    rue,
                    numrue,
                    complement
                } = req.body;
                const result = await this.clientController.add(email,
                    nom,
                    prenom,
                    mdp,
                    date_naiss,
                    ville,
                    cp,
                    rue,
                    numrue,
                    complement);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update', async (req, res, next) => {
            try {
                const {
                    id_cli,
                    email,
                    nom,
                    prenom,
                    date_naiss,
                    ville,
                    cp,
                    rue,
                    numrue,
                    complement } = req.body;
                const result = await this.clientController.update(
                    id_cli,
                    email,
                    nom,
                    prenom,
                    date_naiss,
                    ville,
                    cp,
                    rue,
                    numrue,
                    complement
                )
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update-password', async (req, res, next) => {
            try {
                const {
                    id_cli,
                    oldMdp,
                    newMdp
                } = req.body;
                const result = await this.clientController.updatePassword(
                    id_cli,
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
                const result = await this.clientController.delete(
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