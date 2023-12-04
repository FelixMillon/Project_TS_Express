export class Admin {

    constructor(
        public id: number,
        public email: string,
        public nom: string,
        public prenom: string,
        public mdp: string,
        public droits: number
    ) {}

}