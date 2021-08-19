import { Injectable } from '@angular/core';
import { Championnat } from '../models/championnat.model';

@Injectable({
  providedIn: 'root'
})
export class ChampionnatService {

  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let championnat: Championnat;
      this.getAll().then((championnats) => {
        championnats.forEach((s) => {
          if (s.id === id) {
            championnat = s;
            resolve(championnat);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let championnats = new Array<Championnat>();
      championnats.push(new Championnat('Championnat de France'));
      championnats.push(new Championnat('Championnat d\'Angleterre'));
      championnats.push(new Championnat('Championnat d\'Italie'));
      championnats.push(new Championnat('Championnat d\'Allemagne'));
      championnats.push(new Championnat('Championnat d\'Europe'));
      championnats.push(new Championnat('Championnat d\'Espagne'));
      const item = localStorage.getItem('championnats');
      if (item) {
        championnats = JSON.parse(item);
      }
      resolve(championnats);
    });
  }

  set(championnat: Championnat): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Championnat>();
      let modification = false;
      this.getAll().then((championnats) => {
        championnats.forEach((item) => {
          if (item.id === championnat.id) {
            resultats.push(championnat);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(championnat);
        }
        resolve(championnat);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Championnat>();
      this.getAll().then((championnats) => {
        championnats.forEach((item) => {
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
