import { Admin } from './admin';
import { AdminService } from './admin.service';
export class AdminController {
    constructor(private adminService: AdminService) {}

    async add(
        email: string,
        nom:string,
        prenom:string,
        mdp: string,
        droits: number
    ): Promise<Admin | null> {
        this.checkRights(droits);
        this.checkEmail(email);
        this.checkString(nom, "nom");
        this.checkString(prenom, "prenom");
        this.checkPassword(mdp);
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
        email: string | null,
        nom:string | null,
        prenom:string | null,
        droits: number | null
    ): Promise<boolean> {
        this.checkID(id);
        if(email){
            this.checkEmail(email);
        }
        if(nom){
            this.checkString(nom, "nom");
        }
        if(prenom){
            this.checkString(prenom, "prenom");
        }
        if(droits){
            this.checkRights(droits);
        }
        return await this.adminService.update(
            id,
            email,
            nom,
            prenom,
            droits
        );
    }

    async updatePassword(
        id: number,
        oldMdp: string,
        newMdp: string
    ): Promise<boolean> {
        this.checkID(id);
        this.checkPassword(oldMdp);
        this.checkPassword(newMdp);
        return await this.adminService.updatePassword(
            id,
            oldMdp,
            newMdp,
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

    async getByRights(droits: number): Promise<Admin[] | null> {
        return await this.adminService.getByRights(droits);
    }

    async getAll(): Promise<Admin[] | null> {
        return await this.adminService.getAll();
    }

    private checkID(id: number) {
        if (this.isDecimal(id)) {
            throw new Error('Id is not decimal');
        }
        if (id < 0) {
            throw new Error('Id is negative');
        }
    }
    private checkEmail(email: string) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
    }

    private checkRights(id: number) {
        if (this.isDecimal(id)) {
            throw new Error('Rights is not decimal');
        }
        if (id < 0) {
            throw new Error('Rights is negative');
        }
        if (id > 9) {
            throw new Error('Rights contain more than one digit');
        }
    }

    private checkString(testedString: string,key: string) {
        if (testedString.length < 1) {
            throw new Error(`${key} is empty`);
        }
        if (testedString.includes(" ")) {
            throw new Error(`${key} is whitespaced`);
        }
    }

    private checkPassword(password: string){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        if(!regex.test(password)){
            throw new Error('the password is not robust');
        }
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }
}