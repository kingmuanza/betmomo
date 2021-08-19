import { Injectable } from '@angular/core';
import { Classement } from '../models/classement.model';

@Injectable({
  providedIn: 'root'
})
export class ClassementService {
  
  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let classement: Classement;
      this.getAll().then((classements) => {
        classements.forEach((s) => {
          if (s.id === id) {
            classement = s;
            resolve(classement);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let classements = new Array<Classement>();
      const item = localStorage.getItem('classements');
      if (item) {
        classements = JSON.parse(item);
      }
      resolve(classements);
    });
  }

  set(classement: Classement): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Classement>();
      let modification = false;
      this.getAll().then((classements) => {
        classements.forEach((item) => {
          if (item.id === classement.id) {
            resultats.push(classement);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(classement);
        }
        resolve(classement);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Classement>();
      this.getAll().then((classements) => {
        classements.forEach((item) => {
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
