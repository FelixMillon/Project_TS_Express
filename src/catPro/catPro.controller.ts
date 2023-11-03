import { CatPro } from './catPro';
import { CatProService } from './catPro.service';
export class CatProController {
    constructor(private catProService: CatProService) {}

    async add(libelle: string,description: string): Promise<CatPro | null> {
        this.checkString(libelle, "libelle");
        this.checkString(description, "description");
        return this.catProService.add(libelle, description);
    }

    async update(id: number,libelle: string, description: string): Promise<boolean> {
        this.checkID(id);
        this.checkString(libelle, "libelle");
        this.checkString(description, "email");
        return await this.catProService.update(id,libelle,description);
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
        // is the id a decimal ?
        if (this.isDecimal(id)) {
            throw new Error('Id is not decimal');
        }
        // is the id a negative number ?
        if (id < 0) {
            throw new Error('Id is negative');
        }
        // other checks
    }

    private checkString(testedString: string,key: string) {
        // is the string empty ?
        if (testedString.length < 1) {
            throw new Error(`${key} is empty`);
        }
        // is the string whitespaced ?
        if (testedString.includes(" ")) {
            throw new Error(`${key} is whitespaced`);
        }
        // other checks
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }
}