export class Client {

    constructor(
        public id: number,
        public email: string,
        public nom: string,
        public prenom: string,
        public mdp: string,
        public date_naiss: string,
        public ville: string,
        public cp: string,
        public rue: string,
        public numrue: string,
        public complement: string | null,
    ) {}

}