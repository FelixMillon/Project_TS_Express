import { CatProController } from './catPro.controller';
import { CatProService } from './catPro.service';
import { CatPro } from './catPro';

describe('CatProController', () => {
    let catProController: CatProController;
    let mockCatProService: Partial<CatProService>;

    beforeEach(() => {
        mockCatProService = {
            add: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            getById: jest.fn(),
            getAll: jest.fn(),
        };
        catProController = new CatProController(mockCatProService as CatProService);
    });

    describe('add', () => {
        it('should add a category correctly', async () => {
            const catPro = new CatPro(1, 'Libelle', 'Description');
            (mockCatProService.add as jest.Mock).mockResolvedValue(catPro);

            const result = await catProController.add('Libelle', 'Description');
            expect(result).toEqual(catPro);
            expect(mockCatProService.add).toHaveBeenCalledWith('Libelle', 'Description');
        });
    });

    describe('update', () => {
        it('should update a category correctly', async () => {
            (mockCatProService.update as jest.Mock).mockResolvedValue(true);

            const result = await catProController.update(1, 'NewLibelle', 'NewDescription');
            expect(result).toBeTruthy();
            expect(mockCatProService.update).toHaveBeenCalledWith(1, 'NewLibelle', 'NewDescription');
        });
    });

    describe('delete', () => {
        it('should delete a category correctly', async () => {
            (mockCatProService.delete as jest.Mock).mockResolvedValue(true);

            const result = await catProController.delete(1);
            expect(result).toBeTruthy();
            expect(mockCatProService.delete).toHaveBeenCalledWith(1);
        });
    });

    describe('getById', () => {
        it('should retrieve a category by ID', async () => {
            const catPro = new CatPro(1, 'Libelle', 'Description');
            (mockCatProService.getById as jest.Mock).mockResolvedValue(catPro);

            const result = await catProController.getById(1);
            expect(result).toEqual(catPro);
            expect(mockCatProService.getById).toHaveBeenCalledWith(1);
        });
    });

    describe('getAll', () => {
        it('should retrieve all categories', async () => {
            const catPros = [new CatPro(1, 'Libelle', 'Description')];
            (mockCatProService.getAll as jest.Mock).mockResolvedValue(catPros);

            const result = await catProController.getAll();
            expect(result).toEqual(catPros);
            expect(mockCatProService.getAll).toHaveBeenCalled();
        });
    });

    describe('Validation Tests', () => {
        it('should throw an error for invalid libelle input', () => {
            expect(() => CatProController.checkString(';InvalidLibelle;', 'libelle')).toThrow('libelle contains invalid characters');
        });

        it('should throw an error for libelle exceeding maximum length', () => {
            const longString = 'a'.repeat(101);
            expect(() => CatProController.checkString(longString, 'libelle')).toThrow('libelle exceeds maximum length of 100');
        });
    });
});
