import { Injectable } from '@angular/core';
import { Match } from '../models/match.model';

@Injectable({
  providedIn: 'root'
})
export class PrevisionService {

  victoireDomicile = 0;
  defaiteDomicile = 0;
  nulDomicile = 0;

  plus00 = 0
  plus05 = 0;
  plus15 = 0;
  plus25 = 0;
  plus35 = 0;
  plus45 = 0;

  plus00domicile = 0;
  plus05domicile = 0;
  plus15domicile = 0;
  plus25domicile = 0;
  plus35domicile = 0;
  plus45domicile = 0;

  plus00exterieur = 0
  plus05exterieur = 0;
  plus15exterieur = 0;
  plus25exterieur = 0;
  plus35exterieur = 0;
  plus45exterieur = 0;

  plus00premiereMitemps = 0
  plus05premiereMitemps = 0;
  plus15premiereMitemps = 0;
  plus25premiereMitemps = 0;
  plus35premiereMitemps = 0;
  plus45premiereMitemps = 0;

  plus00secondeMitemps = 0
  plus05secondeMitemps = 0;
  plus15secondeMitemps = 0;
  plus25secondeMitemps = 0;
  plus35secondeMitemps = 0;
  plus45secondeMitemps = 0;


  constructor() { }

  calculer(matchs: Array<Match>) {
    this.init();

    matchs.forEach((match) => {
      // Voictoire défaite
      if (match.domicileScore > match.exterieurScore) {
        this.victoireDomicile = this.victoireDomicile + 1
      }
      if (match.domicileScore < match.exterieurScore) {
        this.defaiteDomicile = this.defaiteDomicile + 1
      }
      if (match.domicileScore === match.exterieurScore) {
        this.nulDomicile = this.nulDomicile + 1
      }
      // Plus de buts
      if (match.domicileScore === 0 && match.exterieurScore === 0) {
        this.plus00 = this.plus00 + 1
      }
      if (match.domicileScore + match.exterieurScore > 0) {
        this.plus05 = this.plus05 + 1
      }
      if (match.domicileScore + match.exterieurScore > 1) {
        this.plus15 = this.plus15 + 1
      }
      if (match.domicileScore + match.exterieurScore > 2) {
        this.plus25 = this.plus25 + 1
      }
      if (match.domicileScore + match.exterieurScore > 3) {
        this.plus35 = this.plus35 + 1
      }
      if (match.domicileScore + match.exterieurScore > 4) {
        this.plus45 = this.plus45 + 1
      }

      // Plus de buts à domicile
      if (match.domicileScore === 0) {
        this.plus00domicile = this.plus00domicile + 1
      }
      if (match.domicileScore > 0) {
        this.plus05domicile = this.plus05domicile + 1
      }
      if (match.domicileScore > 1) {
        this.plus15domicile = this.plus15domicile + 1
      }
      if (match.domicileScore > 2) {
        this.plus25domicile = this.plus25domicile + 1
      }
      if (match.domicileScore > 3) {
        this.plus35domicile = this.plus35domicile + 1
      }
      if (match.domicileScore > 4) {
        this.plus45domicile = this.plus45domicile + 1
      }

      // Plus de buts à l'extérieur
      if (match.exterieurScore === 0) {
        this.plus00exterieur = this.plus00exterieur + 1
      }
      if (match.exterieurScore > 0) {
        this.plus05exterieur = this.plus05exterieur + 1
      }
      if (match.exterieurScore > 1) {
        this.plus15exterieur = this.plus15exterieur + 1
      }
      if (match.exterieurScore > 2) {
        this.plus25exterieur = this.plus25exterieur + 1
      }
      if (match.exterieurScore > 3) {
        this.plus35exterieur = this.plus35exterieur + 1
      }
      if (match.exterieurScore > 4) {
        this.plus45exterieur = this.plus45exterieur + 1
      }

    });

  }

  init() {

    this.victoireDomicile = 0;
    this.defaiteDomicile = 0;
    this.nulDomicile = 0;

    this.plus00 = 0
    this.plus05 = 0;
    this.plus15 = 0;
    this.plus25 = 0;
    this.plus35 = 0;
    this.plus45 = 0;

    this.plus00domicile = 0;
    this.plus05domicile = 0;
    this.plus15domicile = 0;
    this.plus25domicile = 0;
    this.plus35domicile = 0;
    this.plus45domicile = 0;

    this.plus00exterieur = 0
    this.plus05exterieur = 0;
    this.plus15exterieur = 0;
    this.plus25exterieur = 0;
    this.plus35exterieur = 0;
    this.plus45exterieur = 0;

    this.plus00premiereMitemps = 0
    this.plus05premiereMitemps = 0;
    this.plus15premiereMitemps = 0;
    this.plus25premiereMitemps = 0;
    this.plus35premiereMitemps = 0;
    this.plus45premiereMitemps = 0;

    this.plus00secondeMitemps = 0
    this.plus05secondeMitemps = 0;
    this.plus15secondeMitemps = 0;
    this.plus25secondeMitemps = 0;
    this.plus35secondeMitemps = 0;
    this.plus45secondeMitemps = 0;

  }

  getScenarios(matchs: Array<Match>) {
    const enchainements = new Array<string>();
    matchs.sort((a, b) => {
      if (a.enchainement.length === b.enchainement.length) {
        return a.enchainement < b.enchainement ? -1 : 1;
      }
      return a.enchainement.length < b.enchainement.length ? -1 : 1;
    });
    matchs.forEach((match) => {
      enchainements.push(match.enchainement);
    });
    return this.getOccurence(enchainements);
  }

  getOccurence(enchainements: Array<string>) {

    const occurences = [];

    let a = [],
      b = [],
      arr = [...enchainements], // clone array so we don't change the original when using .sort()
      prev;

    arr.sort();
    for (let element of arr) {
      if (element !== prev) {
        a.push(element);
        b.push(1);
      }
      else ++b[b.length - 1];
      prev = element;
    }

    for( let i = 0; i < a.length; i++) {
      occurences.push({
        enchainement: a[i],
        occurence: b[i]
      })
    }

    return occurences.sort((a,b) => {
      return a.occurence > b.occurence ? -1: 1
    });
  }

}
