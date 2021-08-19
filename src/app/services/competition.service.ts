import { Injectable } from '@angular/core';
import { Competition } from '../models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  
  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let competition: Competition;
      this.getAll().then((competitions) => {
        competitions.forEach((s) => {
          if (s.id === id) {
            competition = s;
            resolve(competition);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let competitions = new Array<Competition>();
      const item = localStorage.getItem('competitions');
      if (item) {
        competitions = JSON.parse(item);
      }
      resolve(competitions);
    });
  }

  set(competition: Competition): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Competition>();
      let modification = false;
      this.getAll().then((competitions) => {
        competitions.forEach((item) => {
          if (item.id === competition.id) {
            resultats.push(competition);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(competition);
        }
        const item = localStorage.setItem('competitions', JSON.stringify(resultats));
        resolve(competition);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Competition>();
      this.getAll().then((competitions) => {
        competitions.forEach((item) => {
          if (item.id === id) {
          } else {
            resultats.push(item);
          }
        });
        const item = localStorage.setItem('competitions', JSON.stringify(resultats));
        resolve(true);
      });
    });
  }

}
