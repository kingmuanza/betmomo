import { Injectable } from '@angular/core';
import { Carton } from '../models/carton.model';

@Injectable({
  providedIn: 'root'
})
export class CartonService {
  
  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let carton: Carton;
      this.getAll().then((cartons) => {
        cartons.forEach((s) => {
          if (s.id === id) {
            carton = s;
            resolve(carton);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let cartons = new Array<Carton>();
      const item = localStorage.getItem('cartons');
      if (item) {
        cartons = JSON.parse(item);
      }
      resolve(cartons);
    });
  }

  set(carton: Carton): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Carton>();
      let modification = false;
      this.getAll().then((cartons) => {
        cartons.forEach((item) => {
          if (item.id === carton.id) {
            resultats.push(carton);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(carton);
        }
        resolve(carton);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Carton>();
      this.getAll().then((cartons) => {
        cartons.forEach((item) => {
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
