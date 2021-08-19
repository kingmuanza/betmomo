import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompetitionEdition } from 'src/app/models/competition.edition.model';
import { Competition } from 'src/app/models/competition.model';
import { Match } from 'src/app/models/match.model';
import { CompetitionEditionService } from 'src/app/services/competition-edition.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  matchs = new Array<Match>();
  matchsNonUploades = new Array<Match>();
  matchsUploadesEnCours = 0;
  nombreMatchsUploadesSubscription = new Subscription();
  matchsTelechargesEnCours = 0;
  nombreMatchsTelechargesSubscription = new Subscription();

  competitions = new Array<Competition>();

  competitionsEditions = new Array<CompetitionEdition>();
  competitionsEditionsNonUploades = new Array<CompetitionEdition>();
  competitionEditionsUploadesEnCours = 0;
  nombreCompetitionEditionsUploadesSubscription = new Subscription();
  competitionEditionsTelechargesEnCours = 0;
  nombreCompetitionEditionsTelechargesSubscription = new Subscription();

  constructor(
    private matchService: MatchService,
    private competitionService: CompetitionService,
    private competitionEditionService: CompetitionEditionService,
  ) { }

  ngOnInit(): void {
    this.getMatchs();
    this.getCompetitions();
    this.getCompetitionEditions();
    this.nombreMatchsUploadesSubscription = this.matchService.nombreMatchsUploadesSubject.subscribe((nbr) => {
      this.matchsUploadesEnCours = nbr;
    });
    this.nombreMatchsTelechargesSubscription = this.matchService.nombreMatchsTelechargesSubject.subscribe((nbr) => {
      this.matchsTelechargesEnCours = nbr;
    });
    this.nombreCompetitionEditionsUploadesSubscription = this.competitionEditionService.nombreCompetitionsUploadesSubject.subscribe((nbr) => {
      this.competitionEditionsUploadesEnCours = nbr;
    });
  }

  getMatchs() {
    this.matchService.getAll().then((matchs) => {
      this.matchs = matchs;
      this.matchs.forEach((match) => {
        if (!match.saveOnFirebase) {
          this.matchsNonUploades.push(match);
        }
      });
    });
  }

  getCompetitionEditions() {
    this.competitionEditionService.getAll().then((competitionEditions) => {
      this.competitionsEditions = competitionEditions;
      this.competitionsEditions.forEach((c) => {
        if (!c.saveOnFirebase) {
          this.competitionsEditionsNonUploades.push(c);
        }
      });
    });
  }
  getCompetitions() {
    this.competitionService.getAll().then((competitions) => {
      this.competitions = competitions;
    });
  }

  uploaderMatchs() {
    this.matchService.uploaderMatchs();
  }

  telechargerMatchs() {
    this.matchService.telechargerMatch();
  }

  uploaderCompetitions() {
    this.competitionEditionService.uploadCompetitionsEditions();
  }

  telechargerCompetitions() {
    this.matchService.telechargerMatch();
  }

}
