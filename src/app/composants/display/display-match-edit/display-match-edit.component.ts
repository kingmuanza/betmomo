import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { But } from 'src/app/models/but.model';
import { CompetitionEdition } from 'src/app/models/competition.edition.model';
import { Equipe } from 'src/app/models/equipe.model';
import { Match } from 'src/app/models/match.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-display-match-edit',
  templateUrl: './display-match-edit.component.html',
  styleUrls: ['./display-match-edit.component.scss']
})
export class DisplayMatchEditComponent implements OnInit, OnChanges {

  @Input() competitionEdition!: CompetitionEdition;
  @Output() terminer = new EventEmitter<Match>();
  match = new Match('inconnu');
  domicileButs = '';
  exterieurButs = '';
  domicileScore = 0;
  exterieurScore = 0;

  constructor(
    private matchService: MatchService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
  }

  updateDomicileButs() {
    console.log(this.domicileButs);
    const decoupages = this.domicileButs.split(',').join(';').split(';');
    const buts: string[] = [];
    decoupages.forEach((element) => {
      if (element.trim().length > 0) {
        buts.push(element.trim());
      }
    });
    this.domicileScore = buts.length;
    this.match.domicileButs = [];
    this.match.domicileButsMiTemps = 0;
    buts.forEach((but) => {
      this.match.domicileButs.push(new But(this.match, Number(but)));
      if (Number(but) < 46) {
        this.match.domicileButsMiTemps = this.match.domicileButsMiTemps + 1;
      }
    });
  }

  updateExterieurButs() {
    console.log(this.domicileButs);
    const decoupages = this.exterieurButs.split(',').join(';').split(';');
    const buts: string[] = [];
    decoupages.forEach((element) => {
      if (element.trim().length > 0) {
        buts.push(element.trim());
      }
    });
    this.exterieurScore = buts.length;
    this.match.exterieurButs = [];
    this.match.exterieurButsMiTemps = 0;
    buts.forEach((but) => {
      this.match.exterieurButs.push(new But(this.match, Number(but)));
      if (Number(but) < 46) {
        this.match.exterieurButsMiTemps = this.match.exterieurButsMiTemps + 1;
      }
    });
  }

  save() {
    if (this.match.domicile && this.match.exterieur) {
      this.match.id = this.match.domicile.id + '-' + this.match.exterieur.id + '-' + this.competitionEdition.id;

      this.match.idCompetitionEdition = this.competitionEdition.id;
      this.match.domicileScore = this.domicileScore;
      this.match.exterieurScore = this.exterieurScore;
      console.log('match');
      console.log(this.match);

      this.match.enchainement = this.enchainementButs(this.match);
      this.matchService.set(this.match).then(() => {
        this.terminer.next(this.match);
        this.match.journee = this.match.journee;
      });
    }
  }

  enchainementButs(match: Match) {
    let enchainement = 'D';
    let mitemps = false;
    console.log('enchainementButs');
    const buts = match.domicileButs.concat(match.exterieurButs);
    buts.sort((b1, b2) => {
      return b1.minute < b2.minute ? -1 : 1;
    });
    console.log(buts);
    buts.forEach((but) => {
      if (but.minute > 45 && !mitemps) {
        enchainement = enchainement + 'M';
        mitemps = true;
      } 
      match.domicileButs.forEach((butdomicile) => {
        if (but.id === butdomicile.id) {
          enchainement = enchainement + '0';
        }
      });
      match.exterieurButs.forEach((butexterieur) => {
        if (but.id === butexterieur.id) {
          enchainement = enchainement + '1';
        }
      });
    });
    if (!mitemps) {
      enchainement = enchainement + 'M';
    }
    enchainement = enchainement + 'F';
    console.log(enchainement);
    return enchainement;
  }

}
