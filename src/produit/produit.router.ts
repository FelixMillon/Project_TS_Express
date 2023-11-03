import { Router } from 'express';
import { ProduitController } from './produit.controller';
export class ProduitRouter {
    router = Router();
    constructor(private produitController: ProduitController) {
        this.configureRoutes();
    }
    private configureRoutes(): void {
        this.router.get('/get-by-id/:id', async (req, res, next) => {
            try {
                const result = await this.produitController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-all/', async (req, res, next) => {
            try {
                const result = await this.produitController.getAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-by-cat/:id_cat', async (req, res, next) => {
            try {
                const result = await this.produitController.getByCat(
                    parseInt(req.params.id_cat),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add/', async (req, res, next) => {
            try {
                const { libelle, description, prix, date_achat, date_peremption, url_image, id_cat } = req.body;
                const result = await this.produitController.add(libelle, description, prix, date_achat, date_peremption, url_image, id_cat);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update', async (req, res, next) => {
            try {
                const { id, libelle, description, prix, date_achat, date_peremption, url_image, id_cat } = req.body;
                const result = await this.produitController.update(id,libelle,description, prix, date_achat, date_peremption, url_image, id_cat)
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.delete('/delete/:id', async (req, res, next) => {
            try {
                const result = await this.produitController.delete(
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