import { Injectable } from '@angular/core';
import { Corner } from '../models/corner.model';

@Injectable({
  providedIn: 'root'
})
export class CornerService {
  
  collection!: string;
  constructor() { }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let corner: Corner;
      this.getAll().then((corners) => {
        corners.forEach((s) => {
          if (s.id === id) {
            corner = s;
            resolve(corner);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let corners = new Array<Corner>();
      const item = localStorage.getItem('corners');
      if (item) {
        corners = JSON.parse(item);
      }
      resolve(corners);
    });
  }

  set(corner: Corner): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Corner>();
      let modification = false;
      this.getAll().then((corners) => {
        corners.forEach((item) => {
          if (item.id === corner.id) {
            resultats.push(corner);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(corner);
        }
        resolve(corner);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Corner>();
      this.getAll().then((corners) => {
        corners.forEach((item) => {
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
