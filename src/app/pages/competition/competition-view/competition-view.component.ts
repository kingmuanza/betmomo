import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Championnat } from 'src/app/models/championnat.model';
import { CompetitionEdition } from 'src/app/models/competition.edition.model';
import { Competition } from 'src/app/models/competition.model';
import { Saison } from 'src/app/models/saison.model';
import { ChampionnatService } from 'src/app/services/championnat.service';
import { CompetitionEditionService } from 'src/app/services/competition-edition.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { SaisonService } from 'src/app/services/saison.service';

@Component({
  selector: 'app-competition-view',
  templateUrl: './competition-view.component.html',
  styleUrls: ['./competition-view.component.scss']
})
export class CompetitionViewComponent implements OnInit {

  competitionEditions = new Array<CompetitionEdition>();
  competition: Competition | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private competitionService: CompetitionService,
    private competitionEditionService: CompetitionEditionService,
  ) { }

  ngOnInit(): void {
    this.getCompetition();
  }

  getCompetitionEditions() {
    if (this.competition) {
      this.competitionEditionService.getAllOfCompetition(this.competition).then((competitionEditions) => {
        this.competitionEditions = competitionEditions;
      });
    }
  }
  getCompetition() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.competitionService.get(id).then((competition) => {
          this.competition = competition;
          this.getCompetitionEditions();
        });
      }
    });
  }

  voir(competitionEdition: CompetitionEdition) {
    this.router.navigate(['competition', 'edition', 'view', competitionEdition.id]);
  }

  nouveau() {
    this.router.navigate(['competition', 'edition', 'edit']);
  }

}
