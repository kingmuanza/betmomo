import { Injectable } from '@angular/core';
import { Equipe } from '../models/equipe.model';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  
  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let equipe: Equipe;
      this.getAll().then((equipes) => {
        equipes.forEach((s) => {
          if (s.id === id) {
            equipe = s;
            resolve(equipe);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let equipes = new Array<Equipe>();
      const item = localStorage.getItem('equipes');
      if (item) {
        equipes = JSON.parse(item);
      }
      resolve(equipes);
    });
  }

  set(equipe: Equipe): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Equipe>();
      let modification = false;
      this.getAll().then((equipes) => {
        equipes.forEach((item) => {
          if (item.id === equipe.id) {
            resultats.push(equipe);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(equipe);
        }
        const item = localStorage.setItem('equipes', JSON.stringify(resultats));
        setTimeout(() => {
          resolve(equipe);
        }, 100);
        resolve(equipe);
      });
    });
  }

  setEstimationMatch(equipe: Equipe): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Equipe>();
      let modification = false;
      this.getAll().then((equipes) => {
        equipes.forEach((item) => {
          if (item.id === equipe.id) {
            if (item.estimationMatch) {
              item.estimationMatch = item.estimationMatch + 1;
            } else {
              item.estimationMatch = 1;
            }
            equipe.estimationMatch = item.estimationMatch;
            resultats.push(equipe);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(equipe);
        }
        const item = localStorage.setItem('equipes', JSON.stringify(resultats));
        setTimeout(() => {
          resolve(equipe);
        }, 100);
        resolve(equipe);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Equipe>();
      this.getAll().then((equipes) => {
        equipes.forEach((item) => {
          if (item.id === id) {
          } else {
            resultats.push(item);
          }
        });
        const item = localStorage.setItem('equipes', JSON.stringify(resultats));
        resolve(true);
      });
    });
  }

}
