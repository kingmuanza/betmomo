import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipe } from 'src/app/models/equipe.model';
import { Match } from 'src/app/models/match.model';
import { EquipeService } from 'src/app/services/equipe.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-equipe-list',
  templateUrl: './equipe-list.component.html',
  styleUrls: ['./equipe-list.component.scss']
})
export class EquipeListComponent implements OnInit {

  equipes = new Array<Equipe>();
  index = 0;
  matchs = new Array<Match>();
  constructor(
    private router: Router,
    private equipeService: EquipeService,
    private matchService: MatchService,
  ) { }

  ngOnInit(): void {
    this.getEquipes();
  }

  async update() {
    this.matchs = await this.matchService.getAll();
    this.index = 1;
    for (let index = 0; index < this.matchs.length; index++) {
      const match = this.matchs[index];
      const domicile = match.domicile;
      domicile.estimationMatch = 0;
      const exterieur = match.exterieur;
      exterieur.estimationMatch = 0;
      await this.equipeService.setEstimationMatch(domicile);
      await this.equipeService.setEstimationMatch(exterieur);
      this.index = this.index + 1;
    }
    this.getEquipes();
  }

  getEquipes() {
    this.equipeService.getAll().then((equipes) => {
      this.equipes = equipes;
    });
  }

  voirEquipe(equipe: Equipe) {
    this.router.navigate(['equipe', 'view', equipe.id]);
  }

}
