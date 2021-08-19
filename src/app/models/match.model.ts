import { But } from "./but.model";
import { Equipe } from "./equipe.model";

export class Match {
    id:string;
    domicile!: Equipe;
    exterieur!: Equipe;
    domicileButs = new Array<But>();
    domicileButsMiTemps = 0;
    domicileScore = 0;
    exterieurButs = new Array<But>();
    exterieurButsMiTemps = 0;
    exterieurScore = 0;

    enchainement = '';
    enchainement1 = '';
    enchainement2 = '';

    idCompetitionEdition!: string;
    journee = 0;

    saveOnFirebase = false;

    constructor(id: string) {
        this.id = id;
    }
}