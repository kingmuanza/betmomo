export class Championnat {
    nom: string;
    id: string;

    constructor(nom: string) {
        this.nom = nom;
        this.id = this.generateID(nom);
    }

    generateID(nom: string) {
        return nom.replace('\'', '').split(' ').join('');
    }

}