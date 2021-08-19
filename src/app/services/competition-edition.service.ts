import { Injectable } from '@angular/core';
import { CompetitionEdition } from '../models/competition.edition.model';
import { Competition } from '../models/competition.model';
import { CompetitionService } from './competition.service';
import { SaisonService } from './saison.service';
import firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionEditionService {

  collection!: string;
  nombreCompetitionsUploadesSubject = new Subject<number>();
  nombreCompetitionsTelechargesSubject = new Subject<number>();
  constructor(
    private competitionService: CompetitionService,
    private saisonService: SaisonService
  ) { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let competitionEdition: CompetitionEdition;
      this.getAll().then((competitionEditions) => {
        competitionEditions.forEach((s) => {
          if (s.id === id) {
            competitionEdition = s;
            resolve(competitionEdition);
          }
        });
      });
    });
  }

  getAll(): Promise<CompetitionEdition[]> {
    return new Promise(async (resolve, reject) => {
      let competitionEditions = new Array<CompetitionEdition>();
      const item = localStorage.getItem('competitionEditions');
      if (item) {
        competitionEditions = JSON.parse(item);
        const longueur = competitionEditions.length;
        if (longueur > 0) {
          for (let i = 0; i < longueur; i++) {
            const competitionEdition = competitionEditions[i];
            competitionEdition.competition = await this.competitionService.get(competitionEdition.idcompetition);
            competitionEdition.saison = await this.saisonService.get(competitionEdition.idsaison);
          }
        }
      }
      resolve(competitionEditions);
    });
  }

  getAllOfCompetition(competition: Competition): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      let competitionEditions = new Array<CompetitionEdition>();
      let resultats = new Array<CompetitionEdition>();
      const item = localStorage.getItem('competitionEditions');
      if (item) {
        competitionEditions = JSON.parse(item);
        const longueur = competitionEditions.length;
        if (longueur > 0) {
          for (let i = 0; i < longueur; i++) {
            const competitionEdition = competitionEditions[i];
            if (competitionEdition.idcompetition === competition.id) {
              competitionEdition.competition = await this.competitionService.get(competitionEdition.idcompetition);
              competitionEdition.saison = await this.saisonService.get(competitionEdition.idsaison);
              resultats.push(competitionEdition);
            }
          }
        }
      }
      resolve(resultats);
    });
  }

  set(competitionEdition: CompetitionEdition): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<CompetitionEdition>();
      let modification = false;
      this.getAll().then((competitionEditions) => {
        competitionEditions.forEach((item) => {
          if (item.id === competitionEdition.id) {
            resultats.push(competitionEdition);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(competitionEdition);
        }
        const item = localStorage.setItem('competitionEditions', JSON.stringify(resultats));
        resolve(competitionEdition);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<CompetitionEdition>();
      this.getAll().then((competitionEditions) => {
        competitionEditions.forEach((item) => {
          if (item.id === id) {
          } else {
            resultats.push(item);
          }
        });
        const item = localStorage.setItem('competitionEditions', JSON.stringify(resultats));
        resolve(true);
      });
    });
  }

  async uploadCompetitionOneByOne(competitionEditions: Array<CompetitionEdition>) {
    console.log('uploadMatchOneByOne');
    const db = firebase.firestore();
    for (let index = 0; index < competitionEditions.length; index++) {
      const element = competitionEditions[index];
      element.saveOnFirebase = true;
      await db.collection('competitions-editions').doc(element.id).set(JSON.parse(JSON.stringify(element)));
      if (element.competition) {
        await db.collection('competitions').doc(element.competition.id).set(JSON.parse(JSON.stringify(element.competition)));
      }await this.set(element);
      this.nombreCompetitionsUploadesSubject.next(index + 1);
    }
  }

  uploadCompetitionsEditions(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.getAll().then((competitionEditions) => {
        this.uploadCompetitionOneByOne(competitionEditions).then(() => {
          resolve();
        });
      });
    });
  }

  telechargerCompetitions(): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      let i = 0;
      const competitionEditions = new Array<CompetitionEdition>();
      db.collection('competitions-editions').get().then((resultats) => {
        const size = resultats.size;
        resultats.forEach((resultat) => {
          const competitionEdition = resultat.data() as CompetitionEdition;
          competitionEditions.push(competitionEdition);
        });
        this.enregistrerCompetitions(competitionEditions).then(() => {
          resolve();
        })
      });
    });
  }

  async enregistrerCompetitions(matchs: Array<CompetitionEdition>) {
    for(let i = 0; i < matchs.length; i++) {
      const match = matchs[i];
      console.log(i);
      await this.set(match);
      this.nombreCompetitionsTelechargesSubject.next(i);
    }
  }

}
