import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Match } from 'src/app/models/match.model';
import { PrevisionService } from 'src/app/services/prevision.service';

@Component({
  selector: 'app-display-prevision',
  templateUrl: './display-prevision.component.html',
  styleUrls: ['./display-prevision.component.scss']
})
export class DisplayPrevisionComponent implements OnInit, OnChanges {

  @Input() matchs = new Array<Match>();
  plus00 = 0;
  plus05 = 0;
  plus15 = 0;
  plus25 = 0;
  plus35 = 0;
  plus45 = 0;
  max = 0;
  victoireDomicile = 0;
  defaiteDomicile = 0;
  nulDomicile = 0;
  plus00domicile = 0;
  plus05domicile = 0;
  plus15domicile = 0;
  plus25domicile = 0;
  plus35domicile = 0;
  plus45domicile = 0;
  plus00exterieur = 0;
  plus05exterieur = 0;
  plus15exterieur = 0;
  plus25exterieur = 0;
  plus35exterieur = 0;
  plus45exterieur = 0;
  constructor(
    private previsionService: PrevisionService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.init();
  }

  ngOnInit(): void {
    this.init();
  }

  init() {
    this.max = 0;
    this.previsionService.calculer(this.matchs);
    this.plus00 = this.previsionService.plus00;
    this.plus05 = this.previsionService.plus05;
    this.plus15 = this.previsionService.plus15;
    this.plus25 = this.previsionService.plus25;
    this.plus35 = this.previsionService.plus35;
    this.plus45 = this.previsionService.plus45;
    this.plus00domicile = this.previsionService.plus00domicile;
    this.plus05domicile = this.previsionService.plus05domicile;
    this.plus15domicile = this.previsionService.plus15domicile;
    this.plus25domicile = this.previsionService.plus25domicile;
    this.plus35domicile = this.previsionService.plus35domicile;
    this.plus45domicile = this.previsionService.plus45domicile;
    this.plus00exterieur = this.previsionService.plus00exterieur;
    this.plus05exterieur = this.previsionService.plus05exterieur;
    this.plus15exterieur = this.previsionService.plus15exterieur;
    this.plus25exterieur = this.previsionService.plus25exterieur;
    this.plus35exterieur = this.previsionService.plus35exterieur;
    this.plus45exterieur = this.previsionService.plus45exterieur;

    this.victoireDomicile = this.previsionService.victoireDomicile;
    this.defaiteDomicile = this.previsionService.defaiteDomicile;
    this.nulDomicile = this.previsionService.nulDomicile;

    this.getMax();
  }

  getMax() {
    this.max = this.matchs.length / 2 ;
    /*
    let min = this.matchs.length;
    if (this.plus00 >= this.max) {
      this.max = this.plus00;
    }
    if (this.plus05 >= this.max) {
      this.max = this.plus05;
    }
    if (this.plus15 >= this.max) {
      this.max = this.plus15;
    }
    if (this.plus25 >= this.max) {
      this.max = this.plus25;
    }
    if (this.plus35 >= this.max) {
      this.max = this.plus35;
    }
    if (this.plus45 >= this.max) {
      this.max = this.plus45;
    }
    */
  }

}
