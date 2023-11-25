import { Router } from 'express';
import { ProduitController } from './produit.controller';
import { uploadFile, deleteFile, getObjectSignedUrl } from '../database/s3'

import multer from 'multer'
import sharp from 'sharp'
import crypto from 'crypto'

export class ProduitRouter {
    router = Router();
    constructor(private produitController: ProduitController) {
        this.configureRoutes();
    }
    private configureRoutes(): void {

        const storage = multer.memoryStorage()
        const upload = multer({ storage: storage })
        const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')

        this.router.get('/get-by-id/:id/', async (req, res, next) => {
            try {
                const result = await this.produitController.getById(
                    parseInt(req.params.id),
                );
                const testurl = await getObjectSignedUrl("9dc1525e993649c901e32aac3711b8afab57e8f4b373ec7bd6c1708f92f74683")
                res.status(200).json(testurl);
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
        this.router.get('/get-by-cat/:id_cat/', async (req, res, next) => {
            try {
                const result = await this.produitController.getByCat(
                    parseInt(req.params.id_cat),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add/', upload.single('image'), async (req, res, next) => {
            try {

                if (!req.file) {
                    return res.status(400).json({ error: 'Aucun fichier téléchargé.' });
                }
                const file = req.file
                const imageName = generateFileName()

                const fileBuffer = await sharp(file.buffer)
                .resize({ height: 1920, width: 1080, fit: "contain" })
                .toBuffer()
            
                await uploadFile(fileBuffer, imageName, file.mimetype)

                // const { libelle, description, prix, date_achat, date_peremption, url_image, id_cat } = req.body;
                // const result = await this.produitController.add(libelle, description, prix, date_achat, date_peremption, url_image, id_cat);
                // res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update/', async (req, res, next) => {
            try {
                const { id_pro, libelle, description, prix, date_achat, date_peremption, url_image, id_cat } = req.body;
                const result = await this.produitController.update(id_pro,libelle,description, prix, date_achat, date_peremption, url_image, id_cat)
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.delete('/delete/:id/', async (req, res, next) => {
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