import { Injectable } from '@angular/core';
import { Saison } from '../models/saison.model';

@Injectable({
  providedIn: 'root'
})
export class SaisonService {

  collection = 'saisons';
  saisons = new Array<Saison>();

  constructor() { }
  get(id: string): Promise<Saison> {
    return new Promise((resolve, reject) => {
      let saison: Saison;
      this.getAll().then((saisons) => {
        saisons.forEach((s) => {
          if (s.id === id) {
            saison = s;
            resolve(saison);
          }
        });
      });
    });
  }

  getAll(): Promise<Saison[]> {
    return new Promise((resolve, reject) => {
      let saisons = new Array<Saison>();
      /*
      saisons.push(new Saison(2021));
      saisons.push(new Saison(2022));
      localStorage.setItem('saisons', JSON.stringify(saisons));
      */
      const item = localStorage.getItem('saisons');
      if (item) {
        saisons = JSON.parse(item);
      }
      resolve(saisons);
    });
  }
  set(item: any): Promise<any> {
    return new Promise((resolve, reject) => { });
  }
  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => { });
  }
}
