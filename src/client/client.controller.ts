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
        this.checkString(email, "email");
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
            this.checkString(email, "email");
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

    private checkPassword(password: string){
        // is the password robust
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        if(!regex.test(password)){
            throw new Error('the password is not robust');
        }
        // other checks
    }

    private checkDate(testedDate: string, key: string){
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        if (!regexDate.test(testedDate)) {
            throw new Error(`${key} is not in the correct format`);
        }
    }

    private isDecimal(id: number): boolean {
        return id % 1 != 0;
    }
}