import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { Client } from './client';

describe('ClientController', () => {
    let clientController: ClientController;
    let mockClientService: Partial<ClientService>;

    beforeEach(() => {
        mockClientService = {
            add: jest.fn(),
            update: jest.fn(),
            updatePassword: jest.fn(),
            delete: jest.fn(),
            getById: jest.fn(),
            getByEmail: jest.fn(),
            getAll: jest.fn(),
            // ... autres méthodes
        };
        clientController = new ClientController(mockClientService as ClientService);
    });

    describe('add', () => {
        // Existing test for 'add' method

        it('should return null if adding client fails', async () => {
            (mockClientService.add as jest.Mock).mockResolvedValue(null);
            const result = await clientController.add('email@example.com', 'Nom', 'Prenom', 'Password1!', '2000-01-01', 'Ville', '12345', 'Rue', '1', null);
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a client correctly', async () => {
            (mockClientService.update as jest.Mock).mockResolvedValue(true);
            const result = await clientController.update(1, 'email@example.com', 'Nom', 'Prenom', '1990-01-01', 'Ville', '12345', 'Rue', '1', null);
            expect(result).toBeTruthy();
        });

        it('should return false if updating client fails', async () => {
            (mockClientService.update as jest.Mock).mockResolvedValue(false);
            const result = await clientController.update(1, 'email@example.com', 'Nom', 'Prenom', '1990-01-01', 'Ville', '12345', 'Rue', '1', null);
            expect(result).toBeFalsy();
        });
    });

    describe('updatePassword', () => {
        it('should update password correctly', async () => {
            (mockClientService.updatePassword as jest.Mock).mockResolvedValue(true);
            const result = await clientController.updatePassword(1, 'OldPassword1!', 'NewPassword2!');
            expect(result).toBeTruthy();
        });

        it('should return false if password update fails', async () => {
            (mockClientService.updatePassword as jest.Mock).mockResolvedValue(false);
            const result = await clientController.updatePassword(1, 'OldPassword1!', 'NewPassword2!');
            expect(result).toBeFalsy();
        });
    });

    describe('delete', () => {
        it('should delete a client correctly', async () => {
            (mockClientService.delete as jest.Mock).mockResolvedValue(true);
            const result = await clientController.delete(1);
            expect(result).toBeTruthy();
        });

        it('should return false if delete fails', async () => {
            (mockClientService.delete as jest.Mock).mockResolvedValue(false);
            const result = await clientController.delete(1);
            expect(result).toBeFalsy();
        });
    });

    describe('getById', () => {
        it('should retrieve a client by ID', async () => {
            const clientData = new Client(1, 'email@example.com', 'Nom', 'Prenom', 'Password1!', '2000-01-01', 'Ville', '12345', 'Rue', '1', null);
            (mockClientService.getById as jest.Mock).mockResolvedValue(clientData);
            const result = await clientController.getById(1);
            expect(result).toEqual(clientData);
        });

        it('should return null if client is not found', async () => {
            (mockClientService.getById as jest.Mock).mockResolvedValue(null);
            const result = await clientController.getById(99);
            expect(result).toBeNull();
        });
    });

    describe('getByEmail', () => {
        it('should retrieve a client by email', async () => {
            const clientData = new Client(1, 'email@example.com', 'Nom', 'Prenom', 'Password1!', '2000-01-01', 'Ville', '12345', 'Rue', '1', null);
            (mockClientService.getByEmail as jest.Mock).mockResolvedValue(clientData);
            const result = await clientController.getByEmail('email@example.com');
            expect(result).toEqual(clientData);
        });

        it('should return null if email is not found', async () => {
            (mockClientService.getByEmail as jest.Mock).mockResolvedValue(null);
            const result = await clientController.getByEmail('nonexistent@example.com');
            expect(result).toBeNull();
        });
    });

    describe('getAll', () => {
        it('should retrieve all clients', async () => {
            const clients = [new Client(1, 'email@example.com', 'Nom', 'Prenom', 'Password1!', '2000-01-01', 'Ville', '12345', 'Rue', '1', null)];
            (mockClientService.getAll as jest.Mock).mockResolvedValue(clients);
            const result = await clientController.getAll();
            expect(result).toEqual(clients);
        });

        it('should return null if no clients are found', async () => {
            (mockClientService.getAll as jest.Mock).mockResolvedValue(null);
            const result = await clientController.getAll();
            expect(result).toBeNull();
        });
    });
});
