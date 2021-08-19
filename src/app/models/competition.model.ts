export class Competition {
    id: string;
    nom: string;
    idchampionnat = 'inconnu';
    nombreEquipes = 20;

    
    constructor(nom: string) {
        this.nom = nom;
        this.id = this.generateID(nom);
    }

    generateID(nom: string) {
        return nom.replace('\'', '').split(' ').join('');
    }

}