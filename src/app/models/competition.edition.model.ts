import { Competition } from "./competition.model";
import { Equipe } from "./equipe.model";
import { Saison } from "./saison.model";

export class CompetitionEdition {
    id: string;
    idcompetition: string;
    idsaison: string;

    competition?: Competition;
    saison?: Saison;

    equipes = new Array<Equipe>();
    saveOnFirebase = false;

    constructor(idcompetition: string, idsaison: string) {
        this.idcompetition = idcompetition;
        this.idsaison = idsaison;
        this.id = idcompetition + '-' + idsaison;
    }
}