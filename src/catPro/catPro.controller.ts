import { CatPro } from './catPro';
import { CatProService } from './catPro.service';
export class CatProController {
    constructor(private catProService: CatProService) {}

    async add(libelle: string,description: string): Promise<CatPro | null> {
        CatProController.checkString(libelle, 'libelle');
        CatProController.checkString(description, 'description');
        return await this.catProService.add(libelle, description);
    }

    async update(
        id_cat: number,
        libelle: string | null,
        description: string | null
    ): Promise<boolean> {
        console.log(id_cat)
        this.checkID(id_cat);
        if (libelle !== null) CatProController.checkString(libelle, 'libelle');
        if (description !== null) CatProController.checkString(description, 'description');
        return await this.catProService.update(id_cat,libelle,description);
    }
    
    async delete(id: number): Promise<boolean> {
        this.checkID(id);
        return await this.catProService.delete(id);
    }

    async getById(id: number): Promise<CatPro | null> {
        this.checkID(id);
        return await this.catProService.getById(id);
    }

    async getAll(): Promise<CatPro[] | null> {
        return await this.catProService.getAll();
    }

    private checkID(id: number) {
        if (this.isDecimal(id)) {
            throw new Error('Id is not decimal');
        }
        if (id < 0) {
            throw new Error('Id is negative');
        }
    }

    public static checkString(testedString: string, key: string) {
        testedString = testedString.trim();

        if (testedString.length < 1) {
            throw new Error(`${key} is empty`);
        }
        if (testedString.includes("\\") || testedString.includes(";") || testedString.includes(",") ||
            testedString.includes("|") || testedString.includes("--") || 
            testedString.includes("``")) {
            throw new Error(`${key} contains invalid characters`);
        }
    
        testedString = testedString.replace(/['"]/g, "\$&");
    
        const maxLength = key === 'libelle' ? 100 : 255;
        if (testedString.length > maxLength) {
            throw new Error(`${key} exceeds maximum length of ${maxLength}`);
        }
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }
}