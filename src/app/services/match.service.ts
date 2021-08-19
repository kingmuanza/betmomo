import { Injectable } from '@angular/core';
import { CompetitionEdition } from '../models/competition.edition.model';
import { Match } from '../models/match.model';
import firebase from 'firebase';
import { Subject } from 'rxjs';
import { Equipe } from '../models/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  collection!: string;
  nombreMatchsUploades = 0;
  nombreMatchsUploadesSubject = new Subject<number>();
  nombreMatchsTelecharges = 0;
  nombreMatchsTelechargesSubject = new Subject<number>();
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let match: Match;
      this.getAll().then((matchs) => {
        matchs.forEach((s) => {
          if (s.id === id) {
            match = s;
            resolve(match);
          }
        });
      });
    });
  }

  getAll(): Promise<Match[]> {
    return new Promise((resolve, reject) => {
      let matchs = new Array<Match>();
      const item = localStorage.getItem('matchs');
      if (item) {
        matchs = JSON.parse(item);
      }
      resolve(matchs);
    });
  }

  getAllofCompetitionEdition(competitionEdition: CompetitionEdition): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let matchs = new Array<Match>();
      const resultats = new Array<Match>();
      const item = localStorage.getItem('matchs');
      if (item) {
        matchs = JSON.parse(item);
        matchs.forEach((match) => {
          if (match.idCompetitionEdition === competitionEdition.id) {
            resultats.push(match);
          }
        });
      }
      resolve(resultats);
    });
  }

  getAllofEquipe(equipe: Equipe): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let matchs = new Array<Match>();
      const resultats = new Array<Match>();
      const item = localStorage.getItem('matchs');
      if (item) {
        matchs = JSON.parse(item);
        matchs.forEach((match) => {
          if (match.domicile.id === equipe.id) {
            resultats.push(match);
          }
          if (match.exterieur.id === equipe.id) {
            resultats.push(match);
          }
        });
      }
      resolve(resultats);
    });
  }

  set(match: Match): Promise<any> {
    console.log(match.id);
    return new Promise((resolve, reject) => {
      let resultats = new Array<Match>();
      let modification = false;
      this.getAll().then((matchs) => {
        matchs.forEach((item) => {
          if (item.id === match.id) {
            resultats.push(match);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(match);
        }
        const item = localStorage.setItem('matchs', JSON.stringify(resultats));
        setTimeout(() => {
          resolve(match);
        }, 100);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Match>();
      this.getAll().then((matchs) => {
        matchs.forEach((item) => {
          if (item.id === id) {
          } else {
            resultats.push(item);
          }
        });
        const item = localStorage.setItem('matchs', JSON.stringify(resultats));
        resolve(true);
      });
    });
  }

  getNonUploadedMatchs(): Promise<Array<Match>> {
    console.log('get Non Uploaded Matchs');
    let resultats = new Array<Match>();
    return new Promise((resolve, reject) => {
      this.getAll().then((matchs) => {
        matchs.forEach((match) => {
          if (!match.saveOnFirebase) {
            resultats.push(match);
          }
        });
        console.log(resultats);
        resolve(resultats);
      });
    });
  }

  uploaderMatchs(): Promise<void> {
    console.log('uploaderMatchs');
    return new Promise((resolve, reject) => {
      this.getNonUploadedMatchs().then((matchs) => {
        this.uploadMatchOneByOne(matchs).then(() => {
          resolve();
        });
      });
    });
  }

  async uploadMatchOneByOne(matchs: Array<Match>) {
    console.log('uploadMatchOneByOne');
    const db = firebase.firestore();
    for (let index = 0; index < matchs.length; index++) {
      const element = matchs[index];
      element.saveOnFirebase = true;
      await db.collection('matchs').doc(element.id).set(JSON.parse(JSON.stringify(element)));
      await this.set(element);
      this.nombreMatchsUploadesSubject.next(index + 1);
    }
  }

  telechargerMatch(): Promise<void> {
    return new Promise((resolve, reject) => {
      const db = firebase.firestore();
      let i = 0;
      const matchs = new Array<Match>();
      db.collection('matchs').get().then((resultats) => {
        const size = resultats.size;
        resultats.forEach((resultat) => {
          const match = resultat.data() as Match;
          matchs.push(match);
        });
        this.enregistrerMatchs(matchs).then(() => {
          resolve();
        })
      });
    });
  }

  async enregistrerMatchs(matchs: Array<Match>) {
    for(let i = 0; i < matchs.length; i++) {
      const match = matchs[i];
      console.log(i);
      await this.set(match);
      this.nombreMatchsTelechargesSubject.next(i);
    }
  }
}
