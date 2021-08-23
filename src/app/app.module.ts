import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MatchEditComponent } from './pages/match/match-edit/match-edit.component';
import { MatchViewComponent } from './pages/match/match-view/match-view.component';
import { MatchListComponent } from './pages/match/match-list/match-list.component';
import { SaisonEditComponent } from './pages/saison/saison-edit/saison-edit.component';
import { SaisonListComponent } from './pages/saison/saison-list/saison-list.component';
import { SaisonViewComponent } from './pages/saison/saison-view/saison-view.component';
import { ChampionnatEditComponent } from './pages/championnat/championnat-edit/championnat-edit.component';
import { ChampionnatViewComponent } from './pages/championnat/championnat-view/championnat-view.component';
import { ChampionnatListComponent } from './pages/championnat/championnat-list/championnat-list.component';
import { CompetitionListComponent } from './pages/competition/competition-list/competition-list.component';
import { CompetitionViewComponent } from './pages/competition/competition-view/competition-view.component';
import { CompetitionEditComponent } from './pages/competition/competition-edit/competition-edit.component';
import { JoueurListComponent } from './pages/joueur/joueur-list/joueur-list.component';
import { JoueurEditComponent } from './pages/joueur/joueur-edit/joueur-edit.component';
import { JoueurViewComponent } from './pages/joueur/joueur-view/joueur-view.component';
import { MenuHautComponent } from './composants/menu-haut/menu-haut.component';
import { EquipeListComponent } from './pages/equipe/equipe-list/equipe-list.component';
import { EquipeEditComponent } from './pages/equipe/equipe-edit/equipe-edit.component';
import { EquipeViewComponent } from './pages/equipe/equipe-view/equipe-view.component';
import { DisplayButComponent } from './composants/display/display-but/display-but.component';
import { DisplayCartonComponent } from './composants/display/display-carton/display-carton.component';
import { DisplayChampionnatComponent } from './composants/display/display-championnat/display-championnat.component';
import { DisplayClassementComponent } from './composants/display/display-classement/display-classement.component';
import { DisplayCompetitionComponent } from './composants/display/display-competition/display-competition.component';
import { DisplayCornerComponent } from './composants/display/display-corner/display-corner.component';
import { DisplayJoueurComponent } from './composants/display/display-joueur/display-joueur.component';
import { DisplayMatchComponent } from './composants/display/display-match/display-match.component';
import { DisplayPrevisionComponent } from './composants/display/display-prevision/display-prevision.component';
import { DisplaySaisonComponent } from './composants/display/display-saison/display-saison.component';
import { DisplayStatComponent } from './composants/display/display-stat/display-stat.component';
import { DisplayMatchEditComponent } from './composants/display/display-match-edit/display-match-edit.component';
import { CompetitionEditionEditComponent } from './pages/competition-edition/competition-edition-edit/competition-edition-edit.component';
import { CompetitionEditionListComponent } from './pages/competition-edition/competition-edition-list/competition-edition-list.component';
import { CompetitionEditionViewComponent } from './pages/competition-edition/competition-edition-view/competition-edition-view.component';
import { FormsModule } from '@angular/forms';
import { DisplayCompetitionEditionComponent } from './composants/display/display-competition-edition/display-competition-edition.component';
import { CompetitionEditionMatchsComponent } from './pages/competition-edition/competition-edition-matchs/competition-edition-matchs.component';
import { StatistiqueRechercherComponent } from './pages/statistique/statistique-rechercher/statistique-rechercher.component';
import { DisplayGrapheComponent } from './composants/display/display-graphe/display-graphe.component';
import { DisplayMatchEditRawComponent } from './composants/display/display-match-edit-raw/display-match-edit-raw.component';
import { DisplayEquipeComponent } from './composants/display/display-equipe/display-equipe.component';
import { DisplayStatEquipeComponent } from './composants/display/display-stat-equipe/display-stat-equipe.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MatchEditComponent,
    MatchViewComponent,
    MatchListComponent,
    SaisonEditComponent,
    SaisonListComponent,
    SaisonViewComponent,
    ChampionnatEditComponent,
    ChampionnatViewComponent,
    ChampionnatListComponent,
    CompetitionListComponent,
    CompetitionViewComponent,
    CompetitionEditComponent,
    JoueurListComponent,
    JoueurEditComponent,
    JoueurViewComponent,
    MenuHautComponent,
    EquipeListComponent,
    EquipeEditComponent,
    EquipeViewComponent,
    DisplayButComponent,
    DisplayCartonComponent,
    DisplayChampionnatComponent,
    DisplayClassementComponent,
    DisplayCompetitionComponent,
    DisplayCornerComponent,
    DisplayJoueurComponent,
    DisplayMatchComponent,
    DisplayPrevisionComponent,
    DisplaySaisonComponent,
    DisplayStatComponent,
    DisplayMatchEditComponent,
    CompetitionEditionEditComponent,
    CompetitionEditionListComponent,
    CompetitionEditionViewComponent,
    DisplayCompetitionEditionComponent,
    CompetitionEditionMatchsComponent,
    StatistiqueRechercherComponent,
    DisplayGrapheComponent,
    DisplayMatchEditRawComponent,
    DisplayEquipeComponent,
    DisplayStatEquipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
