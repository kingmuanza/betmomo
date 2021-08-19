import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Championnat } from 'src/app/models/championnat.model';
import { Competition } from 'src/app/models/competition.model';
import { Saison } from 'src/app/models/saison.model';
import { ChampionnatService } from 'src/app/services/championnat.service';
import { CompetitionService } from 'src/app/services/competition.service';
import { SaisonService } from 'src/app/services/saison.service';

@Component({
  selector: 'app-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {
  competitions = new Array<Competition>();
  saison: Saison | undefined;
  championnat: Championnat | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private saisonService: SaisonService,
    private championnatService: ChampionnatService,
    private competitionService: CompetitionService,
  ) { }

  ngOnInit(): void {
    this.getSaison();
    this.getChampionnat();
    this.getCompetitions();
  }

  getCompetitions() {
    this.competitionService.getAll().then((competitions) => {
      this.competitions = competitions;
    });
  }

  getChampionnat() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('idchampionnat');
      if (id) {
        this.championnatService.get(id).then((championnat) => {
          this.championnat = championnat;
        });
      }
    });
  }

  getSaison() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('idsaison');
      if (id) {
        this.saisonService.get(id).then((saison) => {
          this.saison = saison;
        });
      }
    });
  }

  nouveau() {
    this.router.navigate(['competition', 'edit']);
  }

  view(competition: Competition) {
    this.router.navigate(['competition', 'view', competition.id]);
  }

}
