import { Admin } from './admin';
import { AdminService } from './admin.service';
export class ClientController {
    constructor(private adminService: AdminService) {}

    async add(
        email: string,
        nom: string,
        prenom: string,
        mdp: string,
        droits: number
    ): Promise<Admin | null> {
        this.checkString(email, "email");
        this.checkString(nom, "nom");
        this.checkString(prenom, "prenom");
        this.checkString(mdp, "mdp");
        this.isDecimal(droits)
        return await this.adminService.add(
            email,
            nom,
            prenom,
            mdp,
            droits
        );
    }

    async update(
        id: number,
        email: string,
        nom: string,
        prenom: string,
    ): Promise<boolean> {
        this.checkID(id);
        if(email){
            this.checkString(email, "email");
        }
        if(nom){
            this.checkString(nom, "nom");
        }
        if(prenom){
            this.checkString(prenom, "prenom");
        }
        return await this.adminService.update(
            id,
            email,
            nom,
            prenom
        );
    }

    async updatePassword(
        id: number,
        oldMdp: string,
        newMdp: string
    ): Promise<boolean> {
        this.checkID(id);
        this.checkString(oldMdp, "oldMdp");
        this.checkString(newMdp, "newMdp");
        return await this.adminService.updatePassword(
            id,
            oldMdp,
            newMdp,
        );
    }

    async updateRights(
        id: number,
        droits: number
    ): Promise<boolean> {
        this.checkID(id);
        this.isDecimal(droits);
        return await this.adminService.updateRights(
            id,
            droits
        );
    }
    
    async delete(id: number): Promise<boolean> {
        this.checkID(id);
        return await this.adminService.delete(id);
    }

    async getById(id: number): Promise<Admin | null> {
        this.checkID(id);
        return await this.adminService.getById(id);
    }

    async getByEmail(email: string): Promise<Admin | null> {
        this.checkString(email,"email");
        return await this.adminService.getByEmail(email);
    }

    async getAll(): Promise<Admin[] | null> {
        return await this.adminService.getAll();
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