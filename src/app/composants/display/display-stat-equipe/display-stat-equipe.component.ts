import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Equipe } from 'src/app/models/equipe.model';
import { Match } from 'src/app/models/match.model';
import { StatistiqueService } from 'src/app/services/statistiques.service';

@Component({
  selector: 'app-display-stat-equipe',
  templateUrl: './display-stat-equipe.component.html',
  styleUrls: ['./display-stat-equipe.component.scss']
})
export class DisplayStatEquipeComponent implements OnInit, OnChanges {

  @Input() matchs = new Array<Match>();
  @Input() equipe = new Equipe('inconnu');
  total = 0;
  resultats: any;
  constructor(
    private statistiqueService: StatistiqueService,
  ) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.resultats = this.statistiqueService.getStatsEquipe(this.matchs, this.equipe);
  }

}
