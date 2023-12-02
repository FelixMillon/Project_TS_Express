export class Admin {

    constructor(
        public id: Promise<number>,
        public email:  Promise<string>,
        public nom: Promise<string>,
        public prenom: Promise<string>,
        public mdp: Promise<string>,
        public droits: Promise<number>
    ) {}

}