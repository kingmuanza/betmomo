export class Equipe {
    id: string;
    nom: string;
    notation? = 0;
    estimationMatch? = 0;
    
    constructor(nom: string) {
        this.nom = nom;
        this.id = this.generateID(nom);
    }

    generateID(nom: string) {
        return nom.replace('\'', '').split(' ').join('');
    }

}