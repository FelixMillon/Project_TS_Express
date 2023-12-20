import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Admin } from './admin';

describe('AdminController', () => {
    let adminController: AdminController;
    let mockAdminService: Partial<AdminService>;

    beforeEach(() => {
        mockAdminService = {
            add: jest.fn(),
            update: jest.fn(),
            updatePassword: jest.fn(),
            delete: jest.fn(),
            getById: jest.fn(),
            getByEmail: jest.fn(),
            getByRights: jest.fn(),
            getAll: jest.fn(),
        };
        adminController = new AdminController(mockAdminService as AdminService);
    });

    describe('add', () => {
        it('should call add method with correct parameters', async () => {
            const adminData = new Admin(1, 'email@example.com', 'Nom', 'Prenom', 'Password1!', 1);
            (mockAdminService.add as jest.Mock).mockResolvedValue(adminData);
            await adminController.add('email@example.com', 'Nom', 'Prenom', 'Password1!', 1);
            expect(mockAdminService.add).toHaveBeenCalledWith('email@example.com', 'Nom', 'Prenom', 'Password1!', 1);
        });
    });

    describe('update', () => {
        it('should call update method with correct parameters', async () => {
            (mockAdminService.update as jest.Mock).mockResolvedValue(true);
            const result = await adminController.update(1, 'newemail@example.com', 'NewNom', 'NewPrenom', 2);
            expect(result).toBeTruthy();
            expect(mockAdminService.update).toHaveBeenCalledWith(1, 'newemail@example.com', 'NewNom', 'NewPrenom', 2);
        });
    });

    describe('updatePassword', () => {
        it('should call updatePassword method with correct parameters', async () => {
            (mockAdminService.updatePassword as jest.Mock).mockResolvedValue(true);
            const result = await adminController.updatePassword(1, 'OldPassword1!', 'NewPassword2!');
            expect(result).toBeTruthy();
            expect(mockAdminService.updatePassword).toHaveBeenCalledWith(1, 'OldPassword1!', 'NewPassword2!');
        });
    });

    describe('delete', () => {
        it('should call delete method with correct id', async () => {
            (mockAdminService.delete as jest.Mock).mockResolvedValue(true);
            const result = await adminController.delete(1);
            expect(result).toBeTruthy();
            expect(mockAdminService.delete).toHaveBeenCalledWith(1);
        });
    });

    describe('getById', () => {
        it('should retrieve an admin by ID', async () => {
            const admin = new Admin(1, 'email@example.com', 'Nom', 'Prenom', 'Password1!', 1);
            (mockAdminService.getById as jest.Mock).mockResolvedValue(admin);
            const result = await adminController.getById(1);
            expect(result).toEqual(admin);
            expect(mockAdminService.getById).toHaveBeenCalledWith(1);
        });
    });

    describe('getByEmail', () => {
        it('should retrieve an admin by email', async () => {
            const admin = new Admin(2, 'email@example.com', 'Nom', 'Prenom', 'Password1!', 2);
            (mockAdminService.getByEmail as jest.Mock).mockResolvedValue(admin);
            const result = await adminController.getByEmail('email@example.com');
            expect(result).toEqual(admin);
            expect(mockAdminService.getByEmail).toHaveBeenCalledWith('email@example.com');
        });
    });

    describe('getByRights', () => {
        it('should retrieve admins by rights', async () => {
            const admins = [new Admin(1, 'email@example.com', 'Nom', 'Prenom', 'Password1!', 1)];
            (mockAdminService.getByRights as jest.Mock).mockResolvedValue(admins);
            const result = await adminController.getByRights(1);
            expect(result).toEqual(admins);
            expect(mockAdminService.getByRights).toHaveBeenCalledWith(1);
        });
    });

    describe('getAll', () => {
        it('should retrieve all admins', async () => {
            const admins = [new Admin(1, 'email@example.com', 'Nom', 'Prenom', 'Password1!', 1)];
            (mockAdminService.getAll as jest.Mock).mockResolvedValue(admins);
            const result = await adminController.getAll();
            expect(result).toEqual(admins);
            expect(mockAdminService.getAll).toHaveBeenCalled();
        });
    });
});
