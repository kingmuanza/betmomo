import { Component, OnInit } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';
import { StatistiqueService } from 'src/app/services/statistiques.service';

@Component({
  selector: 'app-statistique-rechercher',
  templateUrl: './statistique-rechercher.component.html',
  styleUrls: ['./statistique-rechercher.component.scss']
})
export class StatistiqueRechercherComponent implements OnInit {

  matchs = new Array<Match>();
  resultats = new Array<Match>();
  enchainement = '';
  score = '';
  constructor(
    private matchService: MatchService,
    private statistiqueService: StatistiqueService,
  ) { }

  ngOnInit(): void {
    this.getMatchs();
  }

  rechercher() {
    console.log(this.enchainement);
    if (this.enchainement.indexOf('M') !== -1) {
      this.resultats = this.matchs.filter((match) => {
        return match.enchainement && match.enchainement.indexOf(this.enchainement) !== -1;
      });
    } else {
      this.resultats = this.matchs.filter((match) => {
        return match.enchainement && match.enchainement.replace('M', '').indexOf(this.enchainement) !== -1;
      });
    }
    this.statistiqueService.calculer(this.resultats);
  }

  rechercherScore() {
    console.log(this.score);
    const butDomicile = Number(this.score.split('-')[0].trim());
    const butExterieur = Number(this.score.split('-')[1].trim().split(' ')[0]);
    const time = Number(this.score.split('-')[1].trim().split(' ')[1]);
    console.log('time');
    console.log(time);
    this.resultats = this.matchs;
    if (butDomicile) {
      this.resultats = this.matchs.filter((match) => {
        return match.domicileScore >= butDomicile;
      });
      if (butExterieur) {
        this.resultats = this.resultats.filter((match) => {
          return match.exterieurScore >= butExterieur;
        });
      }
    } else if (butExterieur) {
      this.resultats = this.matchs.filter((match) => {
        return match.exterieurScore >= butExterieur;
      });
    }

    if (time) {
      this.resultats = this.resultats.filter((match) => {
        let valide = true;
        let scoreExact = true;
        let butsDomicileAvantTime = 0;
        let butsExterieurAvantTime = 0;
        match.domicileButs.forEach((but) => {
          if (but.minute <= time) {
            butsDomicileAvantTime = butsDomicileAvantTime + 1;
          }
        });
        match.exterieurButs.forEach((but) => {
          if (but.minute <= time) {
            butsExterieurAvantTime = butsExterieurAvantTime + 1;
          }
        });

        if (butsDomicileAvantTime === butDomicile && butExterieur === butsExterieurAvantTime) {
          return true;
        } else {
          return false;
        }
      });
    }

  }

  getMatchs() {
    this.matchService.getAll().then((matchs) => {
      this.matchs = matchs;
      this.resultats = matchs;
      this.statistiqueService.calculer(matchs);
    });
  }
}
