import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionEdition } from 'src/app/models/competition.edition.model';
import { Competition } from 'src/app/models/competition.model';
import { Saison } from 'src/app/models/saison.model';
import { CompetitionEditionService } from 'src/app/services/competition-edition.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { SaisonService } from 'src/app/services/saison.service';

@Component({
  selector: 'app-competition-edition-edit',
  templateUrl: './competition-edition-edit.component.html',
  styleUrls: ['./competition-edition-edit.component.scss']
})
export class CompetitionEditionEditComponent implements OnInit {

  idcompetition = '';
  idsaison = '';
  competitions = Array<Competition>();
  saisons = new Array<Saison>();

  constructor(
    private router: Router,
    private competitionEditionService: CompetitionEditionService,
    private competitionService: CompetitionService,
    private saisonService: SaisonService,
  ) { }

  ngOnInit(): void {
    this.getCompetitions();
    this.getSaisons();
  }

  getCompetitions() {
    this.competitionService.getAll().then((competitions) => {
      this.competitions = competitions;
    });
  }

  getSaisons() {
    this.saisonService.getAll().then((saisons) => {
      this.saisons = saisons;
    });
  }

  save() {
    console.log('competitionEdition');
    const competitionEdition = new CompetitionEdition(this.idcompetition, this.idsaison);
    console.log(competitionEdition);
    
    this.competitionEditionService.set(competitionEdition).then(() => {
      this.router.navigate(['competition', 'view', this.idcompetition]);
    });
    
  }
}
