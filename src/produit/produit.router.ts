import { Router } from 'express';
import { ProduitController } from './produit.controller';
import multer from 'multer'

export class ProduitRouter {
    router = Router();
    constructor(private produitController: ProduitController) {
        this.configureRoutes();
    }
    private configureRoutes(): void {

        const storage = multer.memoryStorage()
        const upload = multer({ storage: storage })

        this.router.get('/get-by-id/:id/', async (req: any, res: any, next: any) => {
            try {
                const result = await this.produitController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/get-all/', async (req: any, res: any, next: any) => {
            try {
                const result = await this.produitController.getAll();
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/get-by-cat/:id_cat/', async (req: any, res: any, next: any) => {
            try {
                const result = await this.produitController.getByCat(
                    parseInt(req.params.id_cat),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add/', upload.single('image'), async (req: any, res: any, next: any) => {
            try {
                console.log(req)
                console.log(req.file)
                const file = req.file
                const { libelle, description, prix, date_achat, date_peremption, id_cat } = req.body;
                const result = await this.produitController.add(libelle, description, prix, date_achat, date_peremption, file, id_cat);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/update/', upload.single('image'), async (req: any, res: any, next: any) => {
            try {
                const file = req.file
                const { id, libelle, description, prix, date_achat, date_peremption, id_cat } = req.body;
                const result = await this.produitController.update(id,libelle,description, prix, date_achat, date_peremption, file, id_cat)
                res.status(200).json(result);

            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/delete/:id/', async (req: any, res: any, next: any) => {
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