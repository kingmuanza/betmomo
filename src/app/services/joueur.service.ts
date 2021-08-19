import { Injectable } from '@angular/core';
import { Joueur } from '../models/joueur.model';

@Injectable({
  providedIn: 'root'
})
export class JoueurService {
  
  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let joueur: Joueur;
      this.getAll().then((joueurs) => {
        joueurs.forEach((s) => {
          if (s.id === id) {
            joueur = s;
            resolve(joueur);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let joueurs = new Array<Joueur>();
      const item = localStorage.getItem('joueurs');
      if (item) {
        joueurs = JSON.parse(item);
      }
      resolve(joueurs);
    });
  }

  set(joueur: Joueur): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Joueur>();
      let modification = false;
      this.getAll().then((joueurs) => {
        joueurs.forEach((item) => {
          if (item.id === joueur.id) {
            resultats.push(joueur);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(joueur);
        }
        resolve(joueur);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Joueur>();
      this.getAll().then((joueurs) => {
        joueurs.forEach((item) => {
          if (item.id === id) {
          } else {
            resultats.push(item);
          }
        });
        resolve(true);
      });
    });
  }

}
