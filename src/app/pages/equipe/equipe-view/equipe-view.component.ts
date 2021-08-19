import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipe } from 'src/app/models/equipe.model';
import { Match } from 'src/app/models/match.model';
import { EquipeService } from 'src/app/services/equipe.service';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-equipe-view',
  templateUrl: './equipe-view.component.html',
  styleUrls: ['./equipe-view.component.scss']
})
export class EquipeViewComponent implements OnInit {

  equipe = new Equipe('Veuillez patienter...');
  matchs = new Array<Match>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private equipeService: EquipeService,
    private matchService: MatchService,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.equipeService.get(id).then((equipe) => {
          this.equipe = equipe;
          this.matchService.getAllofEquipe(equipe).then((matchs) => {
            this.matchs = matchs;
          });
        });
      }
    });
  }

}
