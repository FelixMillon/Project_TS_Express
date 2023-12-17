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
        this.checkString(email, "email");
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
            this.checkString(email, "email");
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

    async getRights(username: string, password: string): Promise<number> {
        return await this.adminService.getRights(username, password);
    }

    async getAll(): Promise<Admin[] | null> {
        return await this.adminService.getAll();
    }

    async generateToken(username: string, password: string): Promise<String | null>{
        return await this.adminService.generateToken(username, password);
    }

    async verifyToken(token:string): Promise<Boolean>{
        return await this.adminService.verifyToken(token);
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

    private checkRights(id: number) {
        // is the rights a decimal ?
        if (this.isDecimal(id)) {
            throw new Error('Rights is not decimal');
        }
        // is the rights a negative number ?
        if (id < 0) {
            throw new Error('Rights is negative');
        }
        // is the rights contain more than one digit  ?
        if (id > 9) {
            throw new Error('Rights contain more than one digit');
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

    private checkPassword(password: string){
        // is the password robust
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        if(!regex.test(password)){
            throw new Error('the password is not robust');
        }
        // other checks
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }
}