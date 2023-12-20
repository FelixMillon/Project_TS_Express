import { Client } from './client';
import { ClientService } from './client.service';
export class ClientController {
    constructor(private clientService: ClientService) {}
    async add(
        email: string,
        nom: string,
        prenom: string,
        mdp: string,
        date_naiss: string,
        ville: string,
        cp: string,
        rue: string,
        numrue: string,
        complement: string | null
    ): Promise<Client | null> {
        this.checkEmail(email);
        this.checkString(nom, "nom");
        this.checkString(prenom, "prenom");
        this.checkPassword(mdp);
        this.checkDate(date_naiss, "date_naiss");
        this.checkString(ville, "ville");
        this.checkString(cp, "cp");
        this.checkString(numrue, "numrue");
        if(complement){
            this.checkString(complement, "complement");
        }
        return await this.clientService.add(
            email,
            nom,
            prenom,
            mdp,
            date_naiss,
            ville,
            cp,
            rue,
            numrue,
            complement
        );
    }

    async update(
        id: number,
        email: string | null,
        nom: string | null,
        prenom: string | null,
        date_naiss: string | null,
        ville: string | null,
        cp: string | null,
        rue: string | null,
        numrue: string | null,
        complement: string | null
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
        if(date_naiss){
            this.checkDate(date_naiss, "date_naiss");
        }
        if(ville){
            this.checkString(ville, "ville");
        }
        if(cp){
            this.checkString(cp, "cp");
        }
        if(rue){
            this.checkString(rue, "rue");
        }
        if(numrue){
            this.checkString(numrue, "numrue");
        }
        if(complement){
            this.checkString(complement, "complement");
        }
        return await this.clientService.update(
            id,
            email,
            nom,
            prenom,
            date_naiss,
            ville,
            cp,
            rue,
            numrue,
            complement
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
        return await this.clientService.updatePassword(
            id,
            oldMdp,
            newMdp,
        );
    }
    
    async delete(id: number): Promise<boolean> {
        this.checkID(id);
        return await this.clientService.delete(id);
    }

    async getById(id: number): Promise<Client | null> {
        this.checkID(id);
        return await this.clientService.getById(id);
    }

    async getByEmail(email: string): Promise<Client | null> {
        this.checkString(email,"email");
        return await this.clientService.getByEmail(email);
    }

    async getAll(): Promise<Client[] | null> {
        return await this.clientService.getAll();
    }

    private checkID(id: number) {
        if (isNaN(id) || id < 1 || id % 1 !== 0) {
            throw new Error('Invalid ID');
        }
    }

    private checkString(testedString: string, key: string) {
        if (testedString.trim().length === 0) {
            throw new Error(`${key} is empty`);
        }
        if (testedString.includes(" ")) {
            throw new Error(`${key} contains whitespace`);
        }
    }

    private checkEmail(email: string) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email');
        }
    }

    private checkPassword(password: string){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        if(!regex.test(password)){
            throw new Error('the password is not robust');
        }
    }

    private checkDate(testedDate: string, key: string){
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexDate.test(testedDate)) {
            throw new Error(`${key} is not in the correct format`);
        }
    }
}