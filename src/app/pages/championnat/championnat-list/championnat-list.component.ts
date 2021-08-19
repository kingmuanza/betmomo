import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Championnat } from 'src/app/models/championnat.model';
import { Saison } from 'src/app/models/saison.model';
import { ChampionnatService } from 'src/app/services/championnat.service';
import { SaisonService } from 'src/app/services/saison.service';

@Component({
  selector: 'app-championnat-list',
  templateUrl: './championnat-list.component.html',
  styleUrls: ['./championnat-list.component.scss']
})
export class ChampionnatListComponent implements OnInit {
  championnats = new Array<Championnat>();
  saison: Saison | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private saisonService: SaisonService,
    private championnatService: ChampionnatService,
  ) { }

  ngOnInit(): void {
    this.getSaison();
    this.getChampionnats();
  }

  getChampionnats() {
    this.championnatService.getAll().then((championnats) => {
      this.championnats = championnats;
    });
  }

  getSaison() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.saisonService.get(id).then((saison) => {
          this.saison = saison;
        });
      }
    });
  }

  voir(championnat: Championnat) {
    if (this.saison) {
      this.router.navigate(['competition', 'championnat', championnat.id, 'saison', this.saison.id]);
    }
  }

  nouveau() {
    this.router.navigate(['championnat', 'edit']);
  }

}
