import { Injectable } from '@angular/core';
import { But } from '../models/but.model';

@Injectable({
  providedIn: 'root'
})
export class ButService {
  
  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let but: But;
      this.getAll().then((buts) => {
        buts.forEach((s) => {
          if (s.id === id) {
            but = s;
            resolve(but);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let buts = new Array<But>();
      const item = localStorage.getItem('buts');
      if (item) {
        buts = JSON.parse(item);
      }
      resolve(buts);
    });
  }

  set(but: But): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<But>();
      let modification = false;
      this.getAll().then((buts) => {
        buts.forEach((item) => {
          if (item.id === but.id) {
            resultats.push(but);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(but);
        }
        const item = localStorage.setItem('buts', JSON.stringify(resultats));
        resolve(but);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<But>();
      this.getAll().then((buts) => {
        buts.forEach((item) => {
          if (item.id === id) {
          } else {
            resultats.push(item);
          }
        });
        const item = localStorage.setItem('buts', JSON.stringify(resultats));
        resolve(true);
      });
    });
  }

}
