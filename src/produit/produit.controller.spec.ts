import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';
import { Produit } from './produit';

jest.mock('./produit.service');

describe('ProduitController', () => {
    let produitController: ProduitController;
    let mockProduitService: Partial<ProduitService>;

    beforeEach(() => {
        mockProduitService = {
            add: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            getById: jest.fn(),
            getByCat: jest.fn(),
            getAll: jest.fn(),
        };
        produitController = new ProduitController(mockProduitService as ProduitService);
    });

    describe('add', () => {
        it('should add a produit correctly', async () => {
            const produitData = new Produit(1, 'Libelle', 'Description', 100, '2023-01-01', '2023-12-31', 'url_image', 1);
            (mockProduitService.add as jest.Mock).mockResolvedValue(produitData);

            const result = await produitController.add('Libelle', 'Description', 100, '2023-01-01', '2023-12-31', {}, 1);
            expect(result).toEqual(produitData);
            expect(mockProduitService.add).toHaveBeenCalledWith('Libelle', 'Description', 100, '2023-01-01', '2023-12-31', {}, 1);
        });

        it('should return null if adding produit fails', async () => {
            (mockProduitService.add as jest.Mock).mockResolvedValue(null);
            const result = await produitController.add('Libelle', 'Description', 100, '2023-01-01', '2023-12-31', {}, 1);
            expect(result).toBeNull();
        });
    });

    describe('update', () => {
        it('should update a produit correctly', async () => {
            (mockProduitService.update as jest.Mock).mockResolvedValue(true);
            const result = await produitController.update(1, 'Libelle', 'Description', 100, '2023-01-01', '2023-12-31', {}, 1);
            expect(result).toBeTruthy();
        });

        it('should return false if updating produit fails', async () => {
            (mockProduitService.update as jest.Mock).mockResolvedValue(false);
            const result = await produitController.update(1, 'Libelle', 'Description', 100, '2023-01-01', '2023-12-31', {}, 1);
            expect(result).toBeFalsy();
        });
    });

    describe('delete', () => {
        it('should delete a produit correctly', async () => {
            (mockProduitService.delete as jest.Mock).mockResolvedValue(true);
            const result = await produitController.delete(1);
            expect(result).toBeTruthy();
        });

        it('should return false if delete fails', async () => {
            (mockProduitService.delete as jest.Mock).mockResolvedValue(false);
            const result = await produitController.delete(1);
            expect(result).toBeFalsy();
        });
    });

    describe('getById', () => {
        it('should retrieve a produit by ID', async () => {
            const produitData = new Produit(1, 'Libelle', 'Description', 100, '2023-01-01', '2023-12-31', 'url_image', 1);
            (mockProduitService.getById as jest.Mock).mockResolvedValue(produitData);
            const result = await produitController.getById(1);
            expect(result).toEqual(produitData);
        });

        it('should return null if produit is not found', async () => {
            (mockProduitService.getById as jest.Mock).mockResolvedValue(null);
            const result = await produitController.getById(1);
            expect(result).toBeNull();
        });
    });

    describe('getByCat', () => {
        it('should retrieve produits by category ID', async () => {
            const produits = [new Produit(1, 'Libelle', 'Description', 100, '2023-01-01', '2023-12-31', 'url_image', 1)];
            (mockProduitService.getByCat as jest.Mock).mockResolvedValue(produits);
            const result = await produitController.getByCat(1);
            expect(result).toEqual(produits);
        });

        it('should return null if no produits are found in the category', async () => {
            (mockProduitService.getByCat as jest.Mock).mockResolvedValue(null);
            const result = await produitController.getByCat(1);
            expect(result).toBeNull();
        });
    });

    describe('getAll', () => {
        it('should retrieve all produits', async () => {
            const produits = [new Produit(1, 'Libelle', 'Description', 100, '2023-01-01', '2023-12-31', 'url_image', 1)];
            (mockProduitService.getAll as jest.Mock).mockResolvedValue(produits);
            const result = await produitController.getAll();
            expect(result).toEqual(produits);
        });

        it('should return null if no produits are found', async () => {
            (mockProduitService.getAll as jest.Mock).mockResolvedValue(null);
            const result = await produitController.getAll();
            expect(result).toBeNull();
        });
    });
});
