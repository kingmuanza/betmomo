import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionEdition } from 'src/app/models/competition.edition.model';
import { Equipe } from 'src/app/models/equipe.model';
import { Match } from 'src/app/models/match.model';
import { CompetitionEditionService } from 'src/app/services/competition-edition.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { MatchService } from 'src/app/services/match.service';
import { StatistiqueService } from 'src/app/services/statistiques.service';

@Component({
  selector: 'app-competition-edition-view',
  templateUrl: './competition-edition-view.component.html',
  styleUrls: ['./competition-edition-view.component.scss']
})
export class CompetitionEditionViewComponent implements OnInit {

  competitionEdition: CompetitionEdition | undefined;
  equipesString = '';
  equipes = new Array<Equipe>();
  modifierEquipe = true;
  matchs = new Array<Match>();

  constructor(
    private route: ActivatedRoute,
    private competitionEditionService: CompetitionEditionService,
    private equipeService: EquipeService,
    private matchService: MatchService,
    private statistiqueService: StatistiqueService,
  ) { }

  ngOnInit(): void {
    this.getCompetitionEdition();
  }

  updateEquipes() {
    const decoupages = this.equipesString.split(',').join(';').split(';');
    const nomEquipes: string[] = [];
    decoupages.forEach((element) => {
      if (element.trim().length > 0) {
        nomEquipes.push(element.trim());
      }
    });
    this.equipes = [];
    nomEquipes.forEach((nom) => {
      this.equipes.push(new Equipe(nom));
    });
  }

  getCompetitionEdition() {
    this.route.paramMap.subscribe((paramMap) => {
      const id = paramMap.get('id');
      if (id) {
        this.competitionEditionService.get(id).then((competitionEdition) => {
          this.competitionEdition = competitionEdition;
          this.getMatchs();
        });
      }
    });
  }

  async enregistrerLesEquipes() {
    if (this.competitionEdition) {
      this.competitionEdition.equipes = this.competitionEdition.equipes.concat(this.equipes);
      await this.competitionEditionService.set(this.competitionEdition);
    }
    for (let i = 0; i < this.equipes.length; i++) {
      const equipe = this.equipes[i];
      await this.equipeService.set(equipe);
    }
    this.equipesString = '';
    alert('Enregistrement des équipes terminé !!!');
  }

  terminer() {
    this.getMatchs();
  }

  getMatchs() {
    if (this.competitionEdition) {
      this.matchService.getAllofCompetitionEdition(this.competitionEdition).then((matchs) => {
        this.matchs = matchs;
        this.statistiqueService.calculer(matchs);
      });
    }
  }

}
