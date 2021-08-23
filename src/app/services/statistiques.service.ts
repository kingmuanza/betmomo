import { Injectable } from '@angular/core';
import { But } from '../models/but.model';
import { Equipe } from '../models/equipe.model';
import { Match } from '../models/match.model';
import { Stat } from '../models/stat.model';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  collection!: string;
  total = 0;
  domiciles = 0;
  exterieurs = 0;
  premiereMitemps = 0;
  secondeMitemps = 0;
  premiereMitempsDomicile = 0;
  premiereMitempsExterieur = 0;
  secondeMitempsDomicile = 0;
  secondeMitempsExterieur = 0;

  // Total de buts
  deuxEquipesMarques = 0;
  domicileMarque = 0;
  exterieurMarque = 0;
  domicileMarquePremiereMitemps = 0;
  exterieurMarquePremiereMitemps = 0;
  domicileMarqueSecondeMitemps = 0;
  exterieurMarqueSecondeMitemps = 0;

  buts = new Array<But>();


  constructor() { }


  calculer(matchs: Array<Match>) {
    this.total = 0;
    this.domiciles = 0;
    this.exterieurs = 0;


    this.premiereMitemps = 0;
    this.secondeMitemps = 0;

    this.premiereMitempsDomicile = 0;
    this.premiereMitempsExterieur = 0;

    this.secondeMitempsDomicile = 0;
    this.secondeMitempsExterieur = 0;

    // Total de buts
    this.deuxEquipesMarques = 0;
    this.domicileMarque = 0;
    this.exterieurMarque = 0;
    this.domicileMarquePremiereMitemps = 0;
    this.exterieurMarquePremiereMitemps = 0;
    this.domicileMarqueSecondeMitemps = 0;
    this.exterieurMarqueSecondeMitemps = 0;

    matchs.forEach((match) => {

      // Total
      this.total = this.total + match.domicileScore;
      this.total = this.total + match.exterieurScore;

      // Docimile
      this.domiciles = this.domiciles + match.domicileScore;
      // exterieurs
      this.exterieurs = this.exterieurs + match.exterieurScore;

      // Première mi temps
      match.domicileButs.forEach((but) => {
        if (but.minute < 46) {
          this.premiereMitempsDomicile = this.premiereMitempsDomicile + 1;
        } else {
          this.secondeMitempsDomicile = this.secondeMitempsDomicile + 1;
        }
      });
      // Première mi temps
      match.exterieurButs.forEach((but) => {
        if (but.minute < 46) {
          this.premiereMitempsExterieur = this.premiereMitempsExterieur + 1;
        } else {
          this.secondeMitempsExterieur = this.secondeMitempsExterieur + 1;
        }
      });

      if (match.domicileScore > 0 && match.exterieurScore > 0) {
        this.deuxEquipesMarques = this.deuxEquipesMarques + 1;
      }

      if (match.exterieurScore > 0) {
        this.exterieurMarque = this.exterieurMarque + 1;
        let butPremiereMitemps = false;
        let butSecondeMitemps = false;
        match.exterieurButs.forEach((but) => {
          if (but.minute < 46) {
            butPremiereMitemps = true;
          }
          if (but.minute > 45) {
            butSecondeMitemps = true;
          }
        });
        if (butPremiereMitemps) {
          this.exterieurMarquePremiereMitemps = this.exterieurMarquePremiereMitemps + 1;
        }
        if (butSecondeMitemps) {
          this.exterieurMarqueSecondeMitemps = this.exterieurMarqueSecondeMitemps + 1;
        }
      }

      if (match.domicileScore > 0) {
        this.domicileMarque = this.domicileMarque + 1;
        let butPremiereMitemps = false;
        let butSecondeMitemps = false;
        match.domicileButs.forEach((but) => {
          if (but.minute < 46) {
            butPremiereMitemps = true;
          }
          if (but.minute > 45) {
            butSecondeMitemps = true;
          }
        });
        if (butPremiereMitemps) {
          this.domicileMarquePremiereMitemps = this.domicileMarquePremiereMitemps + 1;
        }
        if (butSecondeMitemps) {
          this.domicileMarqueSecondeMitemps = this.domicileMarqueSecondeMitemps + 1;
        }
      }

      this.premiereMitemps = this.premiereMitempsDomicile + this.premiereMitempsExterieur;
      this.secondeMitemps = this.secondeMitempsDomicile + this.secondeMitempsExterieur;
    });
  }

  repartitionDesButs(matchs: Array<Match>) {
    const buts = new Array<But>();

    const butsDomicile = new Array<But>();
    const butsExterieur = new Array<But>();

    const premiersButs = new Array<But>();
    const secondsButs = new Array<But>();
    const derniersButs = new Array<But>();

    const premiersButsDomicile = new Array<But>();
    const derniersButsDomicile = new Array<But>();

    const premiersButsExterieur = new Array<But>();
    const derniersButsExterieur = new Array<But>();

    matchs.forEach((match) => {
      const butsDuMatch = new Array<But>();
      const butsDuMatchDomicile = new Array<But>();
      const butsDuMatchAExterieur = new Array<But>();
      match.domicileButs.forEach((but) => {
        buts.push(but);
        butsDomicile.push(but);
        butsDuMatch.push(but);
        butsDuMatchDomicile.push(but);
      }); 
      match.exterieurButs.forEach((but2) => {
        buts.push(but2);
        butsExterieur.push(but2);
        butsDuMatch.push(but2);
        butsDuMatchAExterieur.push(but2);
      }); 
      // Premier et dernier buts
      if (butsDuMatch.length > 0) {
        butsDuMatch.sort((b1, b2) => {
          return b1.minute < b2.minute ? -1 : 1;
        });
        const premierBut = butsDuMatch[0];
        const dernierBut = butsDuMatch[butsDuMatch.length - 1];
        premiersButs.push(premierBut);
        derniersButs.push(dernierBut);
      }
      // Deuxième but
      if (butsDuMatch.length > 1) {
        butsDuMatch.sort((b1, b2) => {
          return b1.minute < b2.minute ? -1 : 1;
        });
        const secondBut = butsDuMatch[1];
        secondsButs.push(secondBut);
      }
      // DOMICILE : Premiers et derniers buts
      if (butsDuMatchDomicile.length > 0) {
        butsDuMatchDomicile.sort((b1, b2) => {
          return b1.minute < b2.minute ? -1 : 1;
        });
        const premierButDomicile = butsDuMatchDomicile[0];
        const dernierButDomicile = butsDuMatchDomicile[butsDuMatchDomicile.length - 1];
        premiersButsDomicile.push(premierButDomicile);
        derniersButsDomicile.push(dernierButDomicile);
      }
      // Exterieur :  Premiers et derniers buts
      if (butsDuMatchAExterieur.length > 0) {
        butsDuMatchAExterieur.sort((b1, b2) => {
          return b1.minute < b2.minute ? -1 : 1;
        });
        const premierButExterieur = butsDuMatchAExterieur[0];
        const dernierButExterieur = butsDuMatchAExterieur[butsDuMatchAExterieur.length - 1];
        premiersButsExterieur.push(premierButExterieur);
        derniersButsExterieur.push(dernierButExterieur);
      }
    });

    return {
      buts: buts,
      butsDomicile: butsDomicile,
      butsExterieur: butsExterieur,
      premiersButs: premiersButs,
      secondsButs: secondsButs,
      derniersButs: derniersButs,
      premiersButsDomicile: premiersButsDomicile,
      derniersButsDomicile: derniersButsDomicile,
      premiersButsExterieur: premiersButsExterieur,
      derniersButsExterieur: derniersButsExterieur,
    };

  }

  getStatsEquipe(matchs: Array<Match>, equipe: Equipe) {
    
    const victoires = new Array<Match>();
    const defaites = new Array<Match>();
    const nuls = new Array<Match>();

    const victoiresExterieurs = new Array<Match>();
    const defaitesExterieurs = new Array<Match>();
    const nulsExterieurs = new Array<Match>();

    const victoiresDomiciles = new Array<Match>();
    const defaitesDomiciles = new Array<Match>();
    const nulsDomiciles = new Array<Match>();

    const matchsDomiciles = new Array<Match>();
    const matchsExterieurs = new Array<Match>();

    let butsMarques = new Array<But>();
    let butsEncaisses = new Array<But>();

    const butsDomiciles = new Array<But>();
    const butsExterieurs = new Array<But>();

    const butsPremiereMiTemps = new Array<But>();
    const butsSecondeMiTemps = new Array<But>();

    const butsPremiereMiTempsDomiciles = new Array<But>();
    const butsPremiereMiTempsExterieurs = new Array<But>();

    const butsSecondeMiTempsDomiciles = new Array<But>();
    const butsSecondeMiTempsExterieurs = new Array<But>();

    matchs.forEach((match) => {
      if (match.domicile.id === equipe.id) {
        matchsDomiciles.push(match);
        butsMarques = butsMarques.concat(match.domicileButs);
        butsEncaisses = butsEncaisses.concat(match.exterieurButs);

        if (match.domicileScore > match.exterieurScore) {
          victoires.push(match);
          victoiresDomiciles.push(match);
        }
        if (match.domicileScore < match.exterieurScore) {
          defaites.push(match);
          defaitesDomiciles.push(match);
        }
        if (match.domicileScore === match.exterieurScore) {
          nuls.push(match);
          nulsDomiciles.push(match);
        }
      }
      if (match.exterieur.id === equipe.id) {
        matchsExterieurs.push(match);
        butsMarques = butsMarques.concat(match.exterieurButs);
        butsEncaisses = butsEncaisses.concat(match.domicileButs);
        if (match.domicileScore < match.exterieurScore) {
          victoires.push(match);
          victoiresExterieurs.push(match);
        }
        if (match.domicileScore > match.exterieurScore) {
          defaites.push(match);
          defaitesExterieurs.push(match);
        }
        if (match.domicileScore === match.exterieurScore) {
          nuls.push(match);
          nulsExterieurs.push(match);
        }
      }
    });

    return {
      victoires: victoires,
      defaites: defaites,
      nuls: nuls,
      victoiresExterieurs: victoiresExterieurs,
      defaitesExterieurs: defaitesExterieurs,
      nulsExterieurs: nulsExterieurs,
      victoiresDomiciles: victoiresDomiciles,
      defaitesDomiciles: defaitesDomiciles,
      nulsDomiciles: nulsDomiciles,
      matchsDomiciles: matchsDomiciles,
      matchsExterieurs: matchsExterieurs,
      butsMarques: butsMarques,
      butsEncaisses: butsEncaisses,
      
      butsDomiciles: butsDomiciles,
      butsExterieurs: butsExterieurs,
      butsPremiereMiTemps: butsPremiereMiTemps,
      butsSecondeMiTemps: butsSecondeMiTemps,
      butsPremiereMiTempsDomiciles: butsPremiereMiTempsDomiciles,
      butsPremiereMiTempsExterieurs: butsPremiereMiTempsExterieurs,
      butsSecondeMiTempsDomiciles: butsSecondeMiTempsDomiciles,
      butsSecondeMiTempsExterieurs: butsSecondeMiTempsExterieurs,
    }

  }

  get(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let statistique: Stat;
      this.getAll().then((statistiques) => {
        statistiques.forEach((s) => {
          if (s.id === id) {
            statistique = s;
            resolve(statistique);
          }
        });
      });
    });
  }

  getAll(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let statistiques = new Array<Stat>();
      const item = localStorage.getItem('statistiques');
      if (item) {
        statistiques = JSON.parse(item);
      }
      resolve(statistiques);
    });
  }

  set(statistique: Stat): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Stat>();
      let modification = false;
      this.getAll().then((statistiques) => {
        statistiques.forEach((item) => {
          if (item.id === statistique.id) {
            resultats.push(statistique);
            modification = true;
          } else {
            resultats.push(item);
          }
        });
        if (!modification) {
          resultats.push(statistique);
        }
        resolve(statistique);
      });
    });
  }

  delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let resultats = new Array<Stat>();
      this.getAll().then((statistiques) => {
        statistiques.forEach((item) => {
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
