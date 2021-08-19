export class Saison {
    id: string;
    nom: string;

    constructor(id: number) {
        this.id = id + '';
        this.nom = this.genererNom(id);
    }

    genererNom(id: number) {
        const annee = id;
        const anneepassee = id - 1;
        return anneepassee + '/' + annee;

    }
}