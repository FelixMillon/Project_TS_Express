import { User } from './user';
import { UserService } from './user.service';
import fs from 'fs';
export class UserController {
    constructor(private userService: UserService) {}
    private users : User[] = []; 
    private filename : string = 'user.json';

    async add(username: string,email: string, password: string): Promise<User | null> {
        this.checkString(username, "username");
        this.checkString(email, "email");
        this.checkString(password, "password");
        this.checkPassword(password);
        return this.userService.add(username, email, password);
    }

    async getById(id: number): Promise<User | null> {
        this.checkID(id);
        return await this.userService.getById(id);
    }

    async updateUser(id: number,username: string, email: string): Promise<boolean> {
        this.checkID(id);
        this.checkString(username, "username");
        this.checkString(email, "email");
        this.checkEmailIsFree(email);
        return await this.userService.updateUser(id,username,email);
    }
    
    async delete(id: number): Promise<boolean> {
        this.checkID(id);
        return await this.userService.delete(id);
    }

    async getByEmail(email: string): Promise<User | null> {
        this.checkString(email, "email");
        return await this.userService.getByEmail(email);
    }

    async updatePassword(id: number, password: string): Promise<boolean> {
        this.checkID(id);
        this.checkString(password, "password");
        this.checkPassword(password);
        return await this.userService.updatePassword(id, password);
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

    private checkPassword(password: string){
        // is the password robust
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        if(!regex.test(password)){
            throw new Error('the password is not robust');
        }
        // other checks
    }

    private checkEmailIsFree(email: string){
        // is the email is free
        this.users = JSON.parse(fs.readFileSync(this.filename, 'utf8'));
        if(this.users.find((u : any) => u.email === email)){
            throw new Error("This email is already used");
        }
        // other checks
    }
}