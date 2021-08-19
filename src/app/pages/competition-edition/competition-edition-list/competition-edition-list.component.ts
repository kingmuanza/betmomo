import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Championnat } from 'src/app/models/championnat.model';
import { CompetitionEdition } from 'src/app/models/competition.edition.model';
import { Competition } from 'src/app/models/competition.model';
import { Saison } from 'src/app/models/saison.model';
import { ChampionnatService } from 'src/app/services/championnat.service';
import { SaisonService } from 'src/app/services/saison.service';

@Component({
  selector: 'app-competition-edition-list',
  templateUrl: './competition-edition-list.component.html',
  styleUrls: ['./competition-edition-list.component.scss']
})
export class CompetitionEditionListComponent implements OnInit {

  competitionEditions = new Array<CompetitionEdition>();
  competitions = new Array<Competition>();
  saison: Saison | undefined;
  championnat: Championnat | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private saisonService: SaisonService,
    private championnatService: ChampionnatService,
  ) { }

  ngOnInit(): void {
    this.getSaison();
    this.getChampionnat();
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

}
