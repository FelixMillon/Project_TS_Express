import { Router } from 'express';
import { UserController } from './admin.controller';
export class UserRouter {
    router = Router();
    constructor(private userController: UserController) {
        this.configureRoutes();
    }
    private configureRoutes(): void {
        this.router.get('/get-by-id/:id', async (req, res, next) => {
            try {
                const result = await this.userController.getById(
                    parseInt(req.params.id),
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.get('/get-by-email/:email', async (req, res, next) => {
            try {
                const result = await this.userController.getByEmail(
                    req.params.email,
                );
                res.status(200).json(result);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.post('/add-user', async (req, res, next) => {
            try {
                const { username, email, password } = req.body;
                const newUser = await this.userController.add(username, email ,password);
                res.status(200).json(newUser);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update-user', async (req, res, next) => {
            try {
                const { id, username, email } = req.body;
                const updateName = await this.userController.updateUser(id,username,email)
                res.status(200).json(updateName);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.put('/update-password', async (req, res, next) => {
            try {
                const { id, password } = req.body;
                const updateName = await this.userController.updatePassword(id,password)
                res.status(200).json(updateName);
            } catch (error: unknown) {
                next(error);
            }
        });
        this.router.delete('/delete-user/:id', async (req, res, next) => {
            try {
                const result = await this.userController.delete(
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