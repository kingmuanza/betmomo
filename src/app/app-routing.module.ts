import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChampionnatEditComponent } from './pages/championnat/championnat-edit/championnat-edit.component';
import { ChampionnatListComponent } from './pages/championnat/championnat-list/championnat-list.component';
import { ChampionnatViewComponent } from './pages/championnat/championnat-view/championnat-view.component';
import { CompetitionEditionEditComponent } from './pages/competition-edition/competition-edition-edit/competition-edition-edit.component';
import { CompetitionEditionListComponent } from './pages/competition-edition/competition-edition-list/competition-edition-list.component';
import { CompetitionEditionViewComponent } from './pages/competition-edition/competition-edition-view/competition-edition-view.component';
import { CompetitionEditComponent } from './pages/competition/competition-edit/competition-edit.component';
import { CompetitionListComponent } from './pages/competition/competition-list/competition-list.component';
import { CompetitionViewComponent } from './pages/competition/competition-view/competition-view.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EquipeEditComponent } from './pages/equipe/equipe-edit/equipe-edit.component';
import { EquipeListComponent } from './pages/equipe/equipe-list/equipe-list.component';
import { EquipeViewComponent } from './pages/equipe/equipe-view/equipe-view.component';
import { JoueurEditComponent } from './pages/joueur/joueur-edit/joueur-edit.component';
import { JoueurListComponent } from './pages/joueur/joueur-list/joueur-list.component';
import { JoueurViewComponent } from './pages/joueur/joueur-view/joueur-view.component';
import { MatchEditComponent } from './pages/match/match-edit/match-edit.component';
import { MatchListComponent } from './pages/match/match-list/match-list.component';
import { MatchViewComponent } from './pages/match/match-view/match-view.component';
import { SaisonEditComponent } from './pages/saison/saison-edit/saison-edit.component';
import { SaisonListComponent } from './pages/saison/saison-list/saison-list.component';
import { SaisonViewComponent } from './pages/saison/saison-view/saison-view.component';
import { StatistiqueRechercherComponent } from './pages/statistique/statistique-rechercher/statistique-rechercher.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'stats', component: DashboardComponent },

  { path: 'championnat', component: ChampionnatListComponent },
  { path: 'championnat/saison/:id', component: ChampionnatListComponent },
  { path: 'championnat/edit', component: ChampionnatEditComponent },
  { path: 'championnat/edit/:id', component: ChampionnatEditComponent },
  { path: 'championnat/view/:id', component: ChampionnatViewComponent },

  { path: 'competition/championnat/:idchampionnat/saison/:idsaison', component: CompetitionEditionListComponent },
  { path: 'competition/edition/view/:id', component: CompetitionEditionViewComponent },
  { path: 'competition/edition/edit/:id', component: CompetitionEditionViewComponent },
  { path: 'competition/edition/edit', component: CompetitionEditionEditComponent },

  { path: 'competition', component: CompetitionListComponent },
  { path: 'competition/edit', component: CompetitionEditComponent },
  { path: 'competition/edit/:id', component: CompetitionEditComponent },
  { path: 'competition/view/:id', component: CompetitionViewComponent },

  { path: 'equipe', component: EquipeListComponent },
  { path: 'equipe/edit', component: EquipeEditComponent },
  { path: 'equipe/edit/:id', component: EquipeEditComponent },
  { path: 'equipe/view/:id', component: EquipeViewComponent },

  { path: 'joueur', component: JoueurListComponent },
  { path: 'joueur/edit', component: JoueurEditComponent },
  { path: 'joueur/edit/:id', component: JoueurEditComponent },
  { path: 'joueur/view/:id', component: JoueurViewComponent },

  { path: 'match', component: MatchListComponent },
  { path: 'match/edit', component: MatchEditComponent },
  { path: 'match/edit/:id', component: MatchEditComponent },
  { path: 'match/view/:id', component: MatchViewComponent },

  { path: 'saison', component: SaisonListComponent },
  { path: 'saison/edit', component: SaisonEditComponent },
  { path: 'saison/edit/:id', component: SaisonEditComponent },
  { path: 'saison/view/:id', component: SaisonViewComponent },

  { path: 'statistique', component: StatistiqueRechercherComponent },

  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
