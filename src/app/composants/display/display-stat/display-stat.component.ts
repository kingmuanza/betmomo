import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { StatistiqueService } from 'src/app/services/statistiques.service';

@Component({
  selector: 'app-display-stat',
  templateUrl: './display-stat.component.html',
  styleUrls: ['./display-stat.component.scss']
})
export class DisplayStatComponent implements OnInit, OnChanges {

  @Input() matchs = new Array<Match>();
  total = 0;
  domiciles = 0;
  exterieurs = 0;
  premiereMitemps = 0;
  secondeMitemps = 0;
  premiereMitempsDomicile = 0;
  premiereMitempsExterieur = 0;
  secondeMitempsDomicile = 0;
  secondeMitempsExterieur = 0;
  deuxEquipesMarques = 0;
  exterieurMarque = 0;
  domicileMarque = 0;
  domicileMarquePremiereMitemps = 0;
  exterieurMarquePremiereMitemps = 0;
  domicileMarqueSecondeMitemps = 0;
  exterieurMarqueSecondeMitemps = 0;

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
    console.log('this.matchs');
    console.log(this.matchs);
    this.statistiqueService.calculer(this.matchs);
    this.total = this.statistiqueService.total;
    this.domiciles = this.statistiqueService.domiciles;
    this.exterieurs = this.statistiqueService.exterieurs;
    this.premiereMitemps = this.statistiqueService.premiereMitemps;
    this.secondeMitemps = this.statistiqueService.secondeMitemps;
    this.premiereMitempsDomicile = this.statistiqueService.premiereMitempsDomicile;
    this.premiereMitempsExterieur = this.statistiqueService.premiereMitempsExterieur;
    this.secondeMitempsDomicile = this.statistiqueService.secondeMitempsDomicile;
    this.secondeMitempsExterieur = this.statistiqueService.secondeMitempsExterieur;
    this.deuxEquipesMarques = this.statistiqueService.deuxEquipesMarques;
    this.exterieurMarque = this.statistiqueService.exterieurMarque;
    this.domicileMarque = this.statistiqueService.domicileMarque;
    this.domicileMarquePremiereMitemps = this.statistiqueService.domicileMarquePremiereMitemps;
    this.exterieurMarquePremiereMitemps = this.statistiqueService.exterieurMarquePremiereMitemps;
    this.domicileMarqueSecondeMitemps = this.statistiqueService.domicileMarqueSecondeMitemps;
    this.exterieurMarqueSecondeMitemps = this.statistiqueService.exterieurMarqueSecondeMitemps;
  }

}
