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

                if (result && result.url_image != 'https://monurl') {
                    result.url_image = await getObjectSignedUrl(result.url_image);
                }

                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.get('/get-all/', async (req, res, next) => {
            try {
                const result = await this.produitController.getAll();

                if (result) {
                    for (let res of result) {
                        if (res.url_image != 'https://monurl') {
                            res.url_image = await getObjectSignedUrl(res.url_image);
                        }
                    }
                }
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
                if (result) {
                    for (let res of result) {
                        if (res.url_image != 'https://monurl') {
                            res.url_image = await getObjectSignedUrl(res.url_image);
                        }
                    }
                }
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.post('/add/', upload.single('image'), async (req, res, next) => {
            try {

                let imageName = "https://monurl";
                if(req.file){
                    const file = req.file
                    imageName = generateFileName()
                    const fileBuffer = await sharp(file.buffer)
                    .resize({ height: 1080, width: 1080, fit: "contain" })
                    .toBuffer()
                    await uploadFile(fileBuffer, imageName, file.mimetype)
                }
                
                const { libelle, description, prix, date_achat, date_peremption, id_cat } = req.body;
                console.log(libelle)
                const result = await this.produitController.add(libelle, description, prix, date_achat, date_peremption, imageName, id_cat);
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.put('/update/', upload.single('image'), async (req, res, next) => {
            try {
                
                const { id, libelle, description, prix, date_achat, date_peremption, url_image, id_cat } = req.body;

                //Recherche du produit
                const result_img = await this.produitController.getById(
                    parseInt(id),
                );

                if(req.file && result_img){
                    const file = req.file;
                    const fileBuffer = await sharp(file.buffer)
                        .resize({ height: 1080, width: 1080, fit: 'contain' })
                        .toBuffer();

                    // Utilise la fonction upload
                    await uploadFile(fileBuffer, result_img.url_image, file.mimetype);
                }

                
                const result = await this.produitController.update(id,libelle,description, prix, date_achat, date_peremption, url_image, id_cat)
                res.status(200).json(result);

            } catch (error: unknown) {
                next(error);
            }
        });

        this.router.delete('/delete/:id/', async (req, res, next) => {
            try {
                //Recherche du produit
                const result_img = await this.produitController.getById(
                    parseInt(req.params.id)
                );
                if (result_img) {
                    await deleteFile(result_img.url_image);
                }
                //Suppression du produit
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