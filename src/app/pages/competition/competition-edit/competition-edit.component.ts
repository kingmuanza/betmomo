import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Championnat } from 'src/app/models/championnat.model';
import { Competition } from 'src/app/models/competition.model';
import { ChampionnatService } from 'src/app/services/championnat.service';
import { CompetitionService } from 'src/app/services/competition.service';

@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.scss']
})
export class CompetitionEditComponent implements OnInit {

  competition = new Competition('Nouvelle Competition');
  championnats = new Array<Championnat>();

  constructor(
    private router: Router,
    private championnatService: ChampionnatService,
    private competitionService: CompetitionService,
  ) { }

  ngOnInit(): void {
    this.getChampionnats();
  }

  getChampionnats() {
    this.championnatService.getAll().then((championnats) => {
      this.championnats = championnats;
    });
  }

  save() {
    console.log('competition');
    const competition = new Competition(this.competition.nom);
    competition.idchampionnat = this.competition.idchampionnat;
    competition.nombreEquipes = this.competition.nombreEquipes;
    console.log(competition);
    
    this.competitionService.set(competition).then(() => {
      this.router.navigate(['competition']);
    });
  }
}
